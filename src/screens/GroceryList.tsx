import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GroceryListScreen = () => {
    const navigation = useNavigation();

    // Mock data - Replace with real data
    const groceryItems = [
        'Tomatoes', 'Chicken Breast', 'Olive Oil', 'Spinach', 'Quinoa',
        'Almonds', 'Eggs', 'Black Beans', 'Milk', 'Bread'
    ];

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Grocery List</Text>
            {groceryItems.map((item, index) => (
                <Text key={index} style={styles.item}>{item}</Text>
            ))}
            <Button
                title="Back to Meal Plan"
                onPress={() => navigation.goBack()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        fontSize: 18,
        marginVertical: 5,
    },
});

export default GroceryListScreen;

