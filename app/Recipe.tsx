import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePopularRecipe } from '../src/context/PopularRecipeContext';
import { useRecipe } from '../src/context/RecipeContext';
import { GeneratedRecipe } from '../src/services/aiService';
import { PopularRecipe } from '../src/services/popularRecipeService';

// Mock data for popular recipes (keeping this for popular recipe section)
const mockPopularRecipeData: { [key: string]: GeneratedRecipe } = {
  "Paneer Butter Masala": {
    name: "Paneer Butter Masala",
    prepTime: "20 mins",
    cookTime: "25 mins",
    serves: "4",
    cuisine: "North Indian",
    ingredients: [
      { name: "Paneer", quantity: "400g", unit: "cubed" },
      { name: "Butter", quantity: "3 tbsp", unit: "" },
      { name: "Onions", quantity: "2 large", unit: "finely chopped" },
      { name: "Tomatoes", quantity: "4 large", unit: "pureed" },
      { name: "Cashews", quantity: "1/4 cup", unit: "" },
      { name: "Ginger-garlic paste", quantity: "1 tbsp", unit: "" },
      { name: "Red chili powder", quantity: "1 tsp", unit: "" },
      { name: "Garam masala", quantity: "1 tsp", unit: "" },
      { name: "Heavy cream", quantity: "1/2 cup", unit: "" },
      { name: "Fresh cilantro", quantity: "2 tbsp", unit: "chopped" },
      { name: "Salt", quantity: "to taste", unit: "" }
    ],
    instructions: [
      "Soak cashews in warm water for 15 minutes, then blend into a smooth paste.",
      "Heat 2 tbsp butter in a pan and lightly fry paneer cubes until golden. Set aside.",
      "In the same pan, add remaining butter and sauté onions until golden brown.",
      "Add ginger-garlic paste and cook for 1 minute until fragrant.",
      "Add tomato puree and cook until oil separates, about 10-12 minutes.",
      "Add red chili powder, garam masala, and salt. Mix well.",
      "Add the cashew paste and cook for 2-3 minutes, stirring continuously.",
      "Add heavy cream and mix well. Let it simmer for 5 minutes.",
      "Gently add the fried paneer and simmer for 3-4 minutes.",
      "Garnish with fresh cilantro and serve hot with naan or rice."
    ]
  },
  "Butter Chicken": {
    name: "Butter Chicken",
    prepTime: "30 mins",
    cookTime: "40 mins",
    serves: "4-6",
    cuisine: "North Indian",
    ingredients: [
      { name: "Chicken", quantity: "1 kg", unit: "boneless, cubed" },
      { name: "Yogurt", quantity: "1/2 cup", unit: "" },
      { name: "Lemon juice", quantity: "2 tbsp", unit: "" },
      { name: "Ginger-garlic paste", quantity: "2 tbsp", unit: "" },
      { name: "Red chili powder", quantity: "1 tsp", unit: "" },
      { name: "Garam masala", quantity: "1 tsp", unit: "" },
      { name: "Butter", quantity: "4 tbsp", unit: "" },
      { name: "Onions", quantity: "2 large", unit: "chopped" },
      { name: "Tomatoes", quantity: "4 large", unit: "pureed" },
      { name: "Heavy cream", quantity: "3/4 cup", unit: "" },
      { name: "Kasuri methi", quantity: "1 tsp", unit: "" },
      { name: "Salt", quantity: "to taste", unit: "" }
    ],
    instructions: [
      "Marinate chicken with yogurt, lemon juice, half the ginger-garlic paste, red chili powder, and salt for at least 30 minutes.",
      "Heat 2 tbsp butter in a pan and cook marinated chicken until done. Set aside.",
      "In the same pan, add remaining butter and sauté onions until golden.",
      "Add remaining ginger-garlic paste and cook for 1 minute.",
      "Add tomato puree and cook until oil separates, about 15 minutes.",
      "Add garam masala and cook for another minute.",
      "Blend the mixture smooth and return to pan.",
      "Add heavy cream and bring to a gentle simmer.",
      "Add cooked chicken and simmer for 10 minutes.",
      "Sprinkle kasuri methi, adjust seasoning, and serve hot."
    ]
  }
};

