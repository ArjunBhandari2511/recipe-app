import Groq from 'groq-sdk';
import { API_CONFIG, validateApiConfig } from '../config/api';

// Initialize Groq client
const groq = new Groq({
  apiKey: API_CONFIG.getApiKey(),
});

export interface PopularRecipeRequest {
  dishName: string;
  cuisine?: string;
  dietary?: string;
  spiceLevel?: string;
}

export interface PopularRecipe {
  name: string;
  description: string;
  prepTime: string;
  cookTime: string;
  serves: string;
  cuisine: string;
  difficulty: string;
  rating: string;
  ingredients: {
    name: string;
    quantity: string;
    unit: string;
  }[];
  instructions: string[];
  tips: string[];
  nutritionInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
}

export class PopularRecipeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'PopularRecipeError';
  }
}

export const searchPopularRecipe = async (request: PopularRecipeRequest): Promise<PopularRecipe> => {
  try {
    // Validate API configuration
    if (!validateApiConfig()) {
      throw new PopularRecipeError('API key not configured. Please set up your Groq API key.');
    }

    const prompt = buildPopularRecipePrompt(request);
    
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are a professional chef and recipe expert. You have extensive knowledge of popular recipes from around the world. Provide detailed, authentic recipes that are widely recognized and loved. Include cultural context and cooking tips."
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
      throw new PopularRecipeError('No response from AI service');
    }

    return parsePopularRecipeResponse(response);
  } catch (error) {
    console.error('Popular recipe search error:', error);
    if (error instanceof PopularRecipeError) {
      throw error;
    }
    throw new PopularRecipeError('Failed to search for recipe. Please try again.');
  }
};

const buildPopularRecipePrompt = (request: PopularRecipeRequest): string => {
  const cuisineFilter = request.cuisine ? ` in ${request.cuisine} cuisine` : '';
  const dietaryFilter = request.dietary ? ` (${request.dietary})` : '';
  const spiceFilter = request.spiceLevel ? ` with ${request.spiceLevel} spice level` : '';
  
  return `Find a popular and well-known recipe for "${request.dishName}"${cuisineFilter}${dietaryFilter}${spiceFilter}.

This should be a widely recognized, authentic recipe that many people know and love. Please provide the recipe in the following JSON format:

{
  "name": "Recipe Name",
  "description": "Brief description of the dish and its cultural significance",
  "prepTime": "X mins",
  "cookTime": "X mins",
  "serves": "X-X people",
  "cuisine": "Cuisine Type",
  "difficulty": "Easy/Medium/Hard",
  "rating": "X.X/5 stars",
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
  "tips": [
    "Cooking tip 1",
    "Cooking tip 2",
    "Cooking tip 3"
  ],
  "nutritionInfo": {
    "calories": "X per serving",
    "protein": "Xg per serving",
    "carbs": "Xg per serving",
    "fat": "Xg per serving"
  }
}

Make sure this is a genuine, popular recipe that people would recognize and want to make. Include authentic ingredients and techniques.`;
};

const parsePopularRecipeResponse = (response: string): PopularRecipe => {
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
      description: recipeData.description || '',
      prepTime: recipeData.prepTime || '15 mins',
      cookTime: recipeData.cookTime || '30 mins',
      serves: recipeData.serves || '4',
      cuisine: recipeData.cuisine || 'International',
      difficulty: recipeData.difficulty || 'Medium',
      rating: recipeData.rating || '4.5/5',
      ingredients: recipeData.ingredients || [],
      instructions: recipeData.instructions || [],
      tips: recipeData.tips || [],
      nutritionInfo: recipeData.nutritionInfo
    };
  } catch (error) {
    console.error('Failed to parse popular recipe response:', error);
    throw new PopularRecipeError('Failed to parse recipe response');
  }
};

// Fallback popular recipe generator
export const generateFallbackPopularRecipe = (request: PopularRecipeRequest): PopularRecipe => {
  const dishName = request.dishName;
  
  return {
    name: dishName,
    description: `A delicious ${dishName} recipe that's easy to make at home.`,
    prepTime: '15 mins',
    cookTime: '25 mins',
    serves: '4',
    cuisine: request.cuisine || 'International',
    difficulty: 'Medium',
    rating: '4.2/5',
    ingredients: [
      { name: 'Main ingredient', quantity: '500g', unit: '' },
      { name: 'Onions', quantity: '2', unit: 'medium' },
      { name: 'Garlic', quantity: '4', unit: 'cloves' },
      { name: 'Oil', quantity: '2', unit: 'tbsp' },
      { name: 'Salt', quantity: 'to taste', unit: '' }
    ],
    instructions: [
      'Prepare your ingredients.',
      'Heat oil in a pan over medium heat.',
      'Add your main ingredients and cook until done.',
      'Season with salt and spices.',
      'Serve hot and enjoy!'
    ],
    tips: [
      'Make sure to use fresh ingredients for best results.',
      'Adjust seasoning according to your taste preferences.',
      'You can customize this recipe with additional ingredients.'
    ],
    nutritionInfo: {
      calories: '300 per serving',
      protein: '15g per serving',
      carbs: '25g per serving',
      fat: '12g per serving'
    }
  };
};

// Get trending recipe suggestions
export const getTrendingSuggestions = (): string[] => {
  return [
    'Butter Chicken',
    'Paneer Butter Masala',
    'Biryani',
    'Tikka Masala',
    'Naan Bread',
    'Gulab Jamun',
    'Masala Dosa',
    'Dal Makhani',
    'Chicken Curry',
    'Ramen',
    'Pasta Carbonara',
    'Margherita Pizza',
    'Sushi Roll',
    'Pad Thai',
    'Tacos',
    'Burger',
    'Caesar Salad',
    'Chocolate Cake',
    'Tiramisu',
    'Cheesecake'
  ];
}; 