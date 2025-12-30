const jwt = require("jsonwebtoken");
const userSchema = require("../model/userModel");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        error: true,
        message: "Token not provided",
      });
    }

    const token = authHeader.split(" ")[1];

    //verify token
    const decoded = jwt.verify(token, process.env.jwt_SECRET_KEY);

    const userId = decoded.userId || decoded.id;

    if (!userId) {
      return res.status(401).josn({
        success: false,
        error: true,
        message: "Invalid token payload",
      });
    }

    const user = await userSchema.findById(userId).select("-password");

    if (!user) {
      return res.status(401).josn({
        success: false,
        error: true,
        message: "user not found",
      });
    }

    req.user = user;
    req.userID = user._id;

    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message)


     return res.status(401).json({
      success: false,
      error: true,
      message: "Invalid or expired token",
    });
  }

};
