const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../middleware/multer");

router.post(
  "/createbanner",
  upload.single("bannerimage"),
  controller.createBanner
);

router.get("/getbanner", controller.getBanner);
router.delete("/deleteBanner", controller.deleteBanner);

module.exports = router;
