import Groq from 'groq-sdk';
import { API_CONFIG, validateApiConfig } from '../config/api';

// Initialize Groq client
const groq = new Groq({
  apiKey: API_CONFIG.getApiKey(),
});

export interface RecipeRequest {
  ingredients: string[];
  excludes: string[];
  spiceLevel: string;
  servings: number;
  dietary?: string;
  cuisine?: string;
}

export interface RecipeIngredient {
  name: string;
  quantity: string;
  unit: string;
}

export interface GeneratedRecipe {
  name: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  cuisine: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  nutritionInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export class RecipeGenerationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecipeGenerationError';
  }
}

export const generateRecipe = async (request: RecipeRequest): Promise<GeneratedRecipe> => {
  try {
    // Validate API configuration
    if (!validateApiConfig()) {
      throw new RecipeGenerationError('API key not configured. Please set up your Groq API key.');
    }

    const prompt = buildRecipePrompt(request);
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional chef and recipe creator. Generate detailed, practical recipes that are easy to follow and delicious. Always provide accurate measurements and clear instructions."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: API_CONFIG.GROQ.MODEL
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new RecipeGenerationError('No response from AI service');
    }

    return parseRecipeResponse(response);
  } catch (error) {
    console.error('Recipe generation error:', error);
    if (error instanceof RecipeGenerationError) {
      throw error;
    }
    throw new RecipeGenerationError('Failed to generate recipe. Please try again.');
  }
};

const buildRecipePrompt = (request: RecipeRequest): string => {
  const ingredientsList = request.ingredients.join(', ');
  const excludesList = request.excludes.length > 0 ? request.excludes.join(', ') : 'none';
  
  return `Create a detailed recipe with the following requirements:

Available Ingredients: ${ingredientsList}
Exclude these ingredients: ${excludesList}
Spice Level: ${request.spiceLevel}
Number of Servings: ${request.servings}
Dietary Restrictions: ${request.dietary || 'none'}
Cuisine Preference: ${request.cuisine || 'any'}

Please provide the recipe in the following JSON format:
{
  "name": "Recipe Name",
  "prepTime": "X mins",
  "cookTime": "X mins", 
  "serves": "X-X",
  "cuisine": "Cuisine Type",
  "ingredients": [
    {
      "name": "Ingredient Name",
      "quantity": "X",
      "unit": "unit of measurement"
    }
  ],
  "instructions": [
    "Step 1 instruction",
    "Step 2 instruction",
    "Step 3 instruction"
  ],
  "nutritionInfo": {
    "calories": "X per serving",
    "protein": "Xg per serving", 
    "carbs": "Xg per serving",
    "fat": "Xg per serving"
  }
}

Make sure the recipe is practical, uses the available ingredients, respects dietary restrictions, and matches the spice level and cuisine preferences. The instructions should be clear and easy to follow.`;
};

const parseRecipeResponse = (response: string): GeneratedRecipe => {
  try {
    // Try to extract JSON from the response
    const jsonMatch = response.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const recipeData = JSON.parse(jsonMatch[0]);
    
    // Validate required fields
    if (!recipeData.name || !recipeData.ingredients || !recipeData.instructions) {
      throw new Error('Missing required recipe fields');
    }

    return {
      name: recipeData.name,
      prepTime: recipeData.prepTime || '15 mins',
      cookTime: recipeData.cookTime || '30 mins',
      serves: recipeData.serves || '4',
      cuisine: recipeData.cuisine || 'International',
      ingredients: recipeData.ingredients || [],
      instructions: recipeData.instructions || [],
      nutritionInfo: recipeData.nutritionInfo
    };
  } catch (error) {
    console.error('Failed to parse recipe response:', error);
    throw new RecipeGenerationError('Failed to parse recipe response');
  }
};

// Fallback recipe generator for when AI is not available
export const generateFallbackRecipe = (request: RecipeRequest): GeneratedRecipe => {
  const baseIngredients = request.ingredients.slice(0, 3);
  const recipeName = `${baseIngredients.join(' ')} ${request.cuisine || 'Fusion'} Recipe`;
  
  return {
    name: recipeName,
    prepTime: '15 mins',
    cookTime: '25 mins',
    serves: request.servings.toString(),
    cuisine: request.cuisine || 'International',
    ingredients: request.ingredients.map(ingredient => ({
      name: ingredient,
      quantity: '1',
      unit: 'portion'
    })),
    instructions: [
      'Heat oil in a pan over medium heat.',
      'Add your ingredients and cook until tender.',
      'Season with spices according to your spice level preference.',
      'Serve hot and enjoy!'
    ],
    nutritionInfo: {
      calories: '250 per serving',
      protein: '12g per serving',
      carbs: '30g per serving',
      fat: '8g per serving'
    }
  };
}; 