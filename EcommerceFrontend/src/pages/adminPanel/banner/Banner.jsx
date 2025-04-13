import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import { createBanner } from "../../../services/components/banner/createBanner";
import { getBanner } from "../../../services/components/banner/getbanner";
import { deleteBanner } from "../../../services/components/banner/deleteBanner";

const IMG_URL = import.meta.env.VITE_IMG_URL;

const Banner = () => {
  const queryClient = useQueryClient();

  // State to store banner details and image preview
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({
    imageUrl: "",
  });
  const [imagePreview, setImagePreview] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: getBanner,
    queryKey: ["allbanners"],
  });

  const allBannersdata = data?.data;
  console.log("allBannersdata", allBannersdata);

  // Handle image file change (for file upload)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewBanner((prev) => ({
        ...prev,
        imageUrl: file, // Store the file
      }));
      setImagePreview(imageUrl); // Set the preview of the uploaded image
    }
  };

  const addBannerImageMutation = useMutation({
    mutationFn: createBanner,
    onSuccess: (data) => {
      setBanners((prevBanners) => [
        ...prevBanners,
        { imageUrl: data.bannerimage }, // Assuming data.bannerimage is the URL of the uploaded image
      ]);
      setNewBanner({ imageUrl: "" });
      setImagePreview(null); // Clear the image preview after submission
    },
    onError: (error) => {
      console.error("Error uploading banner:", error);
    },
  });

  // Add new banner to the state
  const addBanner = () => {
    if (newBanner.imageUrl) {
      const formData = new FormData();
      formData.append("bannerimage", newBanner.imageUrl);

      // Trigger mutation to upload the banner image
      addBannerImageMutation.mutate(formData);
    }
  };

  const deleteBannerMutation = useMutation({
    mutationFn: deleteBanner,
    onSuccess: () => {
      // Invalidate the categories query to trigger a refetch
      queryClient.invalidateQueries(["allbanners"]);
    },
    onError: (error) => {
      console.error("Error deleting banner:", error);
      alert("Failed to delete the banner. Please try again.");
    },
  });

  // Function to delete a banner
  const handleDelete = (id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this Banner?"
    );
    if (isConfirmed) {
      // Log the category to make sure it has the ID
      console.log("Deleting banner with ID:", id);

      deleteBannerMutation.mutate({
        id: id,
      });
    }
  };

  // Clean up the image preview URL when the component unmounts
  useEffect(() => {
    return () => {
      if (imagePreview) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-semibold text-center mb-6">
        Banner Management
      </h2>

      {/* Form to add a new banner */}
      <div className="bg-white shadow-lg rounded-lg p-6">
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full p-3 border border-gray-300 rounded-lg mb-4 cursor-pointer"
        />

        {/* Image Preview */}
        {imagePreview && (
          <div className="my-4 flex justify-center">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-48 h-32 object-cover rounded-lg"
            />
          </div>
        )}

        <button
          onClick={addBanner}
          disabled={addBannerImageMutation.isLoading || !newBanner.imageUrl}
          className={`w-full p-3 rounded-lg ${
            addBannerImageMutation.isLoading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white`}
        >
          {addBannerImageMutation.isLoading ? "Uploading..." : "Add Banner"}
        </button>
      </div>

      {/* Display the list of added banners */}
      <div className="mt-8">
        <div className="mt-8">
          {isLoading ? (
            <div className="text-center">Loading banners...</div>
          ) : allBannersdata && allBannersdata.length > 0 ? (
            <ul className="space-y-6">
              {allBannersdata.map((banner, index) => (
                <li key={index} className="flex items-center space-x-6">
                  <div className="relative">
                    <img
                      src={IMG_URL + "/uploads/" + banner.bannerimage}
                      alt={`Banner image for ${banner.title}`} // More descriptive alt text
                      crossOrigin="anonymous"
                      className="w-full object-cover rounded-lg"
                    />
                    {/* Delete Icon */}
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="absolute top-2 right-2 text-white bg-red-500 p-2 rounded-full hover:bg-red-600"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-gray-500">No banners available.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
