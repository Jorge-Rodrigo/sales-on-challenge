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
  const clientRequest = saleData.client;

  const newClient = clientRepository.create(clientRequest);

  await clientRepository.save(newClient);
  const client = returnClientSchema.parse(newClient);

  const { products: _, client: __, ...saleRequest } = saleData;

  const newSale = saleRepository.create({
    ...saleRequest,
    client: client,
    totalPrice: 0,
    products: [],
  });

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

  await saleRepository.save(newSale);

  const sale = returnSaleSchema.parse(newSale);
  return sale;
};

export { createSaleService };
