import { z } from "zod";

const clientCreateSchema = z.object({
  name: z.string().max(78),
});

const returnClientSchema = clientCreateSchema.extend({
  id: z.number(),
});

export { clientCreateSchema, returnClientSchema };
