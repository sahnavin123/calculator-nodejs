import express from "express";
import cors from "cors";
import calculatorRouter from "./routes/calculator.routes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api.com", calculatorRouter);
app.use(errorHandler);

export default app;
