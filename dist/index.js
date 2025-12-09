// // A package to access the environment variables
// import "dotenv/config";
// // A package to handle async errors
// import "express-async-errors";
// import express, { Express, Request, Response } from "express";
// // security package
// import mongoSanitize from "express-mongo-sanitize";
// import helmet from "helmet";
// // import { rateLimit } from "express-rate-limit";
// const app: Express = express();
// // Port number
// const port = process.env.PORT || 4000;
// import shipmentRoute from "./routes/shipment/shipmentRoute.js";
// import { connectToDB } from "./config/databaseConnection.js";
// import { errorHandler, routeNotFound } from "./middlewares/index.js";
// // For parsing application/json. allow the app to accept json data
// app.use(express.json({ limit: "10mb" }));
// // For logging all requests to the console
// // app.use(morgan("dev"));
// // // rate limiter extra securities
// // const apiLimiter = rateLimit({
// //   windowMs: 60 * 60 * 1000, // 1 hour
// //   max: 200, // Limit each IP to 50 requests per `window` (here, per 1 hour)
// //   message: "Too many requests from this IP, please try again after 1 hour",
// //   standardHeaders: "draft-7", // draft-6: RateLimit-* headers; draft-7: combined RateLimit header
// //   legacyHeaders: false, // X-RateLimit-* headers
// //   // store: ... , // Use an external store for more precise rate limiting
// // });
// app.use(helmet());
// app.use(mongoSanitize());
// // For handling all authentication routes
// app.use("/api/shipments", shipmentRoute);
// // Default route for testing if server is active
// app.get("/api/v1", async (req: Request, res: Response) => {
//   console.log(req.url);
//   res.status(200).json({ message: "Server has started successfully" });
// });
// // For handling all other routes that are not defined
// app.use(routeNotFound);
// // For handling all errors that occur in the application
// app.use(errorHandler);
// app.listen(port, async () => {
//   try {
//     await connectToDB();
//     console.log(`Server is running on port ${port}`);
//   } catch (error) {
//     console.log(error);
//   }
// });
// src/index.ts
import app from "./app.js"; // <-- note .js after build
import { connectToDB } from "./config/databaseConnection.js";
const port = process.env.PORT || 4000;
app.listen(port, async () => {
    try {
        await connectToDB();
        console.log(`Server is running on port ${port}`);
    }
    catch (error) {
        console.error(error);
    }
});
//# sourceMappingURL=index.js.map