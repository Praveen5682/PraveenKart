const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/createproduct", controller.createProduct);
router.post("/getproduct", controller.getProduct);

module.exports = router;
