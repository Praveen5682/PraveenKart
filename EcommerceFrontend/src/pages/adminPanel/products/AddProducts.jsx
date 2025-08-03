import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProductCategory } from "../../../services/components/category/getproductcategory";
import { getSubCategory } from "../../../services/components/Subcategory/getSubCategory";
import { getSpecification } from "../../../services/components/specification/getSpecification";
import { addProduct } from "../../../services/components/products/addproducts";
import ImageUploader from "../../../components/ImageUploader";
import ThumbnailUploader from "../../../components/ThumbnailUploader";
import toast from "react-hot-toast";

const AddProducts = () => {
  // State for the product form
  const [productData, setProductData] = useState({
    productcategoryid: "",
    productsubcategoryid: "",
    productName: "",
    price: "",
    offer: "",
    gst: "0",
    description: "",
    // thumbnailimage: null,
    productimages: [],
    specifications: [{ spec: "", details: "" }],
    is_new: 0,
  });

  const {
    productName,
    description,
    productcategoryid,
    productsubcategoryid,
    specifications,
    price,
    offer,
    gst,
    // thumbnailimage,
    productimages,
    is_new,
  } = productData;

  // Mutation for adding the product
  const createProductMutation = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      console.log(data); // Check if data contains the expected message property
      if (data && data.message) {
        toast.success(data.message);
        resetForm();
      } else {
        toast.error("Something went wrong!");
      }
    },
    onError: (error) => {
      console.error(error); // Log the error to see what goes wrong
      toast.error("Something went wrong!");
    },
  });

  // Effect to reset subcategory when category changes
  useEffect(() => {
    setProductData((prev) => ({ ...prev, productsubcategoryid: "" }));
  }, [productcategoryid]);

  // Fetch data for categories, subcategories, and specifications using react-query
  const { data: categoriesData } = useQuery({
    queryKey: ["allcategories"],
    queryFn: getProductCategory,
  });

  const { data: subcategoriesData } = useQuery({
    queryKey: ["subcategories", productcategoryid],
    queryFn: () =>
      getSubCategory({
        parent_category_id: Number(productcategoryid),
      }),
    enabled: !!productcategoryid,
  });

  const { data: specificationsData } = useQuery({
    queryKey: ["specifications"],
    queryFn: getSpecification,
  });

  // Extract the data from query responses
  const categories = categoriesData?.data || [];
  const subCategories = subcategoriesData?.data || [];
  const specificationOptions = specificationsData?.data || [];

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle specification changes
  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setProductData((prev) => ({ ...prev, specifications: updatedSpecs }));
  };

  // Add a new specification
  const addSpecification = () => {
    setProductData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { spec: "", details: "" }],
    }));
  };

  // Remove a specification
  const removeSpecification = (index) => {
    const updatedSpecs = specifications.filter((_, i) => i !== index);
    setProductData((prev) => ({ ...prev, specifications: updatedSpecs }));
  };

  // Handle thumbnail image upload
  const handleThumbnailUpload = (file) => {
    if (file && file instanceof File) {
      setProductData((prev) => ({ ...prev, thumbnailimage: file }));
    } else {
      console.error("Thumbnail upload failed, no valid file selected.");
    }
  };

  // Handle product images upload
  // Handle product images upload
  const handleImagesUpload = (e) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    if (files.length > 0) {
      const newFiles = files.map((file) => ({
        id: Date.now() + Math.random(), // Unique ID for each file
        file,
        preview: URL.createObjectURL(file),
      }));

      setProductData((prev) => ({
        ...prev,
        productimages: [
          ...prev.productimages,
          ...newFiles.filter(
            (newFile) =>
              !prev.productimages.some(
                (existingFile) => existingFile.file.name === newFile.file.name
              )
          ),
        ],
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const formData = new FormData();

    // Append non-file fields
    formData.append("productcategoryid", productcategoryid);
    formData.append("productsubcategoryid", productsubcategoryid);
    formData.append("productname", productName);
    formData.append("productdescription", description);
    formData.append("productprice", price);
    formData.append("productoffer", offer);
    formData.append("productgst", gst);
    formData.append("is_new", is_new);

    // Append specifications
    specifications.forEach((spec, index) => {
      formData.append(
        `productspecification[${index}][productspecificationid]`,
        spec.spec
      );
      formData.append(
        `productspecification[${index}][productspecificationdescription]`,
        spec.details
      );
    });

    // Append images
    if (productimages.length > 0) {
      productimages.forEach((file) => {
        formData.append("productimages", file.file); // Append each image file
      });
    }

    // Append the thumbnail image

    // Make sure you're sending it as formData and not as JSON
    createProductMutation.mutate(formData);
  };

  // Reset the form
  const resetForm = () => {
    setProductData({
      productcategoryid: "",
      productsubcategoryid: "",
      productName: "",
      price: "",
      offer: "",
      gst: "0",
      description: "",
      // thumbnailimage: null,
      productimages: [],
      specifications: [{ spec: "", details: "" }],
      is_new: 0,
    });
  };

  return (
    <div className="mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">
        Create New Product
      </h2>

      <form onSubmit={handleSubmit}>
        {/* Category and Subcategory */}
        <div className="grid grid-cols-2 gap-4">
          <select
            name="productcategoryid"
            value={productcategoryid}
            onChange={handleChange}
            className="p-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.productcategoryname}
              </option>
            ))}
          </select>

          <select
            name="productsubcategoryid"
            value={productsubcategoryid}
            onChange={handleChange}
            className="p-2 border rounded-md"
            disabled={!productcategoryid}
          >
            <option value="">Select Subcategory</option>
            {subCategories.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.subcategoryname}
              </option>
            ))}
          </select>

          {/* Product Name */}
          <input
            type="text"
            name="productName"
            value={productName}
            onChange={handleChange}
            placeholder="Product Name *"
            className="p-2 border rounded-md col-span-2"
          />

          {/* Price */}
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
            placeholder="Price"
            className="p-2 border rounded-md"
          />

          {/* Offer */}
          <input
            type="number"
            name="offer"
            value={offer}
            onChange={handleChange}
            placeholder="Offer"
            className="p-2 border rounded-md"
          />

          {/* GST */}
          <input
            type="number"
            name="gst"
            value={gst}
            onChange={handleChange}
            placeholder="GST %"
            className="p-2 border rounded-md"
          />

          {/* Description */}
          <textarea
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Product Description"
            className="p-2 border rounded-md col-span-2"
          />

          <div className="flex gap-2">
            <input
              type="checkbox"
              name="is_new"
              value={is_new}
              onChange={(e) => {
                setProductData((prev) => ({
                  ...prev,
                  is_new: e.target.checked ? 1 : 0,
                }));
              }}
            />
            <p className="text-xl text-blue-600">New Product ?</p>
          </div>
        </div>

        {/* Specifications */}
        <h3 className="text-lg font-bold mt-6">Specifications</h3>
        {specifications.map((specItem, index) => (
          <div key={index} className="flex gap-4 mt-2">
            <select
              value={specItem.spec}
              onChange={(e) => handleSpecChange(index, "spec", e.target.value)}
              className="p-2 border rounded-md"
            >
              <option value="">Specification</option>
              {specificationOptions.map((spec) => (
                <option key={spec.specificationid} value={spec.specificationid}>
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

        {/* Button to add more specifications */}
        <button
          type="button"
          onClick={addSpecification}
          className="bg-yellow-500 text-white px-4 py-2 rounded-md mt-3"
        >
          Add Specification
        </button>

        {/* Uploads */}
        <div className="border-2 border-dashed p-6 text-center text-gray-500 rounded-md">
          <input
            type="file"
            accept="image/*"
            onChange={handleImagesUpload} // Handle the image file change
            className="w-full p-2 border rounded-md"
          />

          {/* Show preview if image is selected */}
          {productimages.length > 0 && (
            <div className="mt-4">
              {productimages.map((file, index) => (
                <img
                  key={index}
                  src={file.preview}
                  alt={`Preview-${index}`}
                  className="w-24 h-24 object-cover rounded-md border"
                />
              ))}
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white p-3 rounded-md w-full"
          >
            Create Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProducts;
