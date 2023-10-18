import { Router } from "express";
import { createSaleController,listPaymentDateController } from "../controllers";

const salesRoutes = Router();

salesRoutes.post("", createSaleController);
salesRoutes.get("/:id/payment-plan",listPaymentDateController)

export { salesRoutes };
