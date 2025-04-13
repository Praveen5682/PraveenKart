const service = require("../model/index");
const db = require("../../../../config/knexfile");

module.exports.createCategory = async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, error: "Image is required" });
    }

    const { productcategoryname } = req.body;
    const productcategoryimage = req.file.filename; // Get uploaded image filename

    if (!productcategoryname) {
      return res
        .status(400)
        .json({ success: false, error: "Product category name is required" });
    }

    // Check if category already exists

    const existingCategory = await db("categories")
      .where({ productcategoryname })
      .first();

    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, error: "Category already exists" });
    }

    // Insert new category
    const [newcategoryid] = await db("categories").insert({
      productcategoryname,
      productcategoryimage,
    });

    return res.json({
      success: true,
      message: "Category created successfully",
      id: newcategoryid,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    const result = await service.getCategory();

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

module.exports.deleteCategoryById = async (req, res) => {
  try {
    const { id } = req.body; // Extract category ID from request body
    console.log("Deleting category with ID:", id);

    // Check if ID is provided
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    // Call the service function to delete the category
    const result = await service.deleteCategoryById({ id }); // Pass { id } instead of { categoryid }

    if (!result.success) {
      return res.status(404).json({ success: false, message: result.error });
    }

    return res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.editCategoryById = async (req, res) => {
  const { id } = req.body; // Get the category ID from the URL parameter
  const { productcategoryname, productcategoryimage } = req.body; // Get the updated name and image from the request body

  try {
    // Check if the ID is provided in the request parameters
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }

    // Check if there is any data to update (either name or image)
    if (!productcategoryname && !productcategoryimage) {
      return res.status(400).json({
        success: false,
        message:
          "At least one field (name or image) must be provided to update",
      });
    }

    // Find the category in the database
    const category = await db("categories").where("id", id).first();

    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    // Prepare the updated data (only the fields that are provided)
    const updatedData = {};

    if (productcategoryname) {
      updatedData.productcategoryname = productcategoryname;
    }

    if (productcategoryimage) {
      updatedData.productcategoryimage = productcategoryimage;
    }

    // Update the category in the database
    await db("categories").where("id", id).update(updatedData);

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
    });
  } catch (error) {
    console.error("Error updating category:", error);
    return res.status(500).json({
      success: false,
      message: "Error updating category",
      error: error.message,
    });
  }
};
