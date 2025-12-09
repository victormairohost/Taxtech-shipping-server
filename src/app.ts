// src/app.ts
import "dotenv/config";
import "express-async-errors";
import express, { Express, Request, Response } from "express";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";

import shipmentRoute from "./routes/shipment/shipmentRoute.js";
import { errorHandler, routeNotFound } from "./middlewares/index.js";

const app: Express = express();

app.use(express.json({ limit: "10mb" }));
app.use(helmet());
app.use(mongoSanitize());

app.use("/api/shipments", shipmentRoute);

app.get("/api/v1", (_req: Request, res: Response) => {
  res.status(200).json({ message: "Server has started successfully" });
});

app.use(routeNotFound);
app.use(errorHandler);

export default app;
