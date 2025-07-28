import React, { createContext, ReactNode, useContext, useState } from 'react';
import { generateFallbackPopularRecipe, PopularRecipe, PopularRecipeRequest, searchPopularRecipe } from '../services/popularRecipeService';

interface PopularRecipeContextType {
  currentPopularRecipe: PopularRecipe | null;
  isLoading: boolean;
  error: string | null;
  searchPopularRecipe: (request: PopularRecipeRequest) => Promise<void>;
  clearPopularRecipe: () => void;
  clearError: () => void;
}

const PopularRecipeContext = createContext<PopularRecipeContextType | undefined>(undefined);

export const usePopularRecipe = () => {
  const context = useContext(PopularRecipeContext);
  if (!context) {
    throw new Error('usePopularRecipe must be used within a PopularRecipeProvider');
  }
  return context;
};

interface PopularRecipeProviderProps {
  children: ReactNode;
}

export const PopularRecipeProvider: React.FC<PopularRecipeProviderProps> = ({ children }) => {
  const [currentPopularRecipe, setCurrentPopularRecipe] = useState<PopularRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchPopularRecipeHandler = async (request: PopularRecipeRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate request
      if (!request.dishName.trim()) {
        throw new Error('Please enter a dish name to search');
      }

      // Try to search for popular recipe with AI
      let recipe: PopularRecipe;
      
      try {
        recipe = await searchPopularRecipe(request);
      } catch (aiError) {
        console.warn('AI search failed, using fallback:', aiError);
        // If AI fails, use fallback recipe
        recipe = generateFallbackPopularRecipe(request);
      }

      setCurrentPopularRecipe(recipe);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search for recipe';
      setError(errorMessage);
      console.error('Popular recipe search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearPopularRecipe = () => {
    setCurrentPopularRecipe(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: PopularRecipeContextType = {
    currentPopularRecipe,
    isLoading,
    error,
    searchPopularRecipe: searchPopularRecipeHandler,
    clearPopularRecipe,
    clearError,
  };

  return (
    <PopularRecipeContext.Provider value={value}>
      {children}
    </PopularRecipeContext.Provider>
  );
}; 