const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../config/multer"); // Import Multer

router.post(
  "/category",
  upload.single("productcategoryimage"),
  controller.createCategory
);

// Route to get all categories
router.get("/category", controller.getCategory);

// Delete categories
router.delete("/category", controller.deleteCategoryById);

// update categories

router.put("/category", controller.editCategoryById);

module.exports = router;
