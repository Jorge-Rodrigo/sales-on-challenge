import { Request, Response } from "express";
import {
  createSaleService,
  deleteSaleService,
  listSalePaymentPlanService,
  listSalesService,
  updateSaleService,
} from "../services";

const createSaleController = async (req: Request, res: Response) => {
  const newUser = await createSaleService(req.body);

  return res.status(201).json(newUser);
};

const listSalesController = async (req: Request, res: Response) => {
  const allSales = await listSalesService();

  return res.status(200).json(allSales);
};
const listPaymentDateController = async (req: Request, res: Response) => {
  const listPaymentPlan = await listSalePaymentPlanService(
    Number(req.params.id)
  );

  return res.status(200).json(listPaymentPlan);
};

const updateSaleController = async (req: Request, res: Response) => {
  const saleUpdated = await updateSaleService(req.body, Number(req.params.id));
  return res.status(201).json(saleUpdated);
};

const deleteSaleController = async (req: Request, res: Response) => {
  await deleteSaleService(Number(req.params.id));
  return res.status(204).json();
};

export {
  createSaleController,
  listPaymentDateController,
  listSalesController,
  deleteSaleController,
  updateSaleController,
};
