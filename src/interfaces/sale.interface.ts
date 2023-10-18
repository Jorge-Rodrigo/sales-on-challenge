import { z } from "zod";
import { returnSaleSchema, saleCreateSchema } from "../schemas";

type tSaleRequest = z.infer<typeof saleCreateSchema>;
type tSaleReturn = z.infer<typeof returnSaleSchema>;

export { tSaleRequest, tSaleReturn };
