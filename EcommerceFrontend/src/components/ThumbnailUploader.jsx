import React, { useState } from "react";

const ThumbnailUploader = () => {
  const [thumbnail, setThumbnail] = useState(null);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(URL.createObjectURL(file));
    }
  };

  return (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Thumbnail Image <span className="text-red-500">*</span>
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={handleThumbnailChange}
        className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0 file:text-sm file:font-semibold
          file:bg-yellow-500 file:text-white hover:file:bg-yellow-600 cursor-pointer"
      />

      {thumbnail && (
        <div className="mt-3">
          <p className="text-sm text-gray-500 mb-1">Preview:</p>
          <img
            src={thumbnail}
            alt="Thumbnail Preview"
            className="w-32 h-32 object-cover border rounded-md shadow"
          />
        </div>
      )}
    </div>
  );
};

export default ThumbnailUploader;
