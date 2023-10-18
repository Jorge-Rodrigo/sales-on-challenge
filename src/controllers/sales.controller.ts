import { Request, Response } from "express";
import { createSaleService, listSalePaymentPlanService } from "../services";

const createSaleController = async (req: Request, res: Response) => {
  const newUser = await createSaleService(req.body);

  return res.status(201).json(newUser);
};

const listPaymentDateController = async (req: Request, res: Response) => {
  const listPaymentPlan = await listSalePaymentPlanService(
    Number(req.params.id)
  );
  return res.status(200).json(listPaymentPlan);
};

export { createSaleController, listPaymentDateController };
