const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    // Prefer Authorization header with Bearer token
    const authHeader = req.headers["authorization"] || req.headers["auth"];
    const token =
      authHeader && authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader || req.body.token || req.query.token;

    if (!token) {
      return res
        .status(403)
        .json({ message: "Access Denied: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // will contain email, roleId, etc.

    next(); // pass control to the next middleware
  } catch (err) {
    console.error("❌ Invalid token:", err.message);
    return res.status(401).json({ message: "Invalid Token" });
  }
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    const { roleId } = req.user;

    if (!allowedRoles.includes(roleId)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }

    next();
  };
};

module.exports = { verifyToken, checkRole };
