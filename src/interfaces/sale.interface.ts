import { z } from "zod";
import {
  returnAllSales,
  returnSalePayment,
  returnSaleSchema,
  saleCreateSchema,
} from "../schemas";

type tSaleRequest = z.infer<typeof saleCreateSchema>;
type tSaleReturn = z.infer<typeof returnSaleSchema>;
type tSalePaymentReturn = z.infer<typeof returnSalePayment>;
type tSaleReturnAll = z.infer<typeof returnAllSales>;

export { tSaleRequest, tSaleReturn, tSalePaymentReturn, tSaleReturnAll };
