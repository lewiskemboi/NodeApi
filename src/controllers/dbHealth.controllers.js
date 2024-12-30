import {
  sendJsonSuccess,
  serverJsonError,
} from "../helpers/response.helper.js";
import { sendEmail } from "../nodemailer/mailer.js";
import { checkDbConnection } from "../services/dbHealth.services.js";
import { mailerValidator } from "../validators/health.validators.js";

export const getDbHealth = async (req, res) => {
  try {
    const healthStatus = await checkDbConnection();
    healthStatus.status === "healthy"
      ? sendJsonSuccess(res, healthStatus)
      : serverJsonError(res, healthStatus);
  } catch (error) {
    serverJsonError(res, {
      isError: "unhealthy",
      message: "Unexpected error",
      error: error.message,
    });
  }
};

export const getMailerHealth = async (req, res) => {
  const { senderEmail, receiverEmail } = req.body;
  const validated = mailerValidator({ senderEmail, receiverEmail });

  if (validated.error) {
    return serverJsonError(res, {
      isError: true,
      message: "Validation error",
      error: validated.error,
    });
  }

  try {
    const response = await sendEmail({
      senderEmail,
      receiverEmail,
      subject: "Testing email nodemailer",
      header: 'Testing email nodemailer',
      bodyContent: `
      <div class="content">
        <p>Testing email nodemailer</p>
      </div>`,
    });
    
    return sendJsonSuccess(res, response);
  } catch (error) {
    return serverJsonError(res, {
      isError: true,
      message: "Unexpected error",
      error,
    });
  }
};
