import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

export const mailOptions = (email: string, password: string) => {
  const message = {
    from: `Litee App <${email}>`,
    to: email,
    subject: "🔥 Litee Account Password 🔥",
    html: `<h3>Bienvenue sur Litee!</h3><p>Voici votre nouveau mot de passe: <strong>${password}</strong></p><p>Utiliser le mot de passe fournit afin d'accéder à votre compte. Enjoy!</p>`,
  };

  return transporter.sendMail(message, (error) => {
    if (error) {
      console.error(error);
      throw new Error("An error occured while sending the email.");
    }
  });
};
