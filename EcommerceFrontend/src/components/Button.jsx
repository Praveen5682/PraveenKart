import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="bg-primary py-[6px] px-4 rounded-full text-white hover:bg-secondary duration-300"
      >
        {text}
      </button>
    </>
  );
};

export default Button;
