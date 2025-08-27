import express from "express";
import { paymentRoutes } from "../modules/payment/payment.routes";
const router = express.Router();

const allRouter = [
  { path: "/payment", name: paymentRoutes },
  //   { path: "/admin", name: "adminRouter" },
];

allRouter.forEach((route) => {
  router.use(route.path, route.name);
});

export default router;
