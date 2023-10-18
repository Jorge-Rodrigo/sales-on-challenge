import { z } from "zod";
import { clientCreateSchema, returnClientSchema } from "./client.schema";
import { productCreateSchema, returnProductSchema } from "./product.schema";

const saleCreateSchema = z.object({
  client: clientCreateSchema,
  products: z.array(productCreateSchema),
  paymentMethod: z.string(),
  portion: z.number().nullable(),
});

const returnSaleSchema = z.object({
  id: z.number(),
  client: returnClientSchema,
  products: z.array(returnProductSchema),
  totalPrice: z.number(),
  paymentMethod: z.string(),
  portion: z.number().nullable(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export { saleCreateSchema, returnSaleSchema };
