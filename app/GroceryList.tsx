import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Groceries from '../assets/Groceries.svg';

export default function GroceryListScreen() {
  const router = useRouter();
  const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

  // Mock grocery data organized by categories
  const groceries = {
    "Proteins": [
      { name: "Greek Yogurt", quantity: "2 containers", category: "Dairy" },
      { name: "Chicken Breast", quantity: "2 lbs", category: "Meat" },
      { name: "Salmon Fillets", quantity: "4 pieces", category: "Seafood" },
      { name: "Eggs", quantity: "1 dozen", category: "Dairy" },
      { name: "Turkey Slices", quantity: "1 lb", category: "Meat" },
      { name: "Ground Beef", quantity: "1 lb", category: "Meat" },
      { name: "Cod Fillets", quantity: "4 pieces", category: "Seafood" },
      { name: "Lentils", quantity: "1 bag", category: "Legumes" },
      { name: "Pork Tenderloin", quantity: "1.5 lbs", category: "Meat" },
      { name: "Lamb Chops", quantity: "8 pieces", category: "Meat" }
    ],
    "Vegetables & Fruits": [
      { name: "Mixed Berries", quantity: "2 cups", category: "Fruits" },
      { name: "Avocados", quantity: "4 pieces", category: "Vegetables" },
      { name: "Mixed Salad Greens", quantity: "2 bags", category: "Vegetables" },
      { name: "Bell Peppers", quantity: "6 pieces", category: "Vegetables" },
      { name: "Sweet Potatoes", quantity: "4 pieces", category: "Vegetables" },
      { name: "Bananas", quantity: "6 pieces", category: "Fruits" },
      { name: "Apples", quantity: "4 pieces", category: "Fruits" },
      { name: "Broccoli", quantity: "2 heads", category: "Vegetables" },
      { name: "Carrots", quantity: "1 bag", category: "Vegetables" },
      { name: "Spinach", quantity: "1 bag", category: "Vegetables" }
    ],
    "Grains & Carbs": [
      { name: "Quinoa", quantity: "2 cups", category: "Grains" },
      { name: "Brown Rice", quantity: "2 cups", category: "Grains" },
      { name: "Whole Grain Bread", quantity: "1 loaf", category: "Bakery" },
      { name: "Oats", quantity: "1 container", category: "Grains" },
      { name: "Whole Wheat Tortillas", quantity: "1 pack", category: "Bakery" },
      { name: "Pasta", quantity: "1 box", category: "Grains" }
    ],
    "Pantry Items": [
      { name: "Almond Butter", quantity: "1 jar", category: "Nuts/Seeds" },
      { name: "Mixed Nuts", quantity: "1 bag", category: "Nuts/Seeds" },
      { name: "Olive Oil", quantity: "1 bottle", category: "Oils" },
      { name: "Marinara Sauce", quantity: "1 jar", category: "Sauces" },
      { name: "Coconut Milk", quantity: "2 cans", category: "Canned Goods" },
      { name: "Protein Bars", quantity: "1 box", category: "Snacks" },
      { name: "Trail Mix", quantity: "1 bag", category: "Snacks" },
      { name: "Dark Chocolate", quantity: "1 bar", category: "Snacks" }
    ]
  };

  const toggleItemCheck = (itemName: string) => {
    setCheckedItems(prev => ({
      ...prev,
      [itemName]: !prev[itemName]
    }));
  };

  const handleExportList = () => {
    // Handle export functionality
    console.log('Export grocery list');
  };

  const getTotalItems = () => {
    return Object.values(groceries).reduce((total, items) => total + items.length, 0);
  };

  const getCheckedItems = () => {
    return Object.keys(checkedItems).filter(key => checkedItems[key]).length;
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
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Text style={styles.backButtonText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Grocery List</Text>
              <TouchableOpacity style={styles.exportButton} onPress={handleExportList}>
                <Text style={styles.exportButtonText}>Export</Text>
              </TouchableOpacity>
            </View>
            {/* SVG below the heading and above Shopping Progress */}
            <Groceries width={160} height={160} style={{ alignSelf: 'center', marginBottom: 8, marginTop: 8 }} />
            {/* Progress Summary */}
            <View style={styles.progressCard}>
              <Text style={styles.progressTitle}>Shopping Progress</Text>
              <Text style={styles.progressText}>
                {getCheckedItems()} of {getTotalItems()} items completed
              </Text>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${(getCheckedItems() / getTotalItems()) * 100}%` }
                  ]} 
                />
              </View>
            </View>

            {/* Grocery Categories */}
            {Object.entries(groceries).map(([category, items]) => (
              <View key={category} style={styles.categorySection}>
                <View style={styles.categoryHeader}>
                  <Text style={styles.categoryTitle}>{category}</Text>
                  <Text style={styles.categoryCount}>
                    {items.filter(item => checkedItems[item.name]).length}/{items.length}
                  </Text>
                </View>
                
                {items.map((item, index) => (
                  <TouchableOpacity
                    key={`${category}-${index}`}
                    style={[
                      styles.groceryItem,
                      checkedItems[item.name] && styles.groceryItemChecked
                    ]}
                    onPress={() => toggleItemCheck(item.name)}
                  >
                    <View style={styles.itemLeft}>
                      <View style={[
                        styles.checkbox,
                        checkedItems[item.name] && styles.checkboxChecked
                      ]}>
                        {checkedItems[item.name] && (
                          <Text style={styles.checkmark}>✓</Text>
                        )}
                      </View>
                      <View style={styles.itemDetails}>
                        <Text style={[
                          styles.itemName,
                          checkedItems[item.name] && styles.itemNameChecked
                        ]}>
                          {item.name}
                        </Text>
                        <Text style={styles.itemQuantity}>{item.quantity}</Text>
                      </View>
                    </View>
                    <Text style={styles.itemCategory}>{item.category}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ))}

            {/* Shopping Tips */}
            <View style={styles.tipsCard}>
              <Text style={styles.tipsTitle}>💡 Shopping Tips</Text>
              <Text style={styles.tipsText}>
                • Shop the perimeter first for fresh produce and proteins{'\n'}
                • Check if you already have pantry items at home{'\n'}
                • Consider buying proteins in bulk and freezing{'\n'}
                • Look for seasonal produce for better prices
              </Text>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  exportButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  exportButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 16,
    color: '#6B7280',
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 4,
  },
  categorySection: {
    marginBottom: 24,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  categoryCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
    backgroundColor: '#F0FDF4',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
  },
  groceryItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  groceryItemChecked: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemNameChecked: {
    textDecorationLine: 'line-through',
    color: '#9CA3AF',
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6B7280',
  },
  itemCategory: {
    fontSize: 12,
    color: '#9CA3AF',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  tipsCard: {
    backgroundColor: '#FEF3C7',
    padding: 20,
    borderRadius: 12,
    marginTop: 8,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#92400E',
    marginBottom: 12,
  },
  tipsText: {
    fontSize: 14,
    color: '#92400E',
    lineHeight: 20,
  },
});
