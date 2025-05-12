import React, { useState, useRef } from "react";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/jpg"];
const MAX_FILE_SIZE_MB = 5;

const ThumbnailUploader = ({ onUpload }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const inputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!VALID_IMAGE_TYPES.includes(file.type)) {
      alert("Please upload a valid image (JPEG/PNG/JPG).");
      return;
    }

    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      alert("File size should be less than 5MB.");
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    onUpload?.(file);
  };

  const clearThumbnail = () => {
    setPreviewUrl(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Thumbnail Image <span className="text-red-500">*</span>
      </label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:text-sm file:font-semibold
          file:bg-yellow-500 file:text-white hover:file:bg-yellow-600 cursor-pointer"
        aria-label="Thumbnail image upload"
      />

      {previewUrl && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <img
            src={previewUrl}
            alt="Thumbnail Preview"
            className="w-32 h-32 object-cover border rounded-md shadow"
          />
          <button
            type="button"
            onClick={clearThumbnail}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear Image
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;
