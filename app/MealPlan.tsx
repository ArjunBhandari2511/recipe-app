import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function MealPlanScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Monday, 1 = Tuesday, etc.

  // Mock data for the meal plan
  const userName = "Sarah"; // This would come from route params or context
  const planOverview = {
    dailyCalories: 1850,
    mealsPerDay: 3,
    includeSnacks: true,
    macros: {
      carbs: 45,
      protein: 30,
      fats: 25
    }
  };

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Mock meal data for each day
  const weeklyMealPlan = [
    // Monday
    {
      breakfast: { name: 'Greek Yogurt Bowl with Berries', calories: 320, carbs: 35, protein: 20, fats: 12 },
      lunch: { name: 'Grilled Chicken Salad', calories: 450, carbs: 25, protein: 40, fats: 18 },
      dinner: { name: 'Salmon with Quinoa', calories: 520, carbs: 45, protein: 35, fats: 22 },
      snack: { name: 'Apple with Almond Butter', calories: 180, carbs: 20, protein: 6, fats: 12 }
    },
    // Tuesday
    {
      breakfast: { name: 'Avocado Toast with Eggs', calories: 380, carbs: 30, protein: 18, fats: 22 },
      lunch: { name: 'Turkey Wrap with Veggies', calories: 420, carbs: 35, protein: 28, fats: 20 },
      dinner: { name: 'Beef Stir-fry with Brown Rice', calories: 550, carbs: 50, protein: 38, fats: 24 },
      snack: { name: 'Mixed Nuts', calories: 160, carbs: 8, protein: 6, fats: 14 }
    },
    // Wednesday
    {
      breakfast: { name: 'Oatmeal with Banana', calories: 290, carbs: 45, protein: 12, fats: 8 },
      lunch: { name: 'Quinoa Buddha Bowl', calories: 480, carbs: 55, protein: 20, fats: 18 },
      dinner: { name: 'Grilled Cod with Sweet Potato', calories: 460, carbs: 40, protein: 35, fats: 15 },
      snack: { name: 'Greek Yogurt', calories: 150, carbs: 18, protein: 15, fats: 5 }
    },
    // Thursday
    {
      breakfast: { name: 'Smoothie Bowl', calories: 340, carbs: 42, protein: 16, fats: 14 },
      lunch: { name: 'Lentil Soup with Bread', calories: 390, carbs: 48, protein: 22, fats: 12 },
      dinner: { name: 'Chicken Curry with Rice', calories: 580, carbs: 52, protein: 42, fats: 26 },
      snack: { name: 'Protein Bar', calories: 200, carbs: 20, protein: 12, fats: 8 }
    },
    // Friday
    {
      breakfast: { name: 'Pancakes with Berries', calories: 360, carbs: 48, protein: 14, fats: 16 },
      lunch: { name: 'Mediterranean Bowl', calories: 470, carbs: 38, protein: 25, fats: 24 },
      dinner: { name: 'Pork Tenderloin with Vegetables', calories: 510, carbs: 35, protein: 40, fats: 22 },
      snack: { name: 'Trail Mix', calories: 190, carbs: 18, protein: 8, fats: 12 }
    },
    // Saturday
    {
      breakfast: { name: 'French Toast', calories: 420, carbs: 52, protein: 16, fats: 18 },
      lunch: { name: 'Fish Tacos', calories: 440, carbs: 42, protein: 30, fats: 20 },
      dinner: { name: 'Lamb Chops with Quinoa', calories: 560, carbs: 38, protein: 45, fats: 28 },
      snack: { name: 'Dark Chocolate', calories: 140, carbs: 16, protein: 3, fats: 9 }
    },
    // Sunday
    {
      breakfast: { name: 'Eggs Benedict', calories: 480, carbs: 28, protein: 24, fats: 32 },
      lunch: { name: 'Chicken Caesar Salad', calories: 390, carbs: 18, protein: 35, fats: 22 },
      dinner: { name: 'Pasta with Marinara', calories: 520, carbs: 65, protein: 20, fats: 18 },
      snack: { name: 'Fruit Smoothie', calories: 170, carbs: 35, protein: 8, fats: 3 }
    }
  ];

  const currentDayPlan = weeklyMealPlan[selectedDay];

  const handleExportPlan = () => {
    // Handle export functionality
    console.log('Export meal plan');
  };

  const handleShowGroceryList = () => {
    router.push('/GroceryList');
  };

  const handleCreateNewPlan = () => {
    // Handle create new plan functionality
    console.log('Create new plan');
  };

  return (
    <LinearGradient colors={["#fffef9", "#ffe8d6"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView 
          style={{ flex: 1 }}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Meal Plan for {userName}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity style={styles.actionButton} onPress={handleExportPlan}>
                  <Text style={styles.actionButtonText}>Export Plan</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionButton} onPress={handleShowGroceryList}>
                  <Text style={styles.actionButtonText}>Grocery List</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Plan Overview */}
            <View style={styles.overviewSection}>
              <Text style={styles.sectionTitle}>Plan Overview</Text>
              <View style={styles.overviewCards}>
                <View style={styles.overviewCard}>
                  <Text style={styles.cardLabel}>Daily Calories</Text>
                  <Text style={styles.cardValue}>{planOverview.dailyCalories}</Text>
                </View>
                <View style={styles.overviewCard}>
                  <Text style={styles.cardLabel}>Meals Per Day</Text>
                  <Text style={styles.cardValue}>
                    {planOverview.mealsPerDay}{planOverview.includeSnacks ? ' + Snack' : ''}
                  </Text>
                </View>
                <View style={styles.overviewCard}>
                  <Text style={styles.cardLabel}>Macros (C/P/F)</Text>
                  <Text style={styles.cardValue}>
                    {planOverview.macros.carbs}/{planOverview.macros.protein}/{planOverview.macros.fats}
                  </Text>
                </View>
              </View>
            </View>

            {/* Day Selector */}
            <View style={styles.daySelectorSection}>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daySelector}
              >
                {daysOfWeek.map((day, index) => (
                  <TouchableOpacity
                    key={day}
                    style={[
                      styles.dayButton,
                      selectedDay === index && styles.dayButtonActive
                    ]}
                    onPress={() => setSelectedDay(index)}
                  >
                    <Text style={[
                      styles.dayButtonText,
                      selectedDay === index && styles.dayButtonTextActive
                    ]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Day's Meal Plan */}
            <View style={styles.dayPlanSection}>
              <Text style={styles.sectionTitle}>{daysOfWeek[selectedDay]}'s Meals</Text>
              
              {/* Breakfast */}
              <View style={styles.mealCard}>
                <Text style={styles.mealTitle}>🌅 Breakfast</Text>
                <Text style={styles.mealName}>{currentDayPlan.breakfast.name}</Text>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealCalories}>{currentDayPlan.breakfast.calories} cal</Text>
                  <Text style={styles.mealMacros}>
                    C: {currentDayPlan.breakfast.carbs}g | P: {currentDayPlan.breakfast.protein}g | F: {currentDayPlan.breakfast.fats}g
                  </Text>
                </View>
              </View>

              {/* Lunch */}
              <View style={styles.mealCard}>
                <Text style={styles.mealTitle}>🌞 Lunch</Text>
                <Text style={styles.mealName}>{currentDayPlan.lunch.name}</Text>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealCalories}>{currentDayPlan.lunch.calories} cal</Text>
                  <Text style={styles.mealMacros}>
                    C: {currentDayPlan.lunch.carbs}g | P: {currentDayPlan.lunch.protein}g | F: {currentDayPlan.lunch.fats}g
                  </Text>
                </View>
              </View>

              {/* Dinner */}
              <View style={styles.mealCard}>
                <Text style={styles.mealTitle}>🌙 Dinner</Text>
                <Text style={styles.mealName}>{currentDayPlan.dinner.name}</Text>
                <View style={styles.mealInfo}>
                  <Text style={styles.mealCalories}>{currentDayPlan.dinner.calories} cal</Text>
                  <Text style={styles.mealMacros}>
                    C: {currentDayPlan.dinner.carbs}g | P: {currentDayPlan.dinner.protein}g | F: {currentDayPlan.dinner.fats}g
                  </Text>
                </View>
              </View>

              {/* Snack (if included) */}
              {planOverview.includeSnacks && (
                <View style={styles.mealCard}>
                  <Text style={styles.mealTitle}>🍎 Snack</Text>
                  <Text style={styles.mealName}>{currentDayPlan.snack.name}</Text>
                  <View style={styles.mealInfo}>
                    <Text style={styles.mealCalories}>{currentDayPlan.snack.calories} cal</Text>
                    <Text style={styles.mealMacros}>
                      C: {currentDayPlan.snack.carbs}g | P: {currentDayPlan.snack.protein}g | F: {currentDayPlan.snack.fats}g
                    </Text>
                  </View>
                </View>
              )}

              {/* Daily Total */}
              <View style={styles.dailyTotalCard}>
                <Text style={styles.dailyTotalTitle}>Daily Total</Text>
                <Text style={styles.dailyTotalCalories}>
                  {currentDayPlan.breakfast.calories + currentDayPlan.lunch.calories + 
                   currentDayPlan.dinner.calories + (planOverview.includeSnacks ? currentDayPlan.snack.calories : 0)} calories
                </Text>
                <Text style={styles.dailyTotalMacros}>
                  C: {currentDayPlan.breakfast.carbs + currentDayPlan.lunch.carbs + 
                      currentDayPlan.dinner.carbs + (planOverview.includeSnacks ? currentDayPlan.snack.carbs : 0)}g | 
                  P: {currentDayPlan.breakfast.protein + currentDayPlan.lunch.protein + 
                      currentDayPlan.dinner.protein + (planOverview.includeSnacks ? currentDayPlan.snack.protein : 0)}g | 
                  F: {currentDayPlan.breakfast.fats + currentDayPlan.lunch.fats + 
                      currentDayPlan.dinner.fats + (planOverview.includeSnacks ? currentDayPlan.snack.fats : 0)}g
                </Text>
              </View>
            </View>

            {/* Create New Plan Button */}
            <TouchableOpacity style={styles.newPlanButton} onPress={handleCreateNewPlan}>
              <Text style={styles.newPlanButtonText}>Create a New Plan</Text>
            </TouchableOpacity>
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
  header: {
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  actionButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  overviewSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  overviewCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  overviewCard: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    textAlign: 'center',
  },
  cardValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
  },
  daySelectorSection: {
    marginBottom: 24,
  },
  daySelector: {
    paddingHorizontal: 4,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 90,
    alignItems: 'center',
  },
  dayButtonActive: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  dayButtonText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  dayButtonTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  dayPlanSection: {
    marginBottom: 24,
  },
  mealCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mealTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  mealName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  mealInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mealCalories: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  mealMacros: {
    fontSize: 14,
    color: '#6B7280',
  },
  dailyTotalCard: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#FF6B6B',
    marginTop: 8,
  },
  dailyTotalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  dailyTotalCalories: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B6B',
    textAlign: 'center',
    marginBottom: 4,
  },
  dailyTotalMacros: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  newPlanButton: {
    backgroundColor: '#333',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  newPlanButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});
