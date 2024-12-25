import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import { logger } from "./src/utils/logger.js";
import healthRouter from "./src/routes/health.routes.js";

dotenv.config();

const app = express();

var corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

const PORT = process.env.API_PORT || 8000;

// Middleware for parsing
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Enable CORS
app.use(cors(corsOptions));

// Routes
app.use('/api',healthRouter);

// Error-handling middleware
app.use((err, req, res, next) => {
  logger.error(err.stack || err.message);
  res.status(err.status || 500).json({
    error: true,
    message: err.message || "Internal Server Error",
  });
});

// Starting api server
const MAX_RETRIES = process.env.MAX_RETRIES;
const RETRY_DELAY = process.env.RETRY_DELAY;

let retries = 0;

const startServer = () => {
  try {
      app.listen(PORT, () => {
          logger.info(`The server is running on port ${PORT}`);
        });
    } catch (error) {
        logger.error(`Failed to start the server: ${error.message}`);
        retries += 1;
        
        if (retries <= MAX_RETRIES) {
            logger.info(
                `Retrying to start the server... Attempt ${retries}/${MAX_RETRIES}`
            );
            setTimeout(startServer, RETRY_DELAY);
        } else {
            logger.error("Max retries reached. Exiting...");
            process.exit(1);
        }
    }
};

// Start the API server
startServer()