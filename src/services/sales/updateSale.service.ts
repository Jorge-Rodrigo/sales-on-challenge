import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Sale, Client, Product } from "../../entities";
import { tSaleRequestUpdate, tSaleReturn } from "../../interfaces";
import { AppError } from "../../error";
import { returnClientSchema, returnSaleSchema } from "../../schemas";

const updateSaleService = async (
  saleBody: tSaleRequestUpdate,
  SaleId: number
): Promise<tSaleReturn> => {
  const saleRepository: Repository<Sale> = AppDataSource.getRepository(Sale);
  const clientRepository: Repository<Client> =
    AppDataSource.getRepository(Client);

  const productRepository: Repository<Product> =
    AppDataSource.getRepository(Product);
  const findSale = await saleRepository.findOne({
    where: {
      id: SaleId,
    },
    relations: {
      products: true,
      client: true,
    },
  });
  if (!findSale) {
    throw new AppError("Venda não encontrada!");
  }
  const newClient = saleBody.client;
  const newProducts = saleBody.products;

  const totalPrice = Number(findSale.totalPrice);
  findSale.totalPrice = totalPrice;

  const customInstallmentPrice = findSale.customInstallmentPrice?.map((item) =>
    Number(item)
  );
  findSale.customInstallmentPrice = customInstallmentPrice;

  const installmentPrice = Number(findSale.installmentPrice);
  findSale.installmentPrice = installmentPrice;

  findSale.products.forEach((product) => {
    product.price = Number(product.price);
  });

  if (newClient) {
    const clientUpdated = clientRepository.create(newClient);
    await clientRepository.save(clientUpdated);
    const client = returnClientSchema.parse(clientUpdated);
    findSale.client = client;
  }
  if (newProducts) {
    for (const productData of newProducts) {
      const product = productRepository.create({
        ...productData,
        sale: findSale,
      });

      findSale.totalPrice += product.price * product.amount;
      findSale.products.push(product);
      await productRepository.save(product);
    }
  }

  if (saleBody.paymentMethod && saleBody.paymentMethod === "À vista") {
    findSale.portion = 1;
    findSale.installmentPrice = findSale.totalPrice;
  } else if (
    saleBody.paymentMethod === "Parcelado" &&
    findSale.totalPrice >= 50
  ) {
    if (saleBody.customDueDates && saleBody.customInstallmentPrice) {
      if (
        saleBody.customDueDates.length !== saleBody.portion ||
        saleBody.customInstallmentPrice.length !== saleBody.portion
      ) {
        throw new AppError(
          "Quantidade de datas/preços de parcelas não corresponde à quantidade de parcelas.",
          400
        );
      }

      findSale.portion = saleBody.portion;
      findSale.customDueDates = saleBody.customDueDates;
      findSale.customInstallmentPrice = saleBody.customInstallmentPrice;

      if (
        findSale.customInstallmentPrice.reduce(
          (acc, price) => acc + price,
          0
        ) !== findSale.totalPrice
      ) {
        throw new AppError(
          "O valor total não corresponde à soma dos valores das parcelas.",
          400
        );
      }
    } else {
      if (
        findSale.portion &&
        findSale.portion > 1 &&
        findSale.totalPrice >= 50
      ) {
        findSale.installmentPrice = findSale.totalPrice / findSale.portion;
      }
    }
  }

  await saleRepository.save(findSale);

  const sale = returnSaleSchema.parse(findSale);

  return sale;
};

export { updateSaleService };
