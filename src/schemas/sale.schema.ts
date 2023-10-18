import { z } from "zod";
import { clientCreateSchema, returnClientSchema } from "./client.schema";
import { productCreateSchema, returnProductSchema } from "./product.schema";

const saleCreateSchema = z.object({
  client: clientCreateSchema.optional(),
  products: z.array(productCreateSchema),
  paymentMethod: z.string(),
  portion: z.number().nullable(),
  customDueDates: z.array(z.string()).optional().nullable(),
  customInstallmentPrice: z.array(z.number()).optional().nullable(),
});

const returnSaleSchema = z.object({
  id: z.number(),
  client: returnClientSchema.optional(),
  products: z.array(returnProductSchema),
  totalPrice: z.number(),
  paymentMethod: z.string(),
  portion: z.number(),
  installmentPrice: z
    .number()
    .transform((value) => {
      return parseFloat(value.toFixed(2));
    })
    .optional(),
  customDueDates: z.array(z.string().or(z.date())).optional().nullable(),
  customInstallmentPrice: z.array(z.number()).optional().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

const allPortionsSchema = z.object({
  price: z.number().transform((value) => {
    return parseFloat(value.toFixed(2));
  }),
  date: z.string().or(z.date()),
});

const returnSalePayment = z.object({
  totalPrice: z.string(),
  portions: z.number(),
  allPortions: z.array(allPortionsSchema),
});

export { saleCreateSchema, returnSaleSchema, returnSalePayment };
