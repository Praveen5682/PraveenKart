import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { createRequestHandler, Link, useNavigate } from "react-router-dom";
import { createRegistration } from "../../services/components/auth/signUp";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createRegistration,
    onSuccess: (data) => {
      console.log("Registration successful:", data);
      toast.success("Registration successful");
      navigate("/login");
    },
    onError: (error) => {
      console.error("Registration failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message); // Display server-side error message
      } else {
        toast.error("Registration failed. Please try again.");
      }
    },
  });

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmpassword: "",
  });
  const [profileImage, setProfileImage] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(URL.createObjectURL(file)); // Preview image
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const registrationData = {
      fullName: formData.fullName,
      email: formData.email,
      password: formData.password,
      confirmpassword: formData.confirmpassword,
    };

    mutation.mutate(registrationData);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-center text-3xl font-extrabold text-black pb-6">
          Sign Up
        </h2>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {/* Profile Image Upload */}

          <input
            name="fullName"
            id="fullName"
            placeholder="Full Name"
            className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            aria-label="Full Name"
          />
          <input
            name="email"
            id="email"
            placeholder="Email"
            className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="email"
            value={formData.email}
            onChange={handleChange}
            aria-label="Email"
          />
          <input
            name="password"
            id="password"
            placeholder="Password"
            className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={formData.password}
            onChange={handleChange}
            aria-label="Password"
          />
          <input
            name="confirmpassword"
            id="confirmpassword"
            placeholder="Confirm Password"
            className="bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
            type="password"
            value={formData.confirmpassword}
            onChange={handleChange}
            aria-label="Confirm Password"
          />
          <button
            className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold py-2 px-4 rounded-md mt-4 hover:from-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
            type="submit"
          >
            Sign Up
          </button>
          <p className="text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
