import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET || "d~rZ2aUTnY[Xu4=";

export const generateToken = (userId: number) => {
  return jwt.sign({ id: userId }, jwtSecret, {
    algorithm: "HS256",
    // FIXME: Change expire date
    expiresIn: "30d",
  });
};
