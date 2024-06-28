import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Ratings = ({ value, text, color }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className={`text-${color} ml-2`} />
      ))}
      {halfStars === 1 ? (
        <FaStarHalfAlt className={`text-${color} ml-2`} />
      ) : null}

      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className={`text-${color} ml-2`} />
      ))}
      <span className={`rating-text ml-[2rem] text-${color}`}>
        {text && "rating"}
      </span>
    </div>
  );
};

Ratings.defaultProps = {
  color: "yellow-500",
};
export default Ratings;
