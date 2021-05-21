import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const generateToken = (role, id) =>
  jwt.sign(
    {
      role,
      id,
    },
    process.env.PRIVATE_KEY
  );
export default generateToken;
