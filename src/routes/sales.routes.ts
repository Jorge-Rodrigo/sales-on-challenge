import { Router } from "express";
import {
  createSaleController,
  deleteSaleController,
  listPaymentDateController,
  listSalesController,
} from "../controllers";
import { ensureValidBodyMiddlewares } from "../middlewares/ensureValidBody.middlewares";
import { saleCreateSchema } from "../schemas";

const salesRoutes = Router();

salesRoutes.post(
  "",
  ensureValidBodyMiddlewares(saleCreateSchema),
  createSaleController
);
salesRoutes.get("", listSalesController);
salesRoutes.get("/:id/payment-plan", listPaymentDateController);
salesRoutes.delete("/:id", deleteSaleController);

export { salesRoutes };
