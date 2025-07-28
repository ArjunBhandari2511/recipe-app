import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Image, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoadingRecipeScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace({ pathname: '/Recipe', params: { source: 'home' } });
    }, 1500);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient colors={["#fffef9", "#ffe8d6"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Image
          source={require('../assets/UniqueRecipe.gif')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
        <Text style={{ marginTop: 24, fontSize: 20, color: '#FF6B6B', fontWeight: 'bold', textAlign: 'center' }}>
         Curating your unique recipe...
        </Text>
      </SafeAreaView>
    </LinearGradient>
  );
} 