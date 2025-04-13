const db = require("../../../../config/knexfile");
const fs = require("fs");
const path = require("path");

module.exports.createCategory = async (props) => {
  try {
    const { productcategoryname, productcategoryimage } = props;

    if (!productcategoryname || !productcategoryimage) {
      throw new Error("Both product category name and image are required");
    }

    // Check if the category already exists
    const existingCategory = await db("categories")
      .where({ productcategoryname })
      .first();

    if (existingCategory) {
      throw new Error("Category already exists");
    }

    // Insert new category
    const [newcategoryid] = await db("categories").insert({
      productcategoryname,
      productcategoryimage,
    });

    return {
      success: true,
      message: "Category created successfully",
      id: newcategoryid,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports.getCategory = async () => {
  try {
    const categories = await db("categories").select("*");
    return {
      success: true,
      data: categories,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
module.exports.deleteCategoryById = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Category ID is required");
    }

    // Find the category in the database
    const category = await db("categories").where("id", id).first(); // Corrected where clause

    if (!category) {
      throw new Error("Category not found");
    }

    // Delete the category from the database
    await db("categories").where("id", id).del(); // Corrected where clause

    return {
      success: true,
      message: "Category deleted successfully",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports.editCategoryById = async ({ id, newCategoryName, newImage }) => {
  try {
    if (!id) {
      throw new Error("Category ID is required");
    }

    // Find the category in the database
    const category = await db("categories").where("id", id).first();

    if (!category) {
      throw new Error("Category not found");
    }

    // Prepare data to update (using the new data or old data if not provided)
    const updatedData = {};

    if (newCategoryName) {
      updatedData.productcategoryname = newCategoryName;
    }

    if (newImage) {
      updatedData.productcategoryimage = newImage; // Image should be handled similarly to how you upload it
    }

    // Update the category in the database
    await db("categories").where("id", id).update(updatedData);

    return {
      success: true,
      message: "Category updated successfully",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
