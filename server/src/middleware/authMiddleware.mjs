import jwt from "jsonwebtoken";

export const authenticateUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.JWT_SECRET || "hello_secret";

    const decoded = jwt.verify(token, secret);

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email,
    };

    next();
  } catch (err) {
    console.error("❌ Authentication error:", err);
    res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};
