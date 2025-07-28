import React, { createContext, ReactNode, useContext, useState } from 'react';
import { GeneratedRecipe, generateFallbackRecipe, generateRecipe, RecipeRequest } from '../services/aiService';

interface RecipeContextType {
  currentRecipe: GeneratedRecipe | null;
  isLoading: boolean;
  error: string | null;
  generateNewRecipe: (request: RecipeRequest) => Promise<void>;
  clearRecipe: () => void;
  clearError: () => void;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const useRecipe = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipe must be used within a RecipeProvider');
  }
  return context;
};

interface RecipeProviderProps {
  children: ReactNode;
}

export const RecipeProvider: React.FC<RecipeProviderProps> = ({ children }) => {
  const [currentRecipe, setCurrentRecipe] = useState<GeneratedRecipe | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateNewRecipe = async (request: RecipeRequest) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Validate request
      if (request.ingredients.length === 0) {
        throw new Error('Please add at least one ingredient');
      }

      // Try to generate recipe with AI
      let recipe: GeneratedRecipe;
      
      try {
        recipe = await generateRecipe(request);
      } catch (aiError) {
        console.warn('AI generation failed, using fallback:', aiError);
        // If AI fails, use fallback recipe
        recipe = generateFallbackRecipe(request);
      }

      setCurrentRecipe(recipe);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate recipe';
      setError(errorMessage);
      console.error('Recipe generation error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const clearRecipe = () => {
    setCurrentRecipe(null);
    setError(null);
  };

  const clearError = () => {
    setError(null);
  };

  const value: RecipeContextType = {
    currentRecipe,
    isLoading,
    error,
    generateNewRecipe,
    clearRecipe,
    clearError,
  };

  return (
    <RecipeContext.Provider value={value}>
      {children}
    </RecipeContext.Provider>
  );
}; 