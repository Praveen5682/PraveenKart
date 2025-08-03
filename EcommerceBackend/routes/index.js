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

// add to cart

router.use("/cart", require("../versions/v1/cart/router/index"));

// Comments
router.use("/comment", require("../versions/v1/comments/router/index"));

// Wiahlist
router.use("/wishlist", require("../versions/v1/wishlist/router/index"));

// New Arrivals
router.use("/newarrivals", require("../versions/v1/newArrivals/router/index"));

module.exports = router;
