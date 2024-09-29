import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  port: 465,
  auth: {
    user: "techlyft.official@gmail.com",
    pass: process.env.NODEMAILER_AUTH_PASS,
  },
});

export const sendVerificationEmail = async (
  email: string,
  username: string,
  verifyCode: string
) => {
  try {
    const emailTemplate = VERIFICATION_EMAIL_TEMPLATE.replace(
      "{verificationCode}",
      verifyCode
    );

    const info = await transporter.sendMail({
      from: '"TrueFeedback" <techlyft.official@gmail.com>',
      to: email,
      subject: "Verify your email address",
      html: emailTemplate,
    });

    console.log("Email sent: " + info.response);
    return {
      success: true,
      message: "Varification email sent successfully",
    };
  } catch (error) {
    console.error("Error sending verification email:", error);
    return {
      success: false,
      message: "Failed to send verification email",
    };
  }
};
