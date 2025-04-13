const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/register", controller.registration);

module.exports = router;
