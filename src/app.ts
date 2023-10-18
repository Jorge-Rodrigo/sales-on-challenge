import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { salesRoutes } from "./routes";
import { handleErrors } from "./error";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/sales", salesRoutes);
app.use(handleErrors);

export default app;
