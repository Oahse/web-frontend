import React from 'react';
import { Link } from 'react-router-dom';

interface Category {
  id: number;
  name: string;
  image: string;
  count: number;
  path: string;
}

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link to={category.path} className="block group">
      <div className="bg-surface rounded-lg overflow-hidden shadow-sm border border-border-light transition-shadow hover:shadow-md">
        <div className="relative h-40">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4 text-center">
          <h3 className="font-medium text-copy group-hover:text-primary transition-colors">
            {category.name}
          </h3>
          <p className="text-sm text-copy-light">{category.count} items</p>
        </div>
      </div>
    </Link>
  );
};