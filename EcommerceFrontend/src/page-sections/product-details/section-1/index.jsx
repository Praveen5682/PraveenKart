import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faShareAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

const product = {
  title: "Bed Sheet Home Textile Modern",
  previews: [
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed1.jpg",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed1.jpg",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed3.jpg",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed3.jpg",
    },
    {
      previewUrl: "https://cdn.easyfrontend.com/pictures/products/bed2.jpg",
      thumbUrl: "https://cdn.easyfrontend.com/pictures/products/bed2.jpg",
    },
  ],
  rating: 5.0,
  rateCount: 3,
  price: 870.99,
  colorVariants: [
    { bgcolor: "bg-yellow-500", value: "Multi" },
    { bgcolor: "bg-blue-500", value: "Blue" },
    { bgcolor: "bg-red-400", value: "Pink" },
    { bgcolor: "bg-black", value: "Black" },
    { bgcolor: "bg-red-600", value: "Red" },
  ],
  sizeVariants: [
    {
      label: "18L",
      value: "18L",
      content: "Perfect fora a reasonable amount of snacks",
    },
    {
      label: "20L",
      value: "20L",
      content: "Perfect fora a reasonable amount of snacks",
    },
  ],
};

const ProductPreviews = ({ previews }) => {
  const [index, setIndex] = useState(0);

  return (
    <div className="lg:mr-6">
      <div className="text-center rounded-lg overflow-hidden m-2">
        <img
          src={previews[index].previewUrl}
          alt=""
          className="max-h-[450px] object-cover max-w-full w-full"
        />
      </div>

      <ul className="flex items-center justify-center">
        {previews.map((preview, i) => (
          <li
            className="rounded-lg overflow-hidden m-2"
            key={i}
            onClick={() => setIndex(i)}
          >
            <a href="#!">
              <img
                src={preview.thumbUrl}
                alt=""
                className="w-auto max-h-[100px] object-cover"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

ProductPreviews.propTypes = {
  previews: PropTypes.array.isRequired,
};

const ColorVariant = () => {
  const [selectedColor, setSelectedColor] = useState("Multi");

  const handleColorChange = (value) => {
    setSelectedColor(value);
  };

  return (
    <>
      <div className="mb-6">
        <h5 className="font-medium mb-2 text-black">
          Color:{" "}
          <span className="opacity-50 text-black">
            {selectedColor &&
              product.colorVariants.find(
                (color) => color.value === selectedColor
              )?.value}
          </span>
        </h5>
        <div className="flex flex-wrap gap-2 mb-2">
          {product.colorVariants.map((item, i) => (
            <Fragment key={i}>
              <input
                type="radio"
                className="absolute hidden"
                autoComplete="off"
                checked={selectedColor === item.value}
                onChange={() => handleColorChange(item.value)}
              />
              <label
                className={`w-8 h-8 rounded-full ${
                  item.bgcolor
                } border-2 border-white dark:border-[#0b1727] cursor-pointer mt-1 hover:outline hover:outline-1 hover:outline-${
                  item.color
                } ${
                  selectedColor === item.value &&
                  `outline outline-1 outline-${item.color}`
                }`}
                onClick={() => handleColorChange(item.value)}
              ></label>
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

const SizeVariant = () => {
  const [selectedSize, setSelectedSize] = useState("18L");

  const handleSizeChange = (value) => {
    setSelectedSize(value);
  };

  return (
    <div className="mb-6">
      <h5 className="text-sm font-medium mb-2">
        Size:{" "}
        <span className="opacity-50">
          {selectedSize &&
            product.sizeVariants.find((size) => size.label === selectedSize)
              ?.label}
        </span>
      </h5>
      <div className="flex gap-2 mb-2">
        {product.sizeVariants.map((size, index) => (
          <React.Fragment key={size.label}>
            <input
              type="radio"
              className="sr-only"
              autoComplete="off"
              checked={selectedSize === size.value}
              onChange={() => handleSizeChange(size.value)}
            />
            <label
              className={`bg-gray-100 text-black cursor-pointer rounded-md flex flex-col overflow-hidden text-start border-2 border-white dark:border-[#0b1727]  ${
                selectedSize === size.label &&
                "outline outline-1 outline-blue-600 dark:outline-blue-600"
              } hover:outline-blue-600 px-6 py-4`}
              onClick={() => handleSizeChange(size.value)}
            >
              <b className="mb-2">{size.label}</b>
              <span className="opacity-75 mb-2">{size.content}</span>
            </label>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

const QtyField = ({ name, value, onChange }) => {
  const qtyControl = (qty) =>
    onChange({
      target: {
        name,
        type: "radio",
        value: qty < 1 ? 1 : qty,
      },
    });

  return (
    <div className="flex h-11 w-24 mb-4 ">
      <input
        className="w-2/3 pl-2 text-center bg-gray-100 text-black focus:outline-none rounded-lg overflow-hidden font-bold text-lg"
        type="number"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(e.target.value)}
      />
      <div className="w-1/3 rounded-lg overflow-hidden flex flex-col bg-gray-100  p-0">
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
          type="button"
          onClick={() => qtyControl(parseInt(value) - 1)}
        >
          -
        </button>
        <button
          className="text-blue-600 hover:bg-blue-600 hover:text-white h-1/2 font-bold leading-none text-lg"
          type="button"
          onClick={() => qtyControl(parseInt(value) + 1)}
        >
          +
        </button>
      </div>
    </div>
  );
};

QtyField.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.any,
};

const Section1 = () => {
  const { productid } = useParams();
  console.log("productId From Params", productid);
  const [formData, setFormData] = useState({
    color: "Multi",
    size: "XL",
    qty: 1,
  });

  const setField = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  return (
    <section className="py-14  bg-white  text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container px-32 mx-auto">
        <div className="grid grid-cols-2 gap-6">
          <div className="col-span-2 lg:col-span-1">
            <ProductPreviews previews={product.previews} />
          </div>
          <div className="col-span-2 lg:col-span-1">
            <div className="mb-6 lg:mb-12">
              <h1 className="text-2xl leading-none md:text-4xl font-medium mb-4 text-black">
                {product.title}
              </h1>
              <p className="opacity-70 mb-6 text-black">
                <span>{product.rating}</span>{" "}
                <FontAwesomeIcon
                  icon={faStar}
                  className="mx-2 text-yellow-500"
                />
                <a href="#!" className="text-blue-600 font-medium ml-1">
                  {product.rateCount} Reviews
                </a>{" "}
                <span className="ml-2">104 Order</span>
              </p>
              <h3 className="text-2xl text-blue-600 font-medium">
                {" "}
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </h3>
            </div>

            <form action="#!">
              <div className="mb-6">
                <ColorVariant />
              </div>
              <div className="mb-6">
                <SizeVariant />
              </div>
              <div className="mb-6">
                <h5 className="font-medium mb-2">QTY</h5>
                <QtyField onChange={setField} name="qty" value={formData.qty} />
              </div>

              <div className="flex flex-wrap gap-3 items-center my-7">
                <button className="bg-blue-600 border border-blue-600 text-white text-sm rounded uppercase hover:bg-opacity-90 px-10 py-2.5 h-10 md:px-12 min-w-[202px]">
                  Buy Now
                </button>
                <button className="border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white text-sm rounded uppercase px-6 py-2.5 h-10 md:px-12 min-w-[202px]">
                  Add To Cart
                </button>
                <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
                  <FontAwesomeIcon icon={faHeart} />
                </button>
                <button className="hover:bg-blue-600 rounded hover:bg-opacity-10 text-blue-600 px-3 py-2 text-lg font-bold">
                  <FontAwesomeIcon icon={faShareAlt} className="mr-1 text-sm" />
                </button>
              </div>

              <p className="opacity-70 lg:mr-56 xl:mr-80 text-black">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nec consequat lorem. Maecenas elementum at diam consequat
                bibendum.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
