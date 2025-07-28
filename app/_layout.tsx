import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarShowLabel: true,
        tabBarLabelStyle: { fontSize: 12, fontWeight: '500' },
        headerShown: false,
        tabBarIcon: ({ color, focused }) => {
          let iconName = '';
          let size = focused ? 28 : 24;
          if (route.name === 'index') iconName = 'home-outline';
          else if (route.name === 'PopularRecipe') iconName = 'flame-outline';
          else if (route.name === 'MealPlanner') iconName = 'calendar-outline';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
        tabBarIndicatorStyle: { display: 'none' },
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="PopularRecipe" options={{ title: 'Popular Recipes' }} />
      <Tabs.Screen name="MealPlanner" options={{ title: 'Meal Planner' }} />
      <Tabs.Screen 
        name="Recipe" 
        options={{ 
          title: 'Recipe',
          href: null, // This hides it from the tab bar
        }} 
      />
      <Tabs.Screen 
        name="MealPlan" 
        options={{ 
          title: 'Meal Plan',
          href: null, // This hides it from the tab bar
        }} 
      />
      <Tabs.Screen 
        name="GroceryList" 
        options={{ 
          title: 'Grocery List',
          href: null, // This hides it from the tab bar
        }} 
      />
      <Tabs.Screen 
        name="LoadingRecipe" 
        options={{ 
          title: 'Loading Recipe',
          href: null, // This hides it from the tab bar
        }} 
      />
    </Tabs>
  );
}
