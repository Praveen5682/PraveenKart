import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createLogin } from "../../services/components/auth/logIn";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: createLogin,
    onSuccess: (data) => {
      console.log("signed in successfully", data);
      toast.success("signed in successfully");

      navigate("/");
    },
    onError: (error) => {
      console.error("Signin failed:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signin failed. Please try again.");
      }
    },
  });

  const [form, setForm] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const logindata = { email: form.email, password: form.password };
    mutation.mutate(logindata);
    console.log("Form Submitted", form);
  };

  return (
    <section className="flex items-center justify-center h-screen">
      <div className="max-w-lg w-full ">
        <div
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-white rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <h2 className="text-center text-3xl font-extrabold text-black">
              Welcome Back
            </h2>
            <p className="mt-4 text-center text-black">Sign in to continue</p>
            <form
              method="POST"
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email address
                  </label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-100 text-black rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    name="email"
                    id="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-100 text-white rounded-md focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    name="password"
                    id="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <input
                    className="h-4 w-4 text-primary focus:ring-indigo-400 border-gray-600 rounded"
                    type="checkbox"
                    name="rememberMe"
                    id="remember-me"
                    checked={form.rememberMe}
                    onChange={handleChange}
                  />
                  <label
                    className="ml-2 block text-sm text-gray-400"
                    htmlFor="remember-me"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link
                    className="font-medium text-primary hover:text-indigo-400"
                    to="/forget-password" // Replace with the correct route for your app
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-black text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <Link
              className="font-medium text-primary hover:text-primary"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
