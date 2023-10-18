import { Router } from "express";
import { createSaleController } from "../controllers";

const salesRoutes = Router();

salesRoutes.post("", createSaleController);

export { salesRoutes };
