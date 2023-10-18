import { z } from "zod";
import { productCreateSchema, returnProductSchema } from "../schemas";

type tProductRequest = z.infer<typeof productCreateSchema>;
type tProductReturn = z.infer<typeof returnProductSchema>;

export { tProductRequest, tProductReturn };
