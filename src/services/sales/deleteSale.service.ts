import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Product, Sale } from "../../entities";
import { AppError } from "../../error";

const deleteSaleService = async (saleId: number): Promise<void> => {
  const saleRepository: Repository<Sale> = AppDataSource.getRepository(Sale);

  const sale = await saleRepository.findOne({
    where: {
      id: saleId,
    },
  });

  if (!sale) {
    throw new AppError("Venda não encontrada");
  }

  await saleRepository.remove(sale);
};

export { deleteSaleService };
