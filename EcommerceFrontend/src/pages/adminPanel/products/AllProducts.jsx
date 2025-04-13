import React, { useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const AllProducts = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: "iPhone 14",
      price: 799,
      category: "Electronics",
      subcategory: "Mobiles",
    },
    {
      id: 2,
      name: "MacBook Air",
      price: 1199,
      category: "Electronics",
      subcategory: "Laptops",
    },
    {
      id: 3,
      name: "Nike Shoes",
      price: 99,
      category: "Fashion",
      subcategory: "Men",
    },
  ]);

  const handleEdit = (id) => {
    console.log("Edit Product ID:", id);
    // Implement edit logic here (navigate to edit page or open modal)
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((product) => product.id !== id));
    }
  };

  return (
    <div className=" mx-auto mt-0 bg-white p-6 h-screen rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
        All Products
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-3 text-left">#</th>
              <th className="border p-3 text-left">Product Name</th>
              <th className="border p-3 text-left">Price ($)</th>
              <th className="border p-3 text-left">Category</th>
              <th className="border p-3 text-left">Subcategory</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((product, index) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="border p-3">{index + 1}</td>
                  <td className="border p-3">{product.name}</td>
                  <td className="border p-3">${product.price}</td>
                  <td className="border p-3">{product.category}</td>
                  <td className="border p-3">{product.subcategory}</td>
                  <td className="border p-3 text-center flex justify-center gap-4">
                    <button
                      onClick={() => handleEdit(product.id)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
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
                  colSpan="6"
                  className="border p-3 text-center text-gray-500"
                >
                  No products available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllProducts;
