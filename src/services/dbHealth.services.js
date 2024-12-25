import { poolrequest } from "../utils/dbConnect.js";

export const checkDbConnection = async () => {
  try {
    await poolrequest().query("SELECT 1");
    return { status: "healthy", message: "Database is connected" };
  } catch (error) {
    return { status: "unhealthy", message: error.message };
  }
};