export default function RecipeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { currentRecipe } = useRecipe();
  const { currentPopularRecipe } = usePopularRecipe();
  const [expandedIngredients, setExpandedIngredients] = useState(false);
  
  // Get recipe data based on source
  const getRecipeData = () => {
    if (params.source === 'home') {
      // Use AI-generated recipe if available, otherwise show a message
      if (currentRecipe) {
        return currentRecipe;
      } else {
        // Return a placeholder recipe if no AI recipe is available
        return {
          name: "Recipe Not Found",
          prepTime: "0 mins",
          cookTime: "0 mins",
          serves: "0",
          cuisine: "Unknown",
          ingredients: [],
          instructions: ["Please go back and generate a new recipe."]
        };
      }
    } else if (params.source === 'popular' && params.recipeName) {
      // Use AI-generated popular recipe if available
      if (currentPopularRecipe) {
        return currentPopularRecipe;
      }
      
      // Fallback to mock data
      const recipeName = params.recipeName as string;
      return mockPopularRecipeData[recipeName as keyof typeof mockPopularRecipeData] || mockPopularRecipeData["Paneer Butter Masala"];
    }
    return mockPopularRecipeData["Paneer Butter Masala"];
  };

  const recipe = getRecipeData();
  const isPopularRecipe = params.source === 'popular' && currentPopularRecipe;

  // Get mock video data based on recipe name (will be replaced with YouTube API)
  const getVideoData = () => {
    const recipeName = params.recipeName as string || recipe.name;
    return [
      {
        title: `How to Make ${recipeName} - Easy Recipe`,
        channel: "Chef's Kitchen",
        duration: "12:34",
        views: "1.2M",
        uploadDate: "2 months ago"
      },
      {
        title: `${recipeName} Recipe - Restaurant Style`,
        channel: "Cooking Master",
        duration: "15:20",
        views: "850K",
        uploadDate: "3 weeks ago"
      },
      {
        title: `Perfect ${recipeName} in 30 Minutes`,
        channel: "Quick Recipes",
        duration: "8:45",
        views: "2.5M",
        uploadDate: "1 month ago"
      }
    ];
  };

  const InfoCard = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
    <View style={styles.infoCard}>
      <Text style={styles.infoCardIcon}>{icon}</Text>
      <Text style={styles.infoCardLabel}>{label}</Text>
      <Text style={styles.infoCardValue}>{value}</Text>
    </View>
  );

  // Show nutrition info if available
  const NutritionCard = ({ label, value }: { label: string; value: string }) => (
    <View style={styles.nutritionCard}>
      <Text style={styles.nutritionLabel}>{label}</Text>
      <Text style={styles.nutritionValue}>{value}</Text>
    </View>
  );

  // Show tips if available (for popular recipes)
  const TipsCard = ({ tip, index }: { tip: string; index: number }) => (
    <View style={styles.tipCard}>
      <View style={styles.tipNumber}>
        <Text style={styles.tipNumberText}>{index + 1}</Text>
      </View>
      <Text style={styles.tipText}>{tip}</Text>
    </View>
  );

  return (
    <LinearGradient colors={["#fffef9", "#ffe8d6"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header with Back Button */}
            <View style={styles.headerContainer}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => router.back()}
                activeOpacity={0.7}
              >
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              
              <View style={styles.recipeHeaderContent}>
                {/* Recipe Name */}
                <Text style={styles.recipeName}>{recipe.name}</Text>
                <Text style={styles.recipeSubtitle}>
                  {params.source === 'home' ? 'AI Generated Recipe' : 'Popular Recipe'}
                </Text>
              </View>
              
              {/* Description for popular recipes - Horizontal layout */}
              {isPopularRecipe && (recipe as PopularRecipe).description && (
                <View style={styles.descriptionContainer}>
                  <View style={styles.descriptionIcon}>
                    <Text style={styles.descriptionIconText}>📖</Text>
                  </View>
                  <Text style={styles.recipeDescription}>
                    {(recipe as PopularRecipe).description}
                  </Text>
                </View>
              )}
            </View>

            {/* Info Cards Section */}
            <View style={styles.infoCardsContainer}>
              <InfoCard icon="⏱️" label="Prep Time" value={recipe.prepTime} />
              <InfoCard icon="🍳" label="Cook Time" value={recipe.cookTime} />
              <InfoCard icon="👥" label="Serves" value={recipe.serves} />
              <InfoCard icon="🌍" label="Cuisine" value={recipe.cuisine} />
            </View>

            {/* Additional info for popular recipes */}
            {isPopularRecipe && (
              <View style={styles.additionalInfoContainer}>
                <View style={styles.additionalInfoRow}>
                  <View style={styles.additionalInfoCard}>
                    <Text style={styles.additionalInfoLabel}>Difficulty</Text>
                    <Text style={styles.additionalInfoValue}>
                      {(recipe as PopularRecipe).difficulty || 'Medium'}
                    </Text>
                  </View>
                  <View style={styles.additionalInfoCard}>
                    <Text style={styles.additionalInfoLabel}>Rating</Text>
                    <Text style={styles.additionalInfoValue}>
                      {(recipe as PopularRecipe).rating || '4.5/5'}
                    </Text>
                  </View>
                </View>
              </View>
            )}

            {/* Nutrition Info Section - Only show for AI recipes */}
            {params.source === 'home' && recipe.nutritionInfo && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>📊 Nutrition Info</Text>
                <View style={styles.nutritionContainer}>
                  <NutritionCard label="Calories" value={recipe.nutritionInfo.calories} />
                  <NutritionCard label="Protein" value={recipe.nutritionInfo.protein} />
                  <NutritionCard label="Carbs" value={recipe.nutritionInfo.carbs} />
                  <NutritionCard label="Fat" value={recipe.nutritionInfo.fat} />
                </View>
              </View>
            )}

            {/* Ingredients Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🥘 Ingredients</Text>
                {recipe.ingredients.length > 6 && (
                  <TouchableOpacity 
                    onPress={() => setExpandedIngredients(!expandedIngredients)}
                    style={styles.expandButton}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.expandButtonText}>
                      {expandedIngredients ? 'Show Less' : 'Show All'} ({recipe.ingredients.length})
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              
              <View style={styles.ingredientsContainer}>
                {recipe.ingredients
                  .slice(0, expandedIngredients ? recipe.ingredients.length : 6)
                  .map((ingredient, index) => (
                    <View key={index} style={styles.ingredientItem}>
                      <View style={styles.ingredientBullet} />
                      <View style={styles.ingredientContent}>
                        <Text style={styles.ingredientName}>{ingredient.name}</Text>
                        <Text style={styles.ingredientQuantity}>
                          {ingredient.quantity} {ingredient.unit}
                        </Text>
                      </View>
                    </View>
                  ))}
              </View>
            </View>

            {/* Instructions Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>📝 Instructions</Text>
              <View style={styles.instructionsContainer}>
                {recipe.instructions.map((instruction, index) => (
                  <View key={index} style={styles.instructionItem}>
                    <View style={styles.instructionNumber}>
                      <Text style={styles.instructionNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.instructionText}>{instruction}</Text>
                  </View>
                ))}
              </View>
            </View>

            {/* Tips Section - Only for popular recipes */}
            {isPopularRecipe && (recipe as PopularRecipe).tips && (recipe as PopularRecipe).tips.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>💡 Cooking Tips</Text>
                <View style={styles.tipsContainer}>
                  {(recipe as PopularRecipe).tips.map((tip, index) => (
                    <TipsCard key={index} tip={tip} index={index} />
                  ))}
                </View>
              </View>
            )}

            {/* Recipe Videos Section - Only for Popular Recipes */}
            {params.source === 'popular' && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>🎥 Recipe Videos</Text>
                <Text style={styles.videosSectionSubtitle}>Watch how to make this recipe</Text>
                <View style={styles.videosContainer}>
                  {getVideoData().map((video, index) => (
                    <TouchableOpacity key={index} style={styles.videoCard} activeOpacity={0.85}>
                      <View style={styles.videoThumbnail}>
                        <View style={styles.videoPlayButton}>
                          <Text style={styles.videoPlayIcon}>▶</Text>
                        </View>
                        <View style={styles.videoDuration}>
                          <Text style={styles.videoDurationText}>{video.duration}</Text>
                        </View>
                      </View>
                      <View style={styles.videoInfo}>
                        <Text style={styles.videoTitle} numberOfLines={2}>{video.title}</Text>
                        <Text style={styles.videoChannel}>{video.channel}</Text>
                        <View style={styles.videoStats}>
                          <Text style={styles.videoViews}>{video.views} views</Text>
                          <Text style={styles.videoDate}>• {video.uploadDate}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.primaryButton} activeOpacity={0.85}>
                <Text style={styles.primaryButtonText}>🍽️ Start Cooking</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.secondaryButton} activeOpacity={0.85}>
                <Text style={styles.secondaryButtonText}>❤️ Save Recipe</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    paddingTop: Platform.OS === 'ios' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 44) : 24,
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: Platform.OS === 'ios' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 44) : 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  recipeHeaderContent: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60, // Space for back button
    paddingHorizontal: 60, // Prevent overlap with back button
  },
  recipeName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  recipeSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 8,
  },
  recipeDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'left',
    lineHeight: 20,
    flex: 1,
  },
  descriptionContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  descriptionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  descriptionIconText: {
    fontSize: 16,
    color: '#fff',
  },
  infoCardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
    gap: 12,
  },
  infoCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  infoCardIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  infoCardLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  infoCardValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
  additionalInfoContainer: {
    marginBottom: 32,
  },
  additionalInfoRow: {
    flexDirection: 'row',
    gap: 12,
  },
  additionalInfoCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  additionalInfoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  additionalInfoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '700',
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  expandButton: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  expandButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  ingredientsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  ingredientBullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF6B6B',
    marginTop: 6,
    marginRight: 12,
  },
  ingredientContent: {
    flex: 1,
  },
  ingredientName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  ingredientQuantity: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  instructionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  instructionNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  instructionText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    fontWeight: '400',
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  tipNumber: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  tipNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    fontWeight: '400',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FF6B6B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryButtonText: {
    color: '#FF6B6B',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  // Nutrition Section Styles
  nutritionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  nutritionCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  nutritionLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  nutritionValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  // Video Section Styles
  videosSectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    marginTop: -8,
  },
  videosContainer: {
    gap: 16,
  },
  videoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  videoThumbnail: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginBottom: 12,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlayButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 107, 107, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  videoPlayIcon: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 3, // Slight offset for visual centering
  },
  videoDuration: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  videoDurationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  videoInfo: {
    gap: 6,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    lineHeight: 22,
  },
  videoChannel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  videoStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  videoViews: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  videoDate: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
});
