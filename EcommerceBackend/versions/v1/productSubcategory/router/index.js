const express = require("express");
const router = express.Router();
const controller = require("../controller/index");
const upload = require("../../../../middleware/multer");

router.post(
  "/CreateSubCategory",
  upload.single("productsubcategoryimage"),
  controller.createSubCategory
);

// Route to get all Sub categories
router.post("/getSubcategory", controller.getSubCategoryController);

// Delete Sub categories
router.delete("/deleteSubcategory", controller.deleteSubCategoryById);

// update Sub categories

router.put("/updateSubcategory", controller.editSubCategoryById);

module.exports = router;
