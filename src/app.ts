import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import { salesRoutes } from "./routes";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/sales", salesRoutes);

export default app;
