import nodemailer from "nodemailer";
import { VERIFICATION_EMAIL_TEMPLATE, REFLEXVERSE_FORM_EMAIL_TEMPLATE  } from "./emailTemplate";

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


export const sendReflexVerseEmail = async (
  email: string,
  name: string,
  budget: string,
  customBudget: string,
  videoType: string,
  videoLength: string,
  socialAccounts: any
) => {
  try {
    const emailTemplate = REFLEXVERSE_FORM_EMAIL_TEMPLATE.replace("{name}", name).replace("{email}", email).replace("{budget}", budget).replace("{customBudget}", customBudget).replace("{videoType}", videoType).replace("{videoLength}", videoLength).replace("{socialAccounts}", socialAccounts);

    const info = await transporter.sendMail({
      from: '"Reflex Verse" <techlyft.official@gmail.com>',
      to: "reflexverse@gmail.com",
      subject: "NEW PROJECT STARTED - REFLEX VERSE",
      html: emailTemplate,
    });

    console.log("Email sent: " + info.response);
    return {
      success: true,
      message: "reflex verse email sent successfully",
    };
  } catch (error) {
    console.error("Error sending reflex verse email:", error);
    return {
      success: false,
      message: "Failed to send reflex verse email",
    };
  }
};

export const send__CONTACT_ReflexVerseEmail = async (
  email: string,
  name: string,
  body: string,
) => {
  try {
    const emailTemplate = REFLEXVERSE_FORM_EMAIL_TEMPLATE.replace("{name}", name).replace("{email}", email).replace("{body}", body);

    const info = await transporter.sendMail({
      from: '"Reflex Verse" <techlyft.official@gmail.com>',
      to: "reflexverse@gmail.com",
      subject: "NEW CONTACT - REFLEX VERSE",
      html: emailTemplate,
    });

    console.log("Email sent: " + info.response);
    return {
      success: true,
      message: "reflex verse - Contact - email sent successfully",
    };
  } catch (error) {
    console.error("Error sending reflex verse  - Contact -  email:", error);
    return {
      success: false,
      message: "Failed to send reflex verse  - Contact -  email",
    };
  }
};
