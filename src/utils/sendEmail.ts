import nodemailer from "nodemailer";
import env from "../env";

interface SendEmailOptions {
  to: string;
  subject: string;
  html?: string;
  text?: string;
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
});

export const sendEmail = async ({ to, subject, html, text }: SendEmailOptions) => {
  const mailOptions = {
    from: `"Messenger App" <${env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions);
};

export default sendEmail;
