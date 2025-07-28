import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { ActivityIndicator, Alert, Animated, FlatList, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChefOrange from '../assets/Chef-Orange.svg';

const trendingRecipes = [
  {
    id: '1',
    name: 'Paneer Tikka',
    image: require('../assets/images/paneer-tikka.jpg'),
    tag: 'Spicy',
  },
  {
    id: '2',
    name: 'Veg Biryani',
    image: require('../assets/images/veg-biryani.jpg'),
    tag: '10-min',
  },
  {
    id: '3',
    name: 'Masala Dosa',
    image: require('../assets/images/masala-dosa.jpg'),
    tag: 'South Indian',
  },
  {
    id: '4',
    name: 'Butter Chicken',
    image: require('../assets/images/butter-chicken.jpg'),
    tag: 'Popular',
  },
  {
    id: '5',
    name: 'Chicken Curry',
    image: require('../assets/images/chicken-curry.jpg'),
    tag: 'Quick',
  },
  {
    id: '6',
    name: 'Dal Makhani',
    image: require('../assets/images/dal-makhani.jpg'),
    tag: 'Healthy',
  },
  {
    id: '7',
    name: 'Naan Bread',
    image: require('../assets/images/naan-bread.jpg'),
    tag: 'Bread',
  },
  {
    id: '8',
    name: 'Gulab Jamun',
    image: require('../assets/images/gulab-jamun.jpg'),
    tag: 'Dessert',
  },
];

const trendingBadges = [
  { name: 'Butter Chicken', color: '#FFE0B2' },
  { name: 'Ramen', color: '#E1F5FE' },
  { name: 'Pasta Bake', color: '#FFECB3' },
  { name: 'Tacos', color: '#C8E6C9' },
  { name: 'Paneer Tikka', color: '#F8BBD0' },
];

export default function PopularRecipeScreen() {
  const [dish, setDish] = useState('');
  const [loading, setLoading] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFindRecipe = () => {
    // Pulse animation
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 120,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 120,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        Alert.alert('Find Recipe', `Searching for: ${dish || '...'}`);
      }, 1200);
    });
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
            <View style={styles.headerSafeArea}>
              <ChefOrange width={160} height={160} style={styles.chefSvg} />
              <Text style={styles.heading}>Search for a Popular Recipe</Text>
              <Text style={styles.subheading}>Know What You Want?</Text>
            </View>
            <View style={styles.inputSection}>
              <Text style={styles.label}>Enter the name of the dish you'd like to make</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Paneer Butter Masala"
                placeholderTextColor="#9CA3AF"
                value={dish}
                onChangeText={setDish}
                returnKeyType="search"
              />
            </View>
            {/* Top 5 Trending This Week Badges */}
            <View style={styles.badgeSection}>
              <Text style={styles.badgeHeading}>Top 5 Trending This Week</Text>
              <View style={styles.badgeRow}>
                {trendingBadges.map(badge => (
                  <TouchableOpacity
                    key={badge.name}
                    style={[styles.badgePill, { backgroundColor: badge.color }]}
                    onPress={() => setDish(badge.name)}
                    activeOpacity={0.85}
                  >
                    <Text style={styles.badgeText}>{badge.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <Animated.View style={{ width: '100%', transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity style={styles.button} onPress={handleFindRecipe} activeOpacity={0.85} disabled={loading}>
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Find Recipe</Text>
                )}
              </TouchableOpacity>
            </Animated.View>
            {/* Recently Trending Recipes Section */}
            <View style={styles.trendingSection}>
              <Text style={styles.trendingHeading}>Recently Trending Recipes</Text>
              <FlatList
                data={trendingRecipes}
                keyExtractor={item => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.trendingList}
                              renderItem={({ item }) => (
                <View style={styles.trendingCard}>
                  <Image source={item.image} style={styles.trendingImage} />
                  <View style={styles.badgeContainer}>
                    <Text style={styles.cornerBadge}>{item.tag}</Text>
                  </View>
                  <View style={styles.textOverlay}>
                    <Text style={styles.trendingName}>{item.name}</Text>
                  </View>
                </View>
              )}
              />
            </View>
            {/* Newsletter Section */}
            <View style={styles.newsletterSection}>
              <View style={styles.newsletterCard}>
                <Text style={styles.newsletterTitle}>Get Exciting Offers!</Text>
                <Text style={styles.newsletterSubtitle}>Email us to Get Exciting Coupons and Offers</Text>
                <TouchableOpacity style={styles.newsletterButton} activeOpacity={0.85}>
                  <Text style={styles.newsletterButtonText}>Subscribe Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputSection: {
    width: '100%',
    marginBottom: 32,
  },
  label: {
    fontSize: 15,
    color: '#444',
    fontWeight: '500',
    marginBottom: 6,
  },
  input: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 4,
  },
  button: {
    width: '100%',
    backgroundColor: '#FF6B6B',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  headerSafeArea: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 8,
    // Responsive top margin for notch and larger screens
    marginTop: Platform.OS === 'ios' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 44) : 24,
  },
  chefSvg: {
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 8,
  },
  trendingSection: {
    width: '100%',
    marginTop: 32,
  },
  trendingHeading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
    marginLeft: 4,
  },
  trendingList: {
    paddingLeft: 4,
    paddingRight: 20,
  },
  trendingCard: {
    width: 160,
    height: 160,
    borderRadius: 16,
    marginRight: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    position: 'absolute',
  },
  trendingName: {
    fontWeight: '700',
    fontSize: 15,
    color: '#ffffff',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  badgeContainer: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  cornerBadge: {
    fontSize: 11,
    fontWeight: '600',
    color: '#FF6B6B',
  },
  badgeSection: {
    width: '100%',
    marginBottom: 18,
    marginTop: 12,
  },
  badgeHeading: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 2,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  badgePill: {
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
    marginRight: 8,
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeText: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
  },
  newsletterSection: {
    width: '100%',
    marginTop: 32,
  },
  newsletterCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  newsletterTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  newsletterSubtitle: {
    fontSize: 15,
    color: '#6B7280',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 22,
  },
  newsletterButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newsletterButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  scrollContainer: {
    flexGrow: 1,
  },
}); 