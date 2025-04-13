const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../config/multer"); // Import Multer

router.post(
  "/createbanner",
  upload.single("bannerimage"),
  controller.createBanner
);

router.get("/getbanner", controller.getBanner);
router.delete("/deleteBanner", controller.deleteBanner);

module.exports = router;
