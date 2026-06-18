import { findUserById } from "../dao/user.dao.js";
import { verifyToken } from "../utils/helper.js";

export const authMiddleware = async (req, res, next) => {
 try {
  const token = req.cookies?.accessToken;

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized (no token)" });
  }

  let userId;

  try {
    userId = verifyToken(token);
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const user = await findUserById(userId);

  if (!user) {
    return res.status(401).json({ message: "User not found" });
  }

  req.user = user;
  next();

 } catch (error) {
  console.error("AUTH ERROR", error);
  return res.status(500).json({ message: "Server error" });
 }
};