import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale, Client, Product } from "../../entities";
import { tSaleRequest, tSaleReturn } from "../../interfaces";
import { returnSaleSchema, returnClientSchema } from "../../schemas";

const createSaleService = async (
  saleData: tSaleRequest
): Promise<tSaleReturn> => {
  const saleRepository: Repository<Sale> = AppDataSource.getRepository(Sale);

  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);

  const productsRequest = saleData.products;
  const clientRequest = saleData?.client;

  const { products: _, client: __, ...saleRequest } = saleData;

  const newSale = saleRepository.create({
    ...saleRequest,
    totalPrice: 0,
    products: [],
    installmentPrice: 0,
  });
  if (clientRequest) {
    const newClient = clientRepository.create(clientRequest);
    await clientRepository.save(newClient);
    const client = returnClientSchema.parse(newClient);
    newSale.client = client;
  }

  await saleRepository.save(newSale);

  for (const productData of productsRequest) {
    const product = productRepository.create({
      ...productData,
      sale: newSale,
    });
    newSale.totalPrice += product.price;
    newSale.products.push(product);
    await productRepository.save(product);
  }

  if (newSale.portion && newSale.portion > 1) {
    newSale.installmentPrice = newSale.totalPrice / newSale.portion;
  }

  await saleRepository.save(newSale);

  const sale = returnSaleSchema.parse(newSale);
  return sale;
};

export { createSaleService };
