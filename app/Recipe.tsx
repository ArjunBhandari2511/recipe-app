import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Mock data - will be replaced with backend integration later
const mockRecipeData = {
  homeScreen: {
    name: "Spiced Vegetable Curry",
    prepTime: "15 mins",
    cookTime: "30 mins",
    serves: "4-6",
    cuisine: "Indian",
    ingredients: [
      { name: "Onions", quantity: "2 large", unit: "diced" },
      { name: "Tomatoes", quantity: "3 medium", unit: "chopped" },
      { name: "Garlic", quantity: "4 cloves", unit: "minced" },
      { name: "Ginger", quantity: "1 inch", unit: "grated" },
      { name: "Cumin seeds", quantity: "1 tsp", unit: "" },
      { name: "Coriander powder", quantity: "2 tsp", unit: "" },
      { name: "Turmeric powder", quantity: "1/2 tsp", unit: "" },
      { name: "Red chili powder", quantity: "1 tsp", unit: "" },
      { name: "Mixed vegetables", quantity: "500g", unit: "(carrots, beans, peas)" },
      { name: "Coconut milk", quantity: "400ml", unit: "can" },
      { name: "Fresh cilantro", quantity: "1/4 cup", unit: "chopped" },
      { name: "Salt", quantity: "to taste", unit: "" },
      { name: "Oil", quantity: "2 tbsp", unit: "" }
    ],
    instructions: [
      "Heat oil in a large pan over medium heat. Add cumin seeds and let them splutter for 30 seconds.",
      "Add diced onions and sauté until golden brown, about 5-7 minutes.",
      "Add minced garlic and grated ginger. Cook for another minute until fragrant.",
      "Add chopped tomatoes and cook until they break down and become pulpy, about 8-10 minutes.",
      "Add all the spice powders (coriander, turmeric, red chili) and cook for 1-2 minutes, stirring constantly to prevent burning.",
      "Add the mixed vegetables and stir well to coat with the spice mixture. Cook for 5 minutes.",
      "Pour in the coconut milk and bring to a gentle simmer. Season with salt to taste.",
      "Cover and let it simmer for 15-20 minutes until vegetables are tender and the curry has thickened.",
      "Taste and adjust seasoning if needed. Garnish with fresh cilantro before serving.",
      "Serve hot with steamed rice, naan, or roti. Enjoy your homemade curry!"
    ]
  },
  popularRecipe: {
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
  }
};

export default function RecipeScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Get recipe data based on source
  const getRecipeData = () => {
    if (params.source === 'home') {
      return mockRecipeData.homeScreen;
    } else if (params.source === 'popular' && params.recipeName) {
      const recipeName = params.recipeName as string;
      return mockRecipeData.popularRecipe[recipeName as keyof typeof mockRecipeData.popularRecipe] || mockRecipeData.popularRecipe["Paneer Butter Masala"];
    }
    return mockRecipeData.homeScreen;
  };

  const recipe = getRecipeData();
  const [expandedIngredients, setExpandedIngredients] = useState(false);

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
            </View>

            {/* Info Cards Section */}
            <View style={styles.infoCardsContainer}>
              <InfoCard icon="⏱️" label="Prep Time" value={recipe.prepTime} />
              <InfoCard icon="🍳" label="Cook Time" value={recipe.cookTime} />
              <InfoCard icon="👥" label="Serves" value={recipe.serves} />
              <InfoCard icon="🌍" label="Cuisine" value={recipe.cuisine} />
            </View>

            {/* Ingredients Section */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>🥘 Ingredients</Text>
                <TouchableOpacity 
                  onPress={() => setExpandedIngredients(!expandedIngredients)}
                  style={styles.expandButton}
                  activeOpacity={0.7}
                >
                  <Text style={styles.expandButtonText}>
                    {expandedIngredients ? 'Show Less' : 'Show All'} ({recipe.ingredients.length})
                  </Text>
                </TouchableOpacity>
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
