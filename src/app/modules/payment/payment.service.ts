import { stripe } from "../../../server";
import Payment from "./payment.model";

interface ICheckoutSessionPayload {
  productName: string;
  unitAmount: number; // in cents
  quantity: number;
  customerEmail?: string; // Optional: to pre-fill email
}

const createCheckoutSession = async (payload: ICheckoutSessionPayload) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: payload.productName },
          unit_amount: payload.unitAmount, // Should be in cents
        },
        quantity: payload.quantity,
      },
    ],
    mode: "payment",
    success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `http://localhost:3000/cancel`,
    customer_email: payload.customerEmail, // Pre-fill email if provided
  });

  return session;
};

const savePayment = async (session: any) => {
  const payment = await Payment.create({
    stripeId: session.id,
    amount: session.amount_total / 100,
    currency: session.currency,
    status: session.payment_status || session.status,
    customerEmail: session.customer_details?.email || session.customer_email || "unknown@example.com",
  });

  return payment;
};

export const paymentService = {
  createCheckoutSession,
  savePayment,
};