import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Image, Platform, View as RNView, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChefBro from '../assets/Chef-Bro.svg';

const SPICE_LEVELS = [
  { label: 'Spicy', value: 'Spicy', emoji: '🌶️' },
  { label: 'Medium', value: 'Medium', emoji: '😐' },
  { label: 'Mild', value: 'Mild', emoji: '🧂' },
];
const DIETARY_OPTIONS = [
  { label: 'Vegetarian', value: 'Vegetarian' },
  { label: 'Vegan', value: 'Vegan' },
  { label: 'Gluten-Free', value: 'Gluten-Free' },
  { label: 'Keto', value: 'Keto' },
  { label: 'Jain', value: 'Jain' },
];
const CUISINE_OPTIONS = [
  { label: '🇮🇳 Indian', value: 'Indian' },
  { label: '🇮🇳 North Indian', value: 'North Indian' },
  { label: '🇮🇳 South Indian', value: 'South Indian' },
  { label: '🇧🇩 Bengali', value: 'Bengali' },
  { label: '🇮🇳 Gujrati', value: 'Gujrati' },
  { label: '🇮🇹 Italian', value: 'Italian' },
  { label: '🇲🇽 Mexican', value: 'Mexican' },
];

export default function HomeScreen() {
  const router = useRouter();
  
  // Ingredients
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  // Exclude Ingredients
  const [exclude, setExclude] = useState('');
  const [excludes, setExcludes] = useState<string[]>([]);
  // Spice Level
  const [spiceLevel, setSpiceLevel] = useState('Medium');
  // Servings
  const [servings, setServings] = useState(4);
  // Dietary
  const [dietary, setDietary] = useState(null);
  const [dietaryOpen, setDietaryOpen] = useState(false);
  const [dietaryItems, setDietaryItems] = useState(DIETARY_OPTIONS);
  // Cuisine
  const [cuisine, setCuisine] = useState(null);
  const [cuisineOpen, setCuisineOpen] = useState(false);
  const [cuisineItems, setCuisineItems] = useState(CUISINE_OPTIONS);
  const [loading, setLoading] = useState(false);

  const addIngredient = () => {
    if (ingredient.trim()) {
      setIngredients([...ingredients, ingredient.trim()]);
      setIngredient('');
    }
  };
  const removeIngredient = (index: number) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };
  const addExclude = () => {
    if (exclude.trim()) {
      setExcludes([...excludes, exclude.trim()]);
      setExclude('');
    }
  };
  const removeExclude = (index: number) => {
    setExcludes(excludes.filter((_, i) => i !== index));
  };
  const handleGenerate = () => {
    router.push({ pathname: '/LoadingRecipe' as any });
  };

  const ButtonComponent = Platform.OS === 'android' ? TouchableNativeFeedback : TouchableOpacity;

  return (
    <LinearGradient colors={["#fffef9", "#ffe8d6"]} style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}}>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
          <View style={styles.headerSection}>
            {/* Remove emoji gradient and emoji */}
            <ChefBro width={180} height={180} style={styles.chefSvg} />
            <Text style={styles.heading}>Welcome to Cravebuster</Text>
            <Text style={styles.subheading}>
              Find the perfect recipe based on what you have and your preferences!
            </Text>
          </View>
          {/* What's in your Refrigerator Section */}
          <View style={styles.formSection}>
            <Text style={styles.fridgeLabel}>What's in your Refrigerator?</Text>
            <View style={styles.fridgeInputRow}>
              <TextInput
                style={styles.fridgeInput}
                placeholder="e.g., eggs, tomatoes"
                placeholderTextColor="#9CA3AF"
                value={ingredient}
                onChangeText={setIngredient}
                onSubmitEditing={addIngredient}
                returnKeyType="done"
              />
            </View>
            <View style={styles.addBtnRow}>
              <TouchableOpacity style={styles.fridgeAddBtn} onPress={addIngredient} activeOpacity={0.85}>
                <Text style={styles.fridgeAddBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ingredientList}>
              {ingredients.map((item, idx) => (
                <View key={idx} style={styles.ingredientPill}>
                  <Text style={styles.ingredientPillText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeIngredient(idx)}>
                    <Text style={styles.removeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          {/* Exclude Ingredients Section */}
          <View style={styles.formSection}>
            <Text style={styles.fridgeLabel}>Exclude Ingredients (Allergies / Dislikes)</Text>
            <View style={styles.fridgeInputRow}>
              <TextInput
                style={styles.fridgeInput}
                placeholder="e.g., nuts, dairy, mushrooms"
                placeholderTextColor="#9CA3AF"
                value={exclude}
                onChangeText={setExclude}
                onSubmitEditing={addExclude}
                returnKeyType="done"
              />
            </View>
            <View style={styles.addBtnRow}>
              <TouchableOpacity style={styles.fridgeAddBtn} onPress={addExclude} activeOpacity={0.85}>
                <Text style={styles.fridgeAddBtnText}>Add</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.ingredientList}>
              {excludes.map((item, idx) => (
                <View key={idx} style={styles.ingredientPill}>
                  <Text style={styles.ingredientPillText}>{item}</Text>
                  <TouchableOpacity onPress={() => removeExclude(idx)}>
                    <Text style={styles.removeBtn}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          </View>
          {/* Spice Level Section */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Spice Level</Text>
            <View style={styles.spiceToggleRow}>
              {SPICE_LEVELS.map(level => {
                const selected = spiceLevel === level.value;
                return (
                  <TouchableOpacity
                    key={level.value}
                    style={[styles.spicePill, selected && styles.spicePillSelected]}
                    onPress={() => setSpiceLevel(level.value)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.spicePillText, selected && styles.spicePillTextSelected]}>
                      {level.emoji} {level.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* Servings */}
          <View style={styles.formSection}>
            <View style={styles.servingsLabelRow}>
              <Text style={styles.servingsEmoji}>👨‍🍳</Text>
              <Text style={styles.servingsLabel}>
                Number of Servings
              </Text>
              <Text style={styles.servingsValue}>{servings}</Text>
            </View>
            <Slider
              style={styles.servingsSlider}
              minimumValue={4}
              maximumValue={10}
              step={1}
              value={servings}
              onValueChange={setServings}
              minimumTrackTintColor="#FF6B6B"
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor="#FF6B6B"
            />
          </View>
          {/* Dietary Restrictions Section */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Dietary Restrictions</Text>
            <DropDownPicker
              open={dietaryOpen}
              value={dietary}
              items={dietaryItems}
              setOpen={setDietaryOpen}
              setValue={setDietary}
              setItems={setDietaryItems}
              placeholder="Select restrictions"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={styles.dropdownContainer}
              ArrowDownIconComponent={() => <Text style={styles.dropdownChevron}>▼</Text>}
              zIndex={2000}
              zIndexInverse={1000}
              listMode="SCROLLVIEW"
            />
          </View>
          {/* Cuisine Section */}
          <View style={styles.formSection}>
            <Text style={styles.label}>Cuisine</Text>
            <DropDownPicker
              open={cuisineOpen}
              value={cuisine}
              items={cuisineItems}
              setOpen={setCuisineOpen}
              setValue={setCuisine}
              setItems={setCuisineItems}
              placeholder="e.g., Italian, Indian, Mexican"
              style={styles.dropdown}
              textStyle={styles.dropdownText}
              dropDownContainerStyle={styles.dropdownContainer}
              ArrowDownIconComponent={() => <Text style={styles.dropdownChevron}>▼</Text>}
              zIndex={1000}
              zIndexInverse={2000}
              listMode="SCROLLVIEW"
            />
          </View>
          {/* Generate Button */}
          <View style={styles.formSection}>
            <RNView style={styles.generateBtnWrapper}>
              <ButtonComponent onPress={handleGenerate} background={Platform.OS === 'android' ? TouchableNativeFeedback.Ripple('#fff', false) : undefined} activeOpacity={0.85}>
                <LinearGradient colors={["#FF6B6B", "#FFA07A"]} style={styles.generateBtn} start={{x:0, y:0}} end={{x:1, y:0}}>
                  <Text style={styles.generateBtnText}>✨  Generate Recipe</Text>
                </LinearGradient>
              </ButtonComponent>
            </RNView>
    </View>
        </ScrollView>
        {loading && (
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255,255,255,0.85)',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}>
            <Image
              source={require('../assets/UniqueRecipe.gif')}
              style={{ width: 180, height: 180 }}
              resizeMode="contain"
            />
            <Text style={{ marginTop: 16, fontSize: 18, color: '#FF6B6B', fontWeight: 'bold' }}>Generating your unique recipe...</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingBottom: 32,
    paddingHorizontal: 0,
  },
  headerSection: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
    // Responsive top margin for notch and larger screens
    paddingTop: Platform.OS === 'ios' ? (StatusBar.currentHeight ? StatusBar.currentHeight + 24 : 44) : 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  chefSvg: {
    alignSelf: 'center',
    marginBottom: 8,
  },
  heading: {
    fontSize: 26,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
    // fontFamily: 'Poppins', // Uncomment when custom font is loaded
  },
  subheading: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    textAlign: 'center',
    paddingHorizontal: 24,
    marginBottom: 0,
    // fontFamily: 'Poppins', // Uncomment when custom font is loaded
  },
  formSection: {
    width: '100%',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
    backgroundColor: '#fafafa',
  },
  ingredientList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  removeBtn: {
    color: '#d00',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  radioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#007AFF',
    marginRight: 8,
    backgroundColor: '#fff',
  },
  radioCircleSelected: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  radioLabel: {
    fontSize: 16,
  },
  pickerWrapper: {
    borderWidth: Platform.OS === 'android' ? 1 : 0,
    borderColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  picker: {
    width: '100%',
    height: 44,
  },
  pickerItem: {
    fontSize: 16,
  },
  // --- Fridge Section Styles ---
  fridgeLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#444444',
  },
  fridgeInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  fridgeInput: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginRight: 8,
    fontSize: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 0,
  },
  addBtnRow: {
    flexDirection: 'row',
    marginBottom: 8,
    marginTop: 2,
  },
  fridgeAddBtn: {
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#FF6B6B',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  fridgeAddBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  ingredientPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEBE9',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  ingredientPillText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 15,
    marginRight: 4,
  },
  spiceToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
    marginBottom: 4,
    width: '100%',
  },
  spicePill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 0,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginHorizontal: 6,
    justifyContent: 'center',
    minWidth: 0,
  },
  spicePillSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  spicePillText: {
    color: '#888',
    fontWeight: '500',
    fontSize: 16,
  },
  spicePillTextSelected: {
    color: '#fff',
    fontWeight: '600',
  },
  servingsLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    width: '100%',
    justifyContent: 'flex-start',
  },
  servingsEmoji: {
    fontSize: 22,
    marginRight: 8,
  },
  servingsLabel: {
    fontWeight: '500',
    color: '#333',
    fontSize: 16,
    marginRight: 8,
  },
  servingsValue: {
    fontWeight: '700',
    color: '#FF6B6B',
    fontSize: 18,
    marginLeft: 'auto',
  },
  servingsSlider: {
    width: '100%',
    height: 40,
  },
  dropdown: {
    backgroundColor: '#F3F3F3',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    minHeight: 48,
  },
  dropdownText: {
    color: '#444',
    fontSize: 16,
  },
  dropdownContainer: {
    backgroundColor: '#F3F3F3',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  dropdownChevron: {
    color: '#6B7280',
    fontSize: 18,
    marginRight: 8,
  },
  generateBtnWrapper: {
    width: '100%',
    borderRadius: 12,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    marginTop: 8,
    marginBottom: 8,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 4,
  },
  generateBtn: {
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  generateBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
});
