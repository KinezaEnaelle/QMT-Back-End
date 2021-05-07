import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generateToken = (email) =>
  jwt.sign({
    email: email,
  },
  process.env.PRIVATE_KEY
  );
export default generateToken;