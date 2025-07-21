import { Star, StarHalf, StarOff } from "lucide-react";
import type { FC } from "react";

interface StarRatingProps {
  rating: number; 
  max?: number;   
  className?: string;
  size?: number;
}

export const StarRating: FC<StarRatingProps> = ({ rating, max = 5, className = "", size = 20 }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={size} className="text-yellow-500 fill-yellow-400" />
      ))}
      {hasHalfStar && <StarHalf size={size} className="text-yellow-500 fill-yellow-400" />}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} size={size} className="text-gray-300" />
      ))}
    </div>
  );
};
