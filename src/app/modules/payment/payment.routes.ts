import express from "express";
import { paymentController } from "./payment.controller";

export const paymentRoutes = express.Router();

paymentRoutes.post("/create-checkout-session", paymentController.createCheckoutSession);
paymentRoutes.post("/webhook", express.raw({ type: "application/json" }), paymentController.stripeWebhook);
