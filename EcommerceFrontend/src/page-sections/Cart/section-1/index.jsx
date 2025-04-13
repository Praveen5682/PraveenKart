import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  faChevronDown,
  faChevronUp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const productList = [
  {
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio15.jpg",
    title:
      "Wholesale Hexagon Pine Solid Wood Brand Women Watch Display Box Custom Logo Wooden Watch Luxury Box",
    price: "7,351",
    qty: 2,
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio3.jpg",
    title:
      "Forsining 3d Logo Design Hollow Engraving Black Gold Case Leather Skeleton Mechanical Watches Men Luxury Brand Heren Horloge",
    price: "251",
    qty: 2,
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio19.jpg",
    title:
      "ABUK Home Appliance Surge Protector Voltage Brownout Plug Outlet Power Strip Surge Protector With Pass Button",
    price: "8,441",
    qty: 2,
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/portfolio/portfolio17.jpg",
    title:
      "Factory Brand Wholesale 5# Zinc Accessories Custom Hook Slider Metal #5 For Clothing garment jacket",
    price: "1,941",
    qty: 2,
  },
];

const SideBar = () => {
  return (
    <div className="bg-blue-50 text-black rounded-xl flex flex-col gap-6 p-4 md:p-6">
      <div className="">
        <h6 className="font-medium mb-6 opacity-75">Order Summary</h6>

        <div className="flex justify-between items-center">
          <span>Sub total</span>
          <span className="font-bold">$2099</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span>Shipping Fee</span>
          <span className="font-bold">$99</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span>Tax</span>
          <span className="font-bold">$168</span>
        </div>
        <hr className="my-4 dark:border-slate-700" />
        <div className="flex justify-between items-center">
          <span className="fs-5 font-bold">Total</span>
          <span className="font-bold">$2238</span>
        </div>
      </div>
      <div className="">
        <button className="w-full bg-blue-600 rounded-md text-white hover:bg-opacity-90 py-2.5">
          {/* BUY (13) */}
          Proceed To Billing Address
        </button>
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
    <div className="flex h-11 w-24 mb-4">
      <input
        type="number"
        className="w-2/3 pl-2 text-center border border-black dark:border-slate-600 bg-transparent focus:outline-none rounded-lg overflow-hidden"
        placeholder=""
        value={value}
        onChange={(e) => qtyControl(e.target.value)}
      />
      <div className="w-1/3 border border-black dark:border-slate-600 rounded-lg overflow-hidden flex flex-col bg-transparent p-0">
        <button
          className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2"
          type="button"
          onClick={() => qtyControl(parseInt(value) + 1)}
        >
          <i className="fas fa-chevron-up"></i>
          <FontAwesomeIcon icon={faChevronUp} />
        </button>
        <button
          className="text-[12px] hover:bg-blue-600 hover:text-white h-1/2"
          type="button"
          onClick={() => qtyControl(parseInt(value) - 1)}
        >
          <i className="fas fa-chevron-down"></i>
          <FontAwesomeIcon icon={faChevronDown} />
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

const ProductItem = ({ item, index, onChange }) => {
  const { img, title, price, qty } = item;
  return (
    <div className="flex flex-col md:flex-row items-start p-2 md:p-6 mb-4">
      {/* image  */}
      <div className="w-full lg:max-w-[150px] rounded-xl mr-4 md:mr-6 mb-4 lg:mb-0">
        <a href="#!">
          <img
            src={img}
            alt=""
            className="max-w-full h-auto rounded-xl mx-auto"
          />
        </a>
      </div>

      <div className="flex">
        {/* product details */}
        <div>
          <div className="text-base md:text-lg hover:text-blue-600 mb-4">
            <a href="#!">{title}</a>
          </div>
          <div>
            <QtyField
              name={`ezy__epcart4-qty-${index}`}
              value={qty}
              onChange={(e) => onChange(e, index)}
            />

            <h3 className="text-xl font-bold text-blue-600">Rs. {price}</h3>
          </div>
        </div>
        {/* delete button */}
        <div>
          <button className="w-10 h-10 hover:bg-blue-200 dark:bg-opacity-20 inline-flex justify-center items-center rounded-full">
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

const Cart = () => {
  const [products, setProducts] = useState([...productList]);

  const onChange = (e, index) => {
    const { value } = e.target;

    setProducts([
      ...products.slice(0, index),
      {
        ...products[index],
        qty: value,
      },
      ...products.slice(index + 1),
    ]);
  };

  return (
    <section className="ezy__epcart4 light py-14 md:py-24 bg-white  text-zinc-900 dark:text-white relative overflow-hidden z-10">
      <div className="container px-20 mx-auto">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* products */}
          <div className="bg-blue-50 text-zinc-900 rounded-xl overflow-hidden w-full lg:w-2/3">
            {products.map((item, i) => (
              <Fragment key={i}>
                {!!i && <hr className="my-4 dark:border-slate-700" />}
                <ProductItem
                  item={item}
                  index={i}
                  onChange={onChange}
                  key={i}
                />
              </Fragment>
            ))}
          </div>

          {/* sidebar */}
          <div className="w-full lg:w-1/3">
            <SideBar />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
