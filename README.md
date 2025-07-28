# Cravebuster - AI-Powered Recipe App

A beautiful React Native recipe app that generates personalized recipes using AI based on your available ingredients and preferences.

## Features

- **AI Recipe Generation**: Generate unique recipes based on available ingredients
- **Personalized Preferences**: Set spice levels, dietary restrictions, and cuisine preferences
- **Meal Planning**: Comprehensive 7-stage meal planning wizard
- **Grocery Lists**: Organized shopping lists with progress tracking
- **Popular Recipes**: Curated collection of popular recipes
- **Nutrition Information**: Detailed nutrition facts for AI-generated recipes

## AI Integration Setup

This app uses Groq AI for recipe generation. To enable AI features:

1. **Get a Groq API Key**:
   - Visit [Groq Console](https://console.groq.com/)
   - Sign up and create an API key

2. **Configure Environment Variables**:
   Create a `.env` file in the root directory:
   ```
   EXPO_PUBLIC_GROQ_API_KEY=your_groq_api_key_here
   ```

3. **Restart the Development Server**:
   ```bash
   npm start
   ```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your API key (see AI Integration Setup above)
4. Start the development server:
   ```bash
   npm start
   ```

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Groq AI** for recipe generation
- **Expo Router** for navigation
- **React Native Reanimated** for animations
- **Linear Gradient** for beautiful UI

## Project Structure

```
recipe-app/
├── app/                    # Main app screens
│   ├── index.tsx          # Home screen with recipe generation
│   ├── Recipe.tsx         # Recipe display screen
│   ├── MealPlanner.tsx    # Meal planning wizard
│   ├── GroceryList.tsx    # Shopping list
│   └── LoadingRecipe.tsx  # Loading screen
├── src/
│   ├── services/
│   │   └── aiService.ts   # AI integration service
│   └── context/
│       └── RecipeContext.tsx # Recipe state management
└── assets/                # Images, SVGs, and other assets
```

## Usage

1. **Generate Recipes**: Add ingredients, set preferences, and generate unique recipes
2. **Plan Meals**: Use the meal planner to create personalized weekly meal plans
3. **Shop Smart**: Use the grocery list to track your shopping progress
4. **Explore Recipes**: Browse popular recipes for inspiration

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
