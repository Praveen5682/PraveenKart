import React, { Fragment } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames";
import PropTypes from "prop-types";

const testimonialList = [
  {
    author: {
      fullName: "Akshay Kumar",
      picture:
        "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_1.jpeg",
    },
    rating: 3.5,
    description:
      "Subdue light after. Fruitful hath had day give called seasons unto tree he days. And can't greater them dry living.",
  },
  {
    author: {
      fullName: "Raima Sen",
      picture:
        "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_2.jpeg",
    },
    rating: 4,
    description:
      "Fruit. Night. Can't lesser open their, had kind doesn't itself thing wherein spirit fowl, she'd darkness fish place heaven saying.",
  },
  {
    author: {
      fullName: "Arjun Kapur",
      picture:
        "https://cdn.easyfrontend.com/pictures/testimonial/testimonial_square_3.jpeg",
    },
    rating: 5,
    description:
      "It fourth, whose light spirit in, was make it morning seas moved it void fill upon dominion. Female sea set.",
  },
];

const Rating = ({ rating, showLabel, className, ...rest }) => (
  <p className={classNames("mb-4", className)} {...rest}>
    <span>
      {[...Array(5)].map((_, i) => {
        const index = i + 1;
        let content = "";

        if (index <= Math.floor(rating)) {
          content = (
            <FontAwesomeIcon icon={faStar} className="text-yellow-500" />
          );
        } else if (rating % 1 !== 0 && Math.floor(rating) === i) {
          content = (
            <FontAwesomeIcon icon={faStarHalfAlt} className="text-yellow-500" />
          );
        } else {
          content = (
            <FontAwesomeIcon
              icon={faStar}
              className="text-gray-300 dark:text-opacity-20"
            />
          );
        }

        return <Fragment key={i}>{content}</Fragment>;
      })}
    </span>
    {showLabel && <span className="ml-2">{rating.toFixed(1)}</span>}
  </p>
);

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  showLabel: PropTypes.bool,
  className: PropTypes.string,
};

const TestimonialItem = ({ testimonial }) => (
  <div className="bg-white dark:bg-slate-800 shadow-lg p-6 lg:p-8 rounded-xl flex flex-col items-center">
    <img
      src={testimonial.author.picture}
      alt={testimonial.author.fullName}
      className="w-24 h-24 rounded-full border mb-4"
    />
    <h4 className="font-semibold text-xl mb-2">
      {testimonial.author.fullName}
    </h4>
    <Rating rating={testimonial.rating} showLabel={false} />
    <p className="text-gray-600 dark:text-gray-300 text-center">
      {testimonial.description}
    </p>
  </div>
);

TestimonialItem.propTypes = {
  testimonial: PropTypes.object.isRequired,
};

const TestimonialSection = () => {
  return (
    <section className="py-14 md:py-24 bg-white dark:bg-[#0b1727] text-zinc-900 dark:text-white">
      <div className="container px-6 mx-auto">
        <h2 className="text-3xl md:text-[45px] font-bold text-center mb-10">
          Community Reviews
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {testimonialList.map((testimonial, i) => (
            <TestimonialItem key={i} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
