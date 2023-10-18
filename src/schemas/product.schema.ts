import { z } from "zod";

const productCreateSchema = z.object({
  name: z.string().max(78),
  price: z
    .number()
    .min(0)
    .max(10000)
    .refine((price) => {
      const decimalCount = (price.toString().split(".")[1] || []).length;
      return decimalCount <= 2;
    }),
  amount: z.number(),
});

const returnProductSchema = productCreateSchema.extend({
  id: z.number(),
});

export { productCreateSchema, returnProductSchema };
