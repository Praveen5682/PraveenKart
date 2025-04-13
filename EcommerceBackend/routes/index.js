// /routes/index.js

const express = require("express");
const router = express.Router();

// auth
router.use("/auth", require("../versions/v1/auth/router/index"));

//product
router.use(
  "/product",
  require("../versions/v1/product/router/index") // Ensure this path is correct
);

// Mount the productcategory router at /api/productcategory
router.use(
  "/productcategory",
  require("../versions/v1/productcategory/router/index") // Ensure this path is correct
);

// SubCategory
router.use(
  "/productSubcategory",
  require("../versions/v1/productSubcategory/router/index") // Ensure this path is correct
);

// Banner
router.use("/banner", require("../versions/v1/banner/router/index"));

// specification
router.use(
  "/specification",
  require("../versions/v1/specifications/router/index")
);

module.exports = router;
