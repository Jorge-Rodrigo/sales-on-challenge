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
