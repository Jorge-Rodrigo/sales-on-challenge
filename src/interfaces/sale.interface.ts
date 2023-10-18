import { z } from "zod";
import {
  returnSalePayment,
  returnSaleSchema,
  saleCreateSchema,
} from "../schemas";

type tSaleRequest = z.infer<typeof saleCreateSchema>;
type tSaleReturn = z.infer<typeof returnSaleSchema>;
type tSalePaymentReturn = z.infer<typeof returnSalePayment>;

export { tSaleRequest, tSaleReturn, tSalePaymentReturn };
