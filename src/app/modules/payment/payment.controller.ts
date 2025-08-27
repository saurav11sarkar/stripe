import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import { paymentService } from "./payment.service";
import { stripe } from "../../../server";
import catchAsycn from "../../utils/catchAsycn";
import config from "../../config";

const createCheckoutSession = catchAsycn(async (req: Request, res: Response) => {
  const { productName, unitAmount, quantity, customerEmail } = req.body;

  if (!productName || !unitAmount || !quantity) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Missing required fields: productName, unitAmount, quantity",
    });
  }

  const session = await paymentService.createCheckoutSession({
    productName,
    unitAmount,
    quantity,
    customerEmail,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Checkout session created successfully",
    data: { url: session.url }, // Return the session URL
  });
});


const stripeWebhook = catchAsycn(async (req: Request, res: Response) => {
  const sig = req.headers["stripe-signature"] as string;
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, config.stripe.webhook_secret as string);
  } catch (err: any) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // You can access session details here and save payment to your DB
      console.log('Checkout Session Completed:', session);
      await paymentService.savePayment(session);
      break;
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      console.log('Payment Intent Succeeded:', paymentIntent);
      // Optional: If you handle payments directly with Payment Intents, process here
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.json({ received: true });
});


export const paymentController = {
  createCheckoutSession,
  stripeWebhook,
};