import React, { useRef, useState, useCallback } from "react";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/png", "image/gif"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const ImageUploader = ({ onUpload }) => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleValidFiles = useCallback(
    (files) => {
      const validFiles = files.filter(
        (file) =>
          VALID_IMAGE_TYPES.includes(file.type) && file.size <= MAX_FILE_SIZE
      );

      if (validFiles.length === 0) {
        alert("Please upload valid image files (JPEG, PNG, GIF) under 5MB.");
        return;
      }

      const updatedImages = [...images, ...validFiles];
      setImages(updatedImages);
      onUpload?.(updatedImages);
    },
    [images, onUpload]
  );

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    handleValidFiles(files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleValidFiles(files);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleClearImages = () => {
    // Revoke object URLs to free memory
    images.forEach((file) => URL.revokeObjectURL(file.previewUrl));
    setImages([]);
  };

  return (
    <div
      className="border-2 border-dashed p-6 text-center text-gray-500 rounded-md cursor-pointer"
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <p className="block">📂 Drop your images here or</p>
      <p className="text-yellow-600">Click to browse</p>

      <input
        type="file"
        accept="image/*"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-3 gap-2">
            {images.map((file, index) => {
              const previewUrl = URL.createObjectURL(file);
              return (
                <img
                  key={index}
                  src={previewUrl}
                  alt={`uploaded-${index}`}
                  className="h-20 w-full object-cover rounded-md"
                />
              );
            })}
          </div>
          <button
            onClick={handleClearImages}
            className="mt-2 text-sm text-red-500 hover:text-red-700"
          >
            Clear All Images
          </button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
