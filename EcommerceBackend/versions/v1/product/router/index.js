const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../middleware/multer");

router.post(
  "/createproduct",
  upload.fields([
    // { name: "thumbnailimage", maxCount: 1 },
    { name: "productimages", maxCount: 10 },
  ]),
  controller.createProduct
);

router.post("/getproduct", controller.getProduct);
router.post("/getrelatedproducts", controller.getRelatedProducts);

module.exports = router;
