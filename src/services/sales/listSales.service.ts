import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale } from "../../entities";

const listSalesService = async (): Promise<Sale[]> => {
  const saleRepository: Repository<Sale> = AppDataSource.getRepository(Sale);
  const allSales = await saleRepository.find({
    relations: {
      client: true,
      products: true,
    },
  });

  return allSales;
};

export { listSalesService };
