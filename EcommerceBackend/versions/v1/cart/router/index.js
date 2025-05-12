const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.post("/addToCart", controller.addToCart);
router.post("/getcarts", controller.getCarts);
router.post("/deletecarts", controller.deleteCart);

module.exports = router;
