const service = require("../model/index");
const db = require("../../../../config/knexfile");
const Joi = require("joi");

module.exports.createSubCategory = async (req, res) => {
  try {
    console.log("Request Body:", req.body);
    console.log("Uploaded File:", req.file);

    const { subcategoryName, categoryId } = req.body;
    const image = req.file ? req.file.filename : null; // Get the uploaded file name

    // Validate input
    const schema = Joi.object({
      subcategoryName: Joi.string().required().messages({
        "any.required": "Subcategory name is required.",
        "string.empty": "Subcategory name cannot be empty.",
      }),
      categoryId: Joi.number().integer().required().messages({
        "any.required": "Category ID is required.",
        "number.base": "Category ID must be a valid number.",
      }),
      image: Joi.string().required().messages({
        "any.required": "Image is required.",
        "string.empty": "Image cannot be empty.",
      }),
    });

    const { error } = schema.validate({ subcategoryName, categoryId, image });

    if (error) {
      return res
        .status(400)
        .json({ success: false, error: error.details[0].message });
    }

    // Call the service function
    const result = await service.createSubCategory({
      Subcategory: subcategoryName,
      category: categoryId,
      image, // Save only the filename
    });

    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating subcategory:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error." });
  }
};

module.exports.getSubCategory = async (req, res) => {
  try {
    const result = await service.getSubCategory(); // Call correct function

    if (!result.success) {
      return res.status(400).json({ success: false, message: result.error });
    }

    return res.status(200).json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.deleteSubCategoryById = async (req, res) => {
  try {
    const { id } = req.body; // Use req.params instead of req.body
    console.log("Deleting subcategory with ID:", id);

    // Check if ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory ID is required" });
    }

    // Call the correct service function
    const result = await service.deleteSubCategoryById({ id });

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.error });
    }

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.editSubCategoryById = async (req, res) => {
  try {
    const { id, subcategoryname, subcategoryimage, parent_category_id } =
      req.body;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Subcategory ID is required" });
    }

    // Check if subcategory exists
    const subcategory = await db("subcategories").where("id", id).first();
    if (!subcategory) {
      return res
        .status(404)
        .json({ success: false, message: "Subcategory not found" });
    }

    // If parent_category_id is provided, check if it exists in categories
    if (parent_category_id) {
      const parentCategory = await db("categories")
        .where("id", parent_category_id)
        .first();
      if (!parentCategory) {
        return res.status(400).json({
          success: false,
          message: "Invalid parent_category_id: Category does not exist",
        });
      }
    }

    // Prepare data for update (only update provided fields)
    const updatedData = {};
    if (subcategoryname) updatedData.subcategoryname = subcategoryname;
    if (subcategoryimage) updatedData.subcategoryimage = subcategoryimage;
    if (parent_category_id) updatedData.parent_category_id = parent_category_id;

    // Update the subcategory
    await db("subcategories").where("id", id).update(updatedData);

    return res.status(200).json({
      success: true,
      message: "Subcategory updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
