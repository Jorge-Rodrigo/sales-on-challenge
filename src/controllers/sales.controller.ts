import { Request, Response } from "express";

const createSaleController = async (req: Request, res: Response) => {
  // const newUser = await createContactService(req.body, req.user.id);

  return res.status(201).json("teste");
};

export { createSaleController };
