const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../config/multer"); // Import Multer

router.post(
  "/CreateSubCategory",
  upload.single("productsubcategoryimage"),
  controller.createSubCategory
);

// Route to get all Sub categories
router.get("/getSubcategory", controller.getSubCategory);

// Delete Sub categories
router.delete("/deleteSubcategory", controller.deleteSubCategoryById);

// update Sub categories

router.put("/updateSubcategory", controller.editSubCategoryById);

module.exports = router;
