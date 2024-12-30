import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { logger } from "../utils/logger.js";
import { formatDate } from "../helpers/dateFunction.js";

dotenv.config();

const datetime = formatDate(Date.now());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export async function sendEmail(emailParams) {
  const { senderEmail, receiverEmail, subject, header, bodyContent } = emailParams;
  const mailOptions = {
    from: senderEmail || process.env.EMAIL,
    to: receiverEmail,
    subject,
    html: `<!DOCTYPE html>
      <html lang="en">
      
      <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login Notification</title>
      <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        
        .container {
            width: 90%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
            
        .header {
            text-align: center;
            padding-bottom: 20px;
        }
            
        .header h1 {
            margin: 0;
            color: #333333;
        }
        
        .content {
            text-align: center;
            font-size: 18px;
            color: #555555;
        }
            
        .footer {
            text-align: center;
            padding-top: 20px;
            font-size: 14px;
            color: #777777;
        }
     </style>
     </head>
     <body>
        <div class="container">
            <div class="header">
                <h1>${header}</h1>
            </div>
        ${bodyContent}
        <div class="footer">
            <p>&copy; 2024 ${
            process.env.COMPANY_NAME || "Luwi Team"
            }. All rights reserved.</p>
        </div>
        </div>
     </body>
        
    </html>
    `,
  };

  let message;

  try {
    logger.info(`${datetime}: Sending email to ${receiverEmail} ...`);
    const info = await transporter.sendMail(mailOptions);
    message = `${datetime}: Email sent successfully to ${receiverEmail}`;
    logger.info(message);
    return { success: true, message, info };
  } catch (error) {
    message = `${datetime}: Error sending email to ${receiverEmail}. Error: ${error.message}`;
    logger.error(message);
    return { success: false, message, error };
  }
}
