import { z } from "zod";
import { clientCreateSchema, returnClientSchema } from "../schemas";

type tClientRequest = z.infer<typeof clientCreateSchema>;
type tClientReturn = z.infer<typeof returnClientSchema>;

export { tClientRequest, tClientReturn };
