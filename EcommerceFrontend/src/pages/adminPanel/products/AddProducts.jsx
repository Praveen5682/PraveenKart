import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { getSubCategory } from "../../../services/components/Subcategory/getSubCategory";
import { getSpecification } from "../../../services/components/specification/getSpecification";
import ImageUploader from "../../../components/ImageUploader";
import ThumbnailUploader from "../../../components/ThumbnailUploader";

const AddProducts = () => {
  const [productData, setProductData] = useState({
    category: "",
    subcategory: "",
    productName: "",
    price: "",
    offer: "",
    gst: "0",
    description: "",
    thumbnail: null,
    video: null,
    specifications: [{ spec: "", details: "" }],
  });

  // React Query for categories, subcategories, and specifications
  const { data: categoriesData } = useQuery({
    queryFn: getProductCategory,
    queryKey: ["allcategories"],
  });

  const { data: subcategoriesData } = useQuery({
    queryFn: getSubCategory,
    queryKey: ["allsubcategories"],
  });

  const { data: specificationsData } = useQuery({
    queryFn: getSpecification,
    queryKey: ["specifications"],
  });

  const categories = categoriesData?.data || [];
  const subCategories = subcategoriesData?.data || [];
  const specificationOptions = specificationsData?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...productData.specifications];
    updated[index][field] = value;
    setProductData({ ...productData, specifications: updated });
  };

  const addSpecification = () => {
    setProductData({
      ...productData,
      specifications: [
        ...productData.specifications,
        { spec: "", details: "" },
      ],
    });
  };

  const removeSpecification = (index) => {
    const updated = productData.specifications.filter((_, i) => i !== index);
    setProductData({ ...productData, specifications: updated });
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Create New Product
      </h2>

      <div className="grid grid-cols-2 gap-4">
        <select
          name="category"
          value={productData.category}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Product Category</option>
          {categories.map((cat, i) => (
            <option key={i} value={cat.productcategoryname}>
              {cat.productcategoryname}
            </option>
          ))}
        </select>

        <select
          name="subcategory"
          value={productData.subcategory}
          onChange={handleChange}
          className="p-2 border rounded-md"
        >
          <option value="">Product Subcategory</option>
          {subCategories.map((sub, i) => (
            <option key={i} value={sub.subcategoryname}>
              {sub.subcategoryname}
            </option>
          ))}
        </select>

        <input
          type="text"
          name="productName"
          value={productData.productName}
          onChange={handleChange}
          placeholder="Product Name *"
          className="p-2 border rounded-md col-span-2"
        />

        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          placeholder="Price"
          className="p-2 border rounded-md"
        />

        <input
          type="number"
          name="offer"
          value={productData.offer}
          onChange={handleChange}
          placeholder="Offer"
          className="p-2 border rounded-md"
        />

        <input
          type="number"
          name="gst"
          value={productData.gst}
          onChange={handleChange}
          placeholder="GST %"
          className="p-2 border rounded-md"
        />

        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="p-2 border rounded-md col-span-2"
        ></textarea>
      </div>

      {/* Specifications Section */}
      <h3 className="text-lg font-bold mt-6">Specifications</h3>
      {productData.specifications.map((specItem, index) => (
        <div key={index} className="flex gap-4 mt-2">
          <select
            value={specItem.spec}
            onChange={(e) => handleSpecChange(index, "spec", e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Specification</option>
            {specificationOptions.map((spec, i) => (
              <option key={i} value={spec.specificationName}>
                {spec.specificationName}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={specItem.details}
            onChange={(e) => handleSpecChange(index, "details", e.target.value)}
            placeholder="Details"
            className="p-2 border rounded-md flex-1"
          />

          <button
            onClick={() => removeSpecification(index)}
            className="text-red-500 hover:text-red-700"
          >
            🗑
          </button>
        </div>
      ))}

      <button
        onClick={addSpecification}
        className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-3"
      >
        Add Specification
      </button>

      {/* Upload Sections */}
      <div className="mt-6 space-y-4">
        <ThumbnailUploader />

        <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded-md">
          <ImageUploader />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        <button className="bg-yellow-600 text-white px-6 py-2 rounded-md">
          Create New Product
        </button>
        <button className="bg-gray-400 text-white px-6 py-2 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddProducts;
