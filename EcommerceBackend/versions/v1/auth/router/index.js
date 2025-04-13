const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("../../../../middleware/auth");
const controller = require("../controller/index");

// Public route (no authentication required)
router.post("/register", controller.registration);
router.post("/login", controller.login);

// Protected routes (authentication and role checks)
// router.get("/admin", verifyToken, checkRole([1]), (req, res) => {
//   // Only users with roleId = 1 (e.g., admin) can access this route
//   res.status(200).json({ message: "Welcome Admin!" });
// });

// router.get("/user", verifyToken, checkRole([1, 2]), (req, res) => {
//   // Users with roleId 1 (admin) or 2 (normal user) can access this route
//   res.status(200).json({ message: "Welcome User!" });
// });

module.exports = router;
