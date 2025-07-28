import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usePopularRecipe } from '../src/context/PopularRecipeContext';

export default function LoadingPopularRecipeScreen() {
  const router = useRouter();
  const { currentPopularRecipe, isLoading, error } = usePopularRecipe();

  useEffect(() => {
    // If we have a recipe and loading is complete, navigate to recipe screen
    if (currentPopularRecipe && !isLoading) {
      const timer = setTimeout(() => {
        router.replace({ 
          pathname: '/Recipe', 
          params: { source: 'popular', recipeName: currentPopularRecipe.name } 
        });
      }, 1500);
      return () => clearTimeout(timer);
    }
    
    // If there's an error, show it briefly then go back
    if (error && !isLoading) {
      const timer = setTimeout(() => {
        router.back();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [currentPopularRecipe, isLoading, error, router]);

  return (
    <LinearGradient colors={["#fffef9", "#ffe8d6"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/PopularRecipe.gif')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text style={{ marginTop: 24, fontSize: 20, color: '#FF6B6B', fontWeight: 'bold', textAlign: 'center' }}>
          {error ? 'Search failed...' : 'Searching for your recipe...'}
        </Text>
        <Text style={{ marginTop: 12, fontSize: 16, color: '#6B7280', textAlign: 'center', paddingHorizontal: 32 }}>
          {error ? error : 'Finding the perfect recipe for you'}
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
} 