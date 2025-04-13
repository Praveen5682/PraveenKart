import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAward,
  faRibbon,
  faShippingFast,
} from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const incentives = [
  {
    icon: faAward,
    title: "Quality Materials",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem.",
  },
  {
    icon: faShippingFast,
    title: "Quality Materials",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem.",
  },
  {
    icon: faRibbon,
    title: "Quality Materials",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nec consequat lorem.",
  },
];

const IncentiveItem = ({ item }) => (
  <div className="bg-white  shadow-xl rounded-lg">
    <div className="p-6 md:p-12">
      <div className="text-6xl text-blue-600">
        <FontAwesomeIcon icon={item.icon} />
      </div>
      <h3 className="my-4 text-2xl font-medium">{item.title}</h3>
      <p>{item.desc}</p>
    </div>
  </div>
);

IncentiveItem.propTypes = {
  item: PropTypes.object.isRequired,
};

const section6 = () => {
  return (
    <section className="ezy__epincentives3 light py-14 md:py-24 bg-white  text-black relative overflow-hidden z-10">
      <div className="container px-6 mx-auto">
        <div className="flex max-w-3xl justify-center text-center mx-auto">
          <div>
            <h1 className="text-2xl md:text-[45px] leading-none font-bold mb-6">
              We built best Business for you.
            </h1>
            <p className="mb-12">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              nec consequat lorem. Maecenas elementum at diam consequat
              bibendum.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-6 gap-6 text-center">
          {incentives.map((item, i) => (
            <div className="col-span-6 sm:col-span-3 lg:col-span-2" key={i}>
              <IncentiveItem item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default section6;
