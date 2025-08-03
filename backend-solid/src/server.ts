import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { requestLogger } from "@/middlewares";
import { env } from "@/config";
import { createPaymentRoute } from "./routes/patient/payment-route";

export const createApp = () => {
  const app = express();

  app.use(
    "/api/webhook",
    express.raw({ type: "application/json" }),
    createPaymentRoute()
  );

  app.use(
    cors({
      origin: env.FRONTEND_BASE_URL,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(requestLogger);
  app.use(cookieParser());

  return app;
};
