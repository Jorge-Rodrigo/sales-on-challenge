import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale } from "../../entities";
import { returnSalePayment } from "../../schemas";
import { tSalePaymentReturn } from "../../interfaces";
import { calculatePaymentPlan } from "../../utils/calculatePayment";

const listSalePaymentPlanService = async (
  saleId: number
): Promise<tSalePaymentReturn> => {
  const saleRepository: Repository<Sale> = AppDataSource.getRepository(Sale);
  const findSale = await saleRepository.findOne({
    where: {
      id: saleId,
    },
  });

  if (!findSale) {
    throw new Error("Venda não encontrada.");
  }
  const customDueDates = findSale.customDueDates || [];
  const customInstallmentPrice = findSale.customInstallmentPrice || [];

  if (customDueDates.length > 1 && customInstallmentPrice.length > 1) {
    const totalPrice = customInstallmentPrice.reduce(
      (acc, price) => acc + Number(price),
      0
    );

    const portions = customDueDates.length;
    const allPortions = customDueDates.map((dueDate, index) => ({
      date: dueDate,
      price: Number(customInstallmentPrice[index]),
    }));

    const response = {
      totalPrice: totalPrice.toFixed(2),
      portions,
      allPortions,
    };

    const validatedResponse = returnSalePayment.parse(response);

    return validatedResponse;
  }

  const paymentPlan = calculatePaymentPlan(findSale);
  const portions = paymentPlan.dueDates.length;
  const allPortions = paymentPlan.dueDates.map((dueDate, index) => ({
    price: paymentPlan.installmentPrice,
    date: dueDate,
  }));
  const response = {
    totalPrice: paymentPlan.totalPrice.toString(),
    portions,
    allPortions,
  };

  const validatedResponse = returnSalePayment.parse(response);

  return validatedResponse;
};

export { listSalePaymentPlanService };
