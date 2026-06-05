import { transporter } from "./mailer.js";

type EmailType = "register" | "reset";

interface SendEmailParams {
  email: string;
  name: string;
  code: string;
  type: EmailType;
}

export const sendEmail = async ({
  email,
  name,
  code,
  type,
}: SendEmailParams): Promise<void> => {
  const body =
    type === "register"
      ? `Welcome ${name}!\n\nHere is your confirm code: ${code}`
      : `Here is your confirm code: ${code}`;
  const mailOptions = {
    from: "personalproject1691@gmail.com",
    to: email,
    subject: "Verification Code",
    text: body,
  };
  await transporter.sendMail(mailOptions);
};

// later you can extend
// type EmailType = "register" | "reset" | "welcome" | "invoice";
// or html: `<h1>Welcome ${name}</h1>`
