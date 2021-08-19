import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import expressJwt from "express-jwt";

dotenv.config();
const app = express();
const jwtSecret = process.env.JWT_SECRET || "d~rZ2aUTnY[Xu4=";

app.use(cors());
// FIXME: JWT Handler
app.use(
  // FIXME: ExpressJwt decode automaticaly the token from the ctx.req.headers.authorization
  // And place it to the ctx.header object as "user" property.
  expressJwt({
    credentialsRequired: false,
    secret: jwtSecret,
    algorithms: ["HS256"],
  })
);

export default app;
