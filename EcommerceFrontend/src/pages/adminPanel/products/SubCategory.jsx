import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { addSubCategory } from "../../../services/components/Subcategory/addSubCategory";
import { getSubCategory } from "../../../services/components/Subcategory/getSubCategory";
import { updateSubCategory } from "../../../services/components/Subcategory/updateSubCategory";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const SubCategories = () => {
  const [Subcategory, setSubcategory] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [editData, setEditData] = useState(null);

  const queryClient = new QueryClient();

  const { data: categoriesData } = useQuery({
    queryFn: getProductCategory,
    queryKey: ["allcategories"],
  });
  const categories = categoriesData?.data || [];

  const { data: subcategoriesData } = useQuery({
    queryFn: getSubCategory,
    queryKey: ["allsubcategories"],
  });
  const subcategories = subcategoriesData?.data || [];
  console.log("subcategories", subcategories);

  const addSubcategoryMutation = useMutation({
    mutationFn: addSubCategory,
    onSuccess: () => queryClient.invalidateQueries("allsubcategories"),
  });

  const updateSubcategoryMutation = useMutation({
    mutationFn: updateSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries("allsubcategories");
      setEditMode(false);
      setEditData(null);
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setImage(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddSubcategory = (e) => {
    e.preventDefault();
    if (!Subcategory.trim()) return alert("Subcategory name is required!");
    if (!image) return alert("Please upload an image!");
    if (!category) return alert("Please select a category!");

    const formData = new FormData();
    formData.append("subcategoryName", Subcategory);
    formData.append("categoryId", category);
    formData.append("productsubcategoryimage", image);

    addSubcategoryMutation.mutate(formData, {
      onSuccess: () => {
        setSubcategory("");
        setCategory("");
        setImage(null);
        setPreview(null);
      },
    });
  };

  const handleEdit = (subcategory) => {
    console.log("Editing Subcategory:", subcategory); // Check if correct data is passed

    if (!subcategory.id) {
      console.error("Error: Subcategory ID is missing!");
      return alert("Invalid subcategory data!");
    }

    setEditData(subcategory); // Set the selected subcategory for editing
    setSubcategory(subcategory.subcategoryname);
    setCategory(subcategory.parent_category_id);
    setPreview(IMG_URL + "/uploads/" + subcategory.subcategoryimage);
    setEditMode(true);
  };

  const handleUpdateSubcategory = (e) => {
    e.preventDefault();
    if (!editData) return alert("No subcategory selected for editing!");
    if (!Subcategory.trim()) return alert("Subcategory name is required!");

    const updateformData = new FormData();

    for (let pair of updateformData.entries()) {
      console.log(pair[0], pair[1]);
    }

    updateformData.append("id", editData.id); // ✅ Use editData.id instead
    updateformData.append("subcategoryName", Subcategory);
    updateformData.append("categoryId", category);
    if (image) updateformData.append("productsubcategoryimage", image);

    updateSubcategoryMutation.mutate(updateformData, {
      onSuccess: () => {
        setEditMode(false);
        setEditData(null);
        setSubcategory("");
        setCategory("");
        setImage(null);
        setPreview(null);
      },
    });
  };

  return (
    <div className="mx-auto mt-0 bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        {editMode ? "Edit Subcategory" : "Manage Subcategories"}
      </h2>

      <form
        onSubmit={editMode ? handleUpdateSubcategory : handleAddSubcategory}
        className="mb-6 flex flex-col gap-4"
      >
        <input
          type="text"
          placeholder="Enter Subcategory Name"
          value={Subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
          className="w-full p-2 border rounded-md focus:outline-blue-500"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.productcategoryname}
            </option>
          ))}
        </select>

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
          {editMode ? "Update" : "Add"}
        </button>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Subcategory Name</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Image</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.length > 0 ? (
              subcategories.map((subcategory, index) => (
                <tr key={subcategory.id} className="hover:bg-gray-50">
                  <td className="border p-3">{subcategory.id}</td>
                  <td className="border p-3">{subcategory.subcategoryname}</td>
                  <td className="border p-3">
                    {categories.find(
                      (cat) => cat.id === subcategory.parent_category_id
                    )?.productcategoryname || "Unknown"}
                  </td>
                  <td className="border p-3">
                    {subcategory.subcategoryimage ? (
                      <img
                        src={
                          IMG_URL + "/uploads/" + subcategory.subcategoryimage
                        }
                        alt={subcategory.subcategoryname}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                    ) : (
                      "No Image"
                    )}
                  </td>
                  <td className="border p-3 text-center flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(subcategory)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border p-3 text-center text-gray-500"
                >
                  No subcategories available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SubCategories;
