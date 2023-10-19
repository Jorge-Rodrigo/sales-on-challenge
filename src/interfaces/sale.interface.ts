import { z } from "zod";
import {
  returnAllSales,
  returnSalePayment,
  returnSaleSchema,
  saleCreateSchema,
  saleUpdateSchema,
} from "../schemas";

type tSaleRequest = z.infer<typeof saleCreateSchema>;
type tSaleRequestUpdate = z.infer<typeof saleUpdateSchema>;
type tSaleReturn = z.infer<typeof returnSaleSchema>;
type tSalePaymentReturn = z.infer<typeof returnSalePayment>;
type tSaleReturnAll = z.infer<typeof returnAllSales>;

export {
  tSaleRequest,
  tSaleReturn,
  tSalePaymentReturn,
  tSaleReturnAll,
  tSaleRequestUpdate,
};
