import React, { useRef, useState } from "react";

const ImageUploader = () => {
  const fileInputRef = useRef(null);
  const [images, setImages] = useState([]);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      className="border-2 border-dashed p-6 text-center text-gray-500 rounded-md"
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onClick={handleClick}
    >
      <span className="block">📂 Drop your images here or</span>
      <span className="text-yellow-600 cursor-pointer">Click to browse</span>

      <input
        type="file"
        multiple
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`uploaded-${index}`}
              className="h-20 w-full object-cover rounded-md"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
