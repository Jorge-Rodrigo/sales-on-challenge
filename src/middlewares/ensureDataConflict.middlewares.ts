import { Request, Response, NextFunction } from "express";

import { AppError } from "../error";

const ensureDataConflictMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let totalPrice = 0;
  if (req.body.products) {
    for (const productData of req.body.products) {
      totalPrice += productData.price * productData.amount;
    }
  }

  if (
    req.body.customDueDates &&
    req.body.customInstallmentPrice &&
    req.body.portion
  ) {
    if (
      req.body.customInstallmentPrice.reduce(
        (acc: number, price: number) => acc + price,
        0
      ) !== totalPrice
    ) {
      throw new AppError(
        "O valor total não corresponde à soma dos valores das parcelas.",
        400
      );
    }
    if (
      req.body.customDueDates.lenght !== req.body.portion ||
      req.body.customInstallmentPrice.lenght !== req.body.portion
    ) {
      throw new AppError(
        "Quantidade de datas/preços de parcelas não corresponde à quantidade de parcelas.",
        400
      );
    }

    return next();
  }

  return next();
};

export { ensureDataConflictMiddleware };
