import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  interactive?: boolean;
  onRate?: (rating: number) => void;
}

export default function StarRating({ rating, size = 14, interactive, onRate }: StarRatingProps) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.round(rating) ? '#d4a843' : 'none'}
          className={star <= Math.round(rating) ? 'star-filled' : 'star-empty'}
          style={{ cursor: interactive ? 'pointer' : 'default' }}
          onClick={() => interactive && onRate?.(star)}
        />
      ))}
    </div>
  );
}
