import { Router } from "express";
import {
  createSaleController,
  deleteSaleController,
  listPaymentDateController,
  listSalesController,
  updateSaleController,
} from "../controllers";
import { ensureValidBodyMiddlewares } from "../middlewares/ensureValidBody.middlewares";
import { saleCreateSchema } from "../schemas";
import { ensureDataConflictMiddleware } from "../middlewares/ensureDataConflict.middlewares";

const salesRoutes = Router();

salesRoutes.post(
  "",
  ensureValidBodyMiddlewares(saleCreateSchema),
  ensureDataConflictMiddleware,
  createSaleController
);
salesRoutes.get("", listSalesController);
salesRoutes.get("/:id/payment-plan", listPaymentDateController);
salesRoutes.patch("/:id", updateSaleController);
salesRoutes.delete("/:id", deleteSaleController);

export { salesRoutes };
