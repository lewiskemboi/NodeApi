import { logger } from "./logger.js";
import dotenv from "dotenv";
import sql from "mssql";

dotenv.config();

const sqlConfig = {
  user: process.env.SQL_USER || "user",
  password: process.env.SQL_PASSWORD || "password",
  server: process.env.SQL_SERVER || "server name",
  database: process.env.SQL_DB || "database name",
  options: {
    encrypt: false,
    trustservercertificate: true,
  },
};

let appPool;

let poolrequest;

const MAX_RETRIES = process.env.MAX_RETRIES || 5;

async function connectToDatabase() {
  let retries = 0;

  while (retries < MAX_RETRIES) {
    try {
      appPool = await sql.connect(sqlConfig);
      poolrequest = () => appPool.request();

      if (appPool) {
        logger.info("DB connected successfully");
        return;
      }
    } catch (error) {
      retries++;
      logger.error(
        `Database connection failed (attempt ${retries} of ${MAX_RETRIES}):`,
        error
      );

      if (retries === MAX_RETRIES) {
        logger.error("All retry attempts failed. Exiting.");
        process.exit(1);
      }

      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, process.env.RETRY_DELAY || 3000)
      );
    }
  }
}

// Call the function to connect to the database
connectToDatabase();

export { poolrequest, sql };
