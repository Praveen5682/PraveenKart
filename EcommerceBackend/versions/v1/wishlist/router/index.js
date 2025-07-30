const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../middleware/multer");

router.post("/createwishlist", controller.createWishlist);
router.post("/getwishlist", controller.getWishlist);
router.post("/deletewishlist", controller.deleteWishlist);

module.exports = router;
