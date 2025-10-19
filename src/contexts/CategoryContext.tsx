import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useApi } from '../hooks/useApi';
import { CategoriesAPI } from '../apis';
import { Category } from '../apis/types';

interface CategoryContextType {
  categories: Category[] | null;
  loading: boolean;
  error: string | null;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

interface CategoryProviderProps {
  children: ReactNode;
}

export const CategoryProvider: React.FC<CategoryProviderProps> = ({ children }) => {
  const { data, loading, error, execute } = useApi<Category[]>();
  const [categories, setCategories] = useState<Category[] | null>(null);

  useEffect(() => {
    execute(CategoriesAPI.getCategories);
  }, [execute]);

  useEffect(() => {
    if (data) {
      setCategories(data);
    }
  }, [data]);

  return (
    <CategoryContext.Provider value={{ categories, loading, error }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (context === undefined) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};
