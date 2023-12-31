import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale, Client, Product } from "../../entities";
import { tSaleRequest, tSaleReturn } from "../../interfaces";
import { returnSaleSchema, returnClientSchema } from "../../schemas";
import { AppError } from "../../error";

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
    customDueDates: null,
    customInstallmentPrice: null,
  });
  if (clientRequest) {
    const newClient = clientRepository.create(clientRequest);
    await clientRepository.save(newClient);
    const client = returnClientSchema.parse(newClient);
    newSale.client = client;
  }

  await saleRepository.save(newSale);
  let totalPrice = 0;
  for (const productData of productsRequest) {
    const product = productRepository.create({
      ...productData,
      sale: newSale,
    });

    totalPrice += product.price * product.amount;
    newSale.products.push(product);
    await productRepository.save(product);
  }
  newSale.totalPrice = totalPrice;

  if (saleData.paymentMethod === "À vista") {
    newSale.portion = 1;

    newSale.installmentPrice = newSale.totalPrice;
    await saleRepository.save(newSale);
  } else if (
    saleData.paymentMethod === "Parcelado" &&
    newSale.totalPrice >= 50
  ) {
    if (saleData.customDueDates && saleData.customInstallmentPrice) {
      if (
        saleData.customDueDates.length !== saleData.portion ||
        saleData.customInstallmentPrice.length !== saleData.portion
      ) {
        throw new AppError(
          "Quantidade de datas/preços de parcelas não corresponde à quantidade de parcelas.",
          400
        );
      }

      newSale.portion = saleData.portion;
      newSale.customDueDates = saleData.customDueDates;
      newSale.customInstallmentPrice = saleData.customInstallmentPrice;

      if (
        newSale.customInstallmentPrice.reduce(
          (acc, price) => acc + price,
          0
        ) !== newSale.totalPrice
      ) {
        throw new AppError(
          "O valor total não corresponde à soma dos valores das parcelas.",
          400
        );
      }
    } else {
      if (newSale.portion && newSale.portion > 1 && newSale.totalPrice >= 50) {
        newSale.installmentPrice = newSale.totalPrice / newSale.portion;
      }
    }
  }

  await saleRepository.save(newSale);
  const sale = returnSaleSchema.parse(newSale);

  if (sale.customDueDates && sale.customInstallmentPrice) {
    if (
      sale.customDueDates?.length > 1 ||
      sale.customInstallmentPrice?.length > 1
    ) {
      sale.installmentPrice = undefined;
    }
  }

  return sale;
};

export { createSaleService };
