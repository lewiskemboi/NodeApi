import { serverHealthError } from "../helpers/response.helper.js";
import { checkDbConnection } from "../services/dbHealth.services.js";

export const getDbHealth = async (req, res) => {
    try {
        const healthStatus = await checkDbConnection();
        const statusCode = healthStatus.status === 'healthy' ? 200 : 500;
        res.status(statusCode).json(healthStatus);
    } catch (error) {
        serverHealthError(res, { isError: 'unhealthy', message: 'Unexpected error', error: error.message })
    }
};
