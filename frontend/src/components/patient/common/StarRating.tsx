import { useState } from "react";
import { Star } from "lucide-react";


interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void
}
const StarRating: React.FC <StarRatingProps> = ({rating, setRating}) => {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex flex-row gap-1 text-gray-400 text-3xl">
      {[...Array(5)].map((_, index) => {
        const starValue = index + 1;
        return (
          <label key={starValue} className="cursor-pointer">
            <input
              type="radio"
              name="rating"
              value={starValue}
              onClick={() => setRating(starValue)}
              className="hidden"
            />
            <Star
              className={`transition-all duration-200 ${
    starValue <= (hover || rating) ? "text-yellow-500" : "text-gray-400"
              }` } strokeWidth={3}
              onMouseEnter={() => setHover(starValue)}
              onMouseLeave={() => setHover(0)}
            />
          </label>
        );
      })}
    </div>
  );
};

export default StarRating;
