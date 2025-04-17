import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { getSubCategory } from "../../../services/components/Subcategory/getSubCategory";
import { getSpecification } from "../../../services/components/specification/getSpecification";
import { addProduct } from "../../../services/components/products/addproducts";
import ImageUploader from "../../../components/ImageUploader";
import ThumbnailUploader from "../../../components/ThumbnailUploader";
import { toast } from "react-toastify";

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

  // Mutation to create product
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      if (data.status) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error(data.message);
      }
    },
    onError: (error) => {
      toast.error("Something went wrong!");
    },
  });

  // React Query for fetching options
  const { data: categoriesData } = useQuery({
    queryKey: ["allcategories"],
    queryFn: getProductCategory,
  });

  const { data: subcategoriesData } = useQuery({
    queryKey: ["allsubcategories"],
    queryFn: getSubCategory,
  });

  const { data: specificationsData } = useQuery({
    queryKey: ["specifications"],
    queryFn: getSpecification,
  });

  const categories = categoriesData?.data || [];
  const subCategories = subcategoriesData?.data || [];
  const specificationOptions = specificationsData?.data || [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...productData.specifications];
    updatedSpecs[index][field] = value;
    setProductData({ ...productData, specifications: updatedSpecs });
  };

  const addSpecification = () => {
    setProductData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { spec: "", details: "" }],
    }));
  };

  const removeSpecification = (index) => {
    const updated = productData.specifications.filter((_, i) => i !== index);
    setProductData((prev) => ({ ...prev, specifications: updated }));
  };

  const handleThumbnailUpload = (file) => {
    setProductData((prev) => ({ ...prev, thumbnail: file }));
  };

  const handleImagesUpload = (files) => {
    setProductData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...productData,
      productcategoryid: productData.category,
      productsubcategoryid: productData.subcategory,
    };

    createProductMutation.mutate(payload);
  };

  const resetForm = () => {
    setProductData({
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
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <select
            name="category"
            value={productData.category}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.productcategoryid} value={cat.productcategoryid}>
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
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option
                key={sub.productsubcategoryid}
                value={sub.productsubcategoryid}
              >
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
          />
        </div>

        {/* Specifications */}
        <h3 className="text-lg font-bold mt-6">Specifications</h3>
        {productData.specifications.map((specItem, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <select
              value={specItem.spec}
              onChange={(e) => handleSpecChange(index, "spec", e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Specification</option>
              {specificationOptions.map((spec) => (
                <option
                  key={spec.specificationName}
                  value={spec.specificationName}
                >
                  {spec.specificationName}
                </option>
              ))}
            </select>

            <input
              type="text"
              value={specItem.details}
              onChange={(e) =>
                handleSpecChange(index, "details", e.target.value)
              }
              placeholder="Details"
              className="p-2 border rounded-md flex-1"
            />

            <button
              type="button"
              onClick={() => removeSpecification(index)}
              className="text-red-500 hover:text-red-700"
            >
              🗑
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addSpecification}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-3"
        >
          Add Specification
        </button>

        {/* Uploads */}
        <div className="mt-6 space-y-4">
          <ThumbnailUploader onUpload={handleThumbnailUpload} />
          <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded-md">
            <ImageUploader onUpload={handleImagesUpload} />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 mt-6">
          <button
            type="submit"
            className="bg-yellow-600 text-white px-6 py-2 rounded-md"
          >
            Create New Product
          </button>
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
