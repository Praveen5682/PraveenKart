const db = require("../../../../config/knexfile");
const fs = require("fs");
const Joi = require("joi");
const path = require("path");

module.exports.createSubCategory = async (props) => {
  try {
    const { Subcategory, category, image } = props;

    if (!Subcategory || !category || !image) {
      throw new Error("Subcategory, category, and image are required");
    }

    const existingCategory = await db("categories")
      .where({ id: category })
      .first();
    if (!existingCategory) {
      throw new Error("Category does not exist");
    }

    const [newSubcategoryId] = await db("subcategories").insert({
      subcategoryname: Subcategory,
      subcategoryimage: image, // Store only the file name
      parent_category_id: category,
    });

    return {
      success: true,
      message: "Subcategory created successfully",
      id: newSubcategoryId,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports.getSubCategory = async () => {
  try {
    const subcategories = await db("subcategories").select(
      "id",
      "subcategoryname",
      "subcategoryimage",
      "parent_category_id"
    );

    return {
      success: true,
      data: subcategories,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

module.exports.deleteSubCategoryById = async ({ id }) => {
  try {
    if (!id) {
      throw new Error("Subcategory ID is required");
    }

    // Find the subcategory in the database
    const subcategory = await db("subcategories").where({ id }).first();

    if (!subcategory) {
      throw new Error("Subcategory not found");
    }

    // Delete the subcategory
    await db("subcategories").where({ id }).del();

    return {
      success: true,
      message: "Subcategory deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    return { success: false, error: error.message };
  }
};

module.exports.editSubCategoryById = async ({
  id,
  newName,
  newImage,
  newParentCategoryId,
}) => {
  try {
    if (!id) {
      throw new Error("Subcategory ID is required");
    }

    // Find the subcategory in the database
    const subcategory = await db("subcategories").where("id", id).first();

    if (!subcategory) {
      throw new Error("Subcategory not found");
    }

    // Prepare data to update
    const updatedData = {};

    if (newName) {
      updatedData.subcategoryname = newName;
    }

    if (newImage) {
      updatedData.subcategoryimage = newImage;
    }

    if (newParentCategoryId) {
      updatedData.parent_category_id = newParentCategoryId;
    }

    // Update the subcategory in the database
    await db("subcategories").where("id", id).update(updatedData);

    return {
      success: true,
      message: "Subcategory updated successfully",
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
