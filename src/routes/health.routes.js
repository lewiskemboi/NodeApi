import { Router } from "express";
import dotenv from "dotenv";
import fs from "fs";

import { formatDate } from "../helpers/dateFunction.js";
import { sendJsonSuccess, serverJsonError, successMessage } from "../helpers/response.helper.js";
import { getDbHealth, getMailerHealth } from "../controllers/dbHealth.controllers.js";

dotenv.config();

const healthRouter = Router();

// Api health check
healthRouter.get("/server/health", (req, res) => {
  try {
    successMessage(res, "Api server is very healthy");
  } catch (error) {
    next(error);
  }
});

// Environment variables check
healthRouter.get("/server/environment", (req, res) => {
  // const requiredEnvVars = Object.keys(process.env);
  const requiredEnvVars = fs
    .readFileSync(".env", "utf8")
    .split("\n")
    .map((line) => line.split("=")[0].trim())
    .filter((key) => key && !key.startsWith("#"));

  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    serverJsonError(res, {
      isError: true,
      error: "",
      message: `Missing an important environment variable (s): ${missingVars.join(
        ", "
      )}`,
    });
  } else {
    sendJsonSuccess(res, {
      isError: false,
      error: "",
      message: "All required environment variables are set",
    });
  }
});

// Check server uptime
const startTime = Date.now();

healthRouter.get("/server/uptime", (req, res) => {
  const uptime = Date.now() - startTime;
  sendJsonSuccess(res, {
    startTime: formatDate(startTime),
    uptime: `${Math.floor(uptime / 1000)} seconds`,
  });
});

healthRouter.get("/database/health", getDbHealth);

healthRouter.get("/mailer/health", getMailerHealth);

export default healthRouter;
