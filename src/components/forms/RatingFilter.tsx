import React from 'react';
import { Select } from './Select';

interface RatingFilterProps {
  minRating: number;
  maxRating: number;
  onChange: (newMin: number, newMax: number) => void;
}

export const RatingFilter: React.FC<RatingFilterProps> = ({
  minRating,
  maxRating,
  onChange,
}) => {
  const ratingOptions = Array.from({ length: 6 }, (_, i) => ({
    value: String(i),
    label: i === 0 ? 'Any' : `${i} Star${i > 1 ? 's' : ''}`,
  }));

  return (
    <div className="flex items-center space-x-2">
      <Select
        id="min-rating"
        value={String(minRating)}
        onChange={(e) => onChange(Number(e.target.value), maxRating)}
        options={ratingOptions}
        className="w-20 px-2 py-1 border border-border rounded text-sm bg-surface text-copy"
      />
      <span>-</span>
      <Select
        id="max-rating"
        value={String(maxRating)}
        onChange={(e) => onChange(minRating, Number(e.target.value))}
        options={ratingOptions}
        className="w-20 px-2 py-1 border border-border rounded text-sm bg-surface text-copy"
      />
    </div>
  );
};
