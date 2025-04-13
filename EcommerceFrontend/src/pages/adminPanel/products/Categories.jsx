import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { addCategory } from "../../../services/components/category/addproducts";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { deleteProductCategory } from "../../../services/components/category/deleteproductcategory";
import toast from "react-hot-toast"; // Ensure you're using a notification library
import { updateProductCategory } from "../../../services/components/category/updateproductcategory";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Categories = () => {
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryFn: getProductCategory,
    queryKey: ["allcategories"],
    refetchOnMount: true,
  });

  const categoriesData = data?.data || [];
  console.log("🫱🏼‍🫲🏼", categoriesData);

  const { mutate } = useMutation({
    mutationFn: addCategory, // API call function
    onSuccess: (data) => {
      console.log("Category added:", data);

      // Invalidate the categories query to fetch updated data
      queryClient.invalidateQueries(["allcategories"]);
    },
    onError: (error) => {
      console.error("Error adding category:", error);
    },
  });

  const deleteCategoryMutation = useMutation({
    mutationFn: deleteProductCategory, // Function to call the delete API
    onSuccess: (response) => {
      if (response?.status) {
        toast.success(response?.message);
        queryClient.invalidateQueries(["allcategories"]);
      } else {
        toast.error(response?.message);
      }
    },
    onError: (error) => {
      toast.error(
        error?.response?.data?.message || "Error deleting product Category"
      );
    },
  });

  const [newCategory, setNewCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");
  const [editImage, setEditImage] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      console.error("No file selected");
    }
  };

  // Handle Add Category
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!newCategory.trim()) return alert("Category name is required!");
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("productcategoryname", newCategory);
    formData.append("productcategoryimage", image); // ✅ Must match backend

    console.log("FormData contents:");
    for (const pair of formData.entries()) {
      console.log(pair[0], pair[1]); // ✅ Debugging
    }

    mutate(formData);
  };

  // Handle Edit
  const handleEdit = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.productcategoryname);
    setEditImage(null); // Reset the image state to allow uploading a new image
    setEditImagePreview(
      category.productcategoryimage
        ? IMG_URL + "/uploads/" + category.productcategoryimage
        : null
    );
  };

  const updateProductCategoryMutaion = useMutation({
    mutationFn: updateProductCategory,
    onSuccess: () => {
      queryClient.invalidateQueries(["allcategories"]);
    },
    onError: (error) => {
      console.error("Error upadting category:", error);
    },
  });

  // Handle Update Category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();

    const formDataUpdate = new FormData();
    formDataUpdate.append("productcategoryname", editCategoryName);
    if (editImage) formDataUpdate.append("productcategoryimage", editImage);

    // Add the updated category ID
    formDataUpdate.append("id", editCategoryId);

    updateProductCategoryMutaion.mutate(formDataUpdate);

    mutate(formData);
    // Close the edit form
    setEditCategoryId(null);
  };

  // Handle Delete
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this product category?"
    );
    if (isConfirmed) {
      // Log the category to make sure it has the ID
      console.log("Deleting category with ID:", id);

      deleteCategoryMutation.mutate({
        id: id, // Make sure category.id is a valid value
      });

      // Invalidate the categories query to trigger a refetch
    }
  };

  return (
    <div className="mx-auto mt-0 bg-white p-6 rounded-lg shadow-lg">
      {/* Add Category Form */}

      {/* Categories Table */}
      <div className="mx-auto mt-0 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Manage Categories
        </h2>

        {/* Add Category Form */}
        <form onSubmit={handleAddCategory} className="mb-6 flex flex-col gap-4">
          <input
            type="text"
            placeholder="Enter Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-blue-500"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-md"
          />
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="w-24 h-24 object-cover rounded-md border"
            />
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        {/* Edit Category Form (conditionally rendered) */}
        {editCategoryId && (
          <form
            onSubmit={handleUpdateCategory}
            className="mb-6 flex flex-col gap-4"
          >
            <input
              type="text"
              placeholder="Edit Category Name"
              value={editCategoryName}
              onChange={(e) => setEditCategoryName(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-blue-500"
            />
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setEditImage(e.target.files[0])}
              className="w-full p-2 border rounded-md"
            />
            {editImagePreview && (
              <img
                src={editImagePreview}
                alt="Existing Image"
                className="w-24 h-24 object-cover rounded-md border"
              />
            )}
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update
            </button>
          </form>
        )}

        {/* Categories Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">#</th>
                <th className="border p-3 text-left">Category Name</th>
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categoriesData.length > 0 ? (
                categoriesData.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50">
                    <td className="border p-3">{category.id}</td>
                    <td className="border p-3">
                      {category.productcategoryname}
                    </td>
                    <td className="border p-3">
                      {category.productcategoryimage ? (
                        <img
                          src={
                            IMG_URL +
                            "/uploads/" +
                            category.productcategoryimage
                          }
                          alt={category.productcategoryname}
                          crossOrigin="anonymous"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "No Image"
                      )}
                    </td>
                    <td className="border p-3 text-center flex justify-center gap-4">
                      <button
                        onClick={() => handleEdit(category)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <FaEdit size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="text-red-600 hover:text-red-800"
                      >
                        <FaTrash size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="border p-3 text-center text-gray-500"
                  >
                    No categories available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Categories;
