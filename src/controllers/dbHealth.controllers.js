import { sendJsonSuccess, serverJsonError } from "../helpers/response.helper.js";
import { checkDbConnection } from "../services/dbHealth.services.js";

export const getDbHealth = async (req, res) => {
    try {
        const healthStatus = await checkDbConnection();
        healthStatus.status === 'healthy' ? sendJsonSuccess(res, healthStatus) : serverJsonError(res, healthStatus);
    } catch (error) {
        serverJsonError(res, { isError: 'unhealthy', message: 'Unexpected error', error: error.message })
    }
};
