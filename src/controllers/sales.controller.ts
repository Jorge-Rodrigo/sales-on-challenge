import { Request, Response } from "express";
import { createSaleService } from "../services";

const createSaleController = async (req: Request, res: Response) => {
  const newUser = await createSaleService(req.body);

  return res.status(201).json(newUser);
};

export { createSaleController };
