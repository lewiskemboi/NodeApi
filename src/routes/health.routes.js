import { Router } from "express";
import dotenv from "dotenv";
import fs from 'fs';

import { formatDate } from "../helpers/dateFunction.js";

dotenv.config();

const healthRouter = Router();

// Api health check
healthRouter.get("/health", (req, res) => {
  try {
    res.status(200).send("Api server is very healthy");
  } catch (error) {
    next(error);
  }
});

// Environment variables check
healthRouter.get("/environment", (req, res) => {
  // const requiredEnvVars = ["API_PORT", "SQL_USER", "SQL_PASSWORD", "SQL_SERVER", "SQL_DB", "SQL_SERVER_PORT", "SQL_ENCRYPT", "SQL_TRUST_SERVER_CERTIFICATE", "API_PORT", "JWT_SECRET", "Email", "PASSWORD"];
  // const requiredEnvVars = Object.keys(process.env);
  // Read the keys directly from the .env file
  const requiredEnvVars = fs
    .readFileSync(".env", "utf8")
    .split("\n")
    .map((line) => line.split("=")[0].trim())
    .filter((key) => key && !key.startsWith("#"));
    
  const missingVars = requiredEnvVars.filter((key) => !process.env[key]);

  if (missingVars.length > 0) {
    res.status(500).json({
      error: true,
      message: `Missing an important environment variable (s): ${missingVars.join(
        ", "
      )}`,
    });
  } else {
    res.status(200).json({
      error: false,
      message: "All required environment variables are set",
    });
  }
});

// Check server uptime
const startTime = Date.now();

healthRouter.get("/uptime", (req, res) => {
  const uptime = Date.now() - startTime;
  res.status(200).json({
    startTime: formatDate(startTime),
    uptime: `${Math.floor(uptime / 1000)} seconds`,
  });
});

export default healthRouter;
