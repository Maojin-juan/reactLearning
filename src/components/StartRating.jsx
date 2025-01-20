import { useState } from "react";
import PropTypes from "prop-types";

const StarRating = ({ rating, setRating }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoverRating(index + 1);
  };

  const handleMouseOut = () => {
    setHoverRating(0);
  };

  const handleClick = (index) => {
    setRating(index + 1);
  };

  return (
    <div className="flex">
      {[...Array(5)].map((star, index) => (
        <span
          key={index}
          className={`cursor-pointer text-2xl ${
            index < (hoverRating || rating)
              ? "text-yellow-500"
              : "text-gray-300"
          }`}
          onMouseOver={() => handleMouseOver(index)}
          onMouseOut={handleMouseOut}
          onClick={() => handleClick(index)}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  setRating: PropTypes.func.isRequired,
};

export default StarRating;
