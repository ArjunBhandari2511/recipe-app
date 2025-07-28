import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { useRef, useState } from 'react';
import { Animated, Platform, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ChefMeal from '../assets/Chef-Meal.svg';

export default function MealPlannerScreen() {
  const [currentStage, setCurrentStage] = useState(1);
  
  // Animation values for time pickers
  const wakeTimePickerAnimation = useRef(new Animated.Value(0)).current;
  const sleepTimePickerAnimation = useRef(new Animated.Value(0)).current;
  
  // Helper function to format time for display
  const formatTimeForDisplay = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const date = new Date();
    date.setHours(hours, minutes);
    
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    };
    
    return date.toLocaleTimeString('en-US', timeOptions);
  };
  
  // Helper function to get AM/PM
  const getAMPM = (timeString: string) => {
    const [hours] = timeString.split(':').map(Number);
    return hours >= 12 ? 'PM' : 'AM';
  };
  
  // Helper function to get 12-hour format
  const get12HourFormat = (timeString: string) => {
    const [hours, minutes] = timeString.split(':').map(Number);
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours}:${minutes.toString().padStart(2, '0')}`;
  };
  
  // Animation functions for time pickers
  const animateTimePicker = (animation: Animated.Value, show: boolean) => {
    Animated.timing(animation, {
      toValue: show ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  
  // Helper function to get selected activity option
  const getSelectedActivityOption = () => {
    return activityOptions.find(option => option.value === stage2Data.activityLevel);
  };

  // Stage 1 form data
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    age: '',
    weight: '',
    height: '',
    goal: '',
    targetWeight: '',
  });

  // Stage 2 form data
  const [stage2Data, setStage2Data] = useState({
    wakeUpTime: '07:00',
    sleepTime: '22:00',
    intermittentFasting: false,
    activityLevel: '',
    mealsPerDay: '',
  });

  // Stage 3 form data
  const [stage3Data, setStage3Data] = useState({
    dietaryPreferences: [] as string[],
    allergies: [] as string[],
    dislikedFoods: [] as string[],
    preferredCuisines: [] as string[],
  });

  // Stage 4 form data
  const [stage4Data, setStage4Data] = useState({
    currentCalorieIntake: '',
    targetCalorieLimit: '',
    trackMacros: false,
    carbsPercentage: 40,
    proteinPercentage: 30,
    fatsPercentage: 30,
  } as {
    currentCalorieIntake: string;
    targetCalorieLimit: string;
    trackMacros: boolean;
    carbsPercentage: number;
    proteinPercentage: number;
    fatsPercentage: number;
  });

  // Stage 5 form data
  const [stage5Data, setStage5Data] = useState({
    includeSnacks: false,
    mealSource: '',
    quickRecipes: false,
  });

  // Stage 6 form data
  const [stage6Data, setStage6Data] = useState({
    medicalConditions: [] as string[],
    onMedication: false,
    medicationDetails: '',
    religiousFasting: false,
    fastingDetails: '',
  });

  // Stage 7 form data
  const [stage7Notes, setStage7Notes] = useState('');

  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [showGoalDropdown, setShowGoalDropdown] = useState(false);
  const [showActivityDropdown, setShowActivityDropdown] = useState(false);
  const [showMealsDropdown, setShowMealsDropdown] = useState(false);
  const [showWakeTimePicker, setShowWakeTimePicker] = useState(false);
  const [showSleepTimePicker, setShowSleepTimePicker] = useState(false);
  const [showMealSourceDropdown, setShowMealSourceDropdown] = useState(false);
  const [dislikedFoodInput, setDislikedFoodInput] = useState('');

  const genderOptions = ['Male', 'Female', 'Prefer Not to Say'];
  const goalOptions = ['Weight Loss', 'Maintain Weight', 'Weight Gain'];
  const activityOptions = [
    { icon: '🛋️', label: 'Sedentary (desk job)', value: 'Sedentary (desk job)' },
    { icon: '🚶', label: 'Lightly Active', value: 'Lightly Active' },
    { icon: '🏃', label: 'Moderately Active', value: 'Moderately Active' },
    { icon: '💪', label: 'Very Active', value: 'Very Active' },
    { icon: '🔥', label: 'Extra Active', value: 'Extra Active' }
  ];
  const mealsOptions = ['2 Meals', '3 Meals', '4 Meals'];
  const dietaryOptions = ['Vegetarian', 'Vegan', 'Eggetarian', 'Keto', 'Gluten-Free', 'Dairy-Free', 'Jain'];
  const allergyOptions = ['Nuts', 'Dairy', 'Gluten', 'Soy', 'Eggs', 'Seafood'];
  const cuisineOptions = ['Indian', 'South Indian', 'North Indian', 'Continental', 'Italian', 'Chinese'];
  const mealSourceOptions = ['Cook', 'Order', 'Mix of Both'];

  const medicalConditionOptions = [
    'PCOS/PCOD',
    'Diabetes',
    'Thyroid',
    'High BP',
    'Lactose intolerance',
    'IBS',
  ];

  const handleNext = () => {
    setCurrentStage(currentStage + 1);
  };

  const handleBack = () => {
    setCurrentStage(currentStage - 1);
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const updateStage2Data = (field: string, value: any) => {
    setStage2Data(prev => ({ ...prev, [field]: value }));
  };

  const updateStage3Data = (field: string, value: any) => {
    setStage3Data(prev => ({ ...prev, [field]: value }));
  };

  const toggleCheckbox = (field: string, value: string) => {
    setStage3Data(prev => {
      const currentArray = prev[field as keyof typeof prev] as string[];
      const newArray = currentArray.includes(value)
        ? currentArray.filter(item => item !== value)
        : [...currentArray, value];
      return { ...prev, [field]: newArray };
    });
  };

  const addDislikedFood = () => {
    if (dislikedFoodInput.trim()) {
      updateStage3Data('dislikedFoods', [...stage3Data.dislikedFoods, dislikedFoodInput.trim()]);
      setDislikedFoodInput('');
    }
  };

  const removeDislikedFood = (food: string) => {
    updateStage3Data('dislikedFoods', stage3Data.dislikedFoods.filter(item => item !== food));
  };

  const updateStage4Data = (field: string, value: any) => {
    setStage4Data(prev => ({ ...prev, [field]: value }));
  };

  const updateMacroPercentage = (macro: string, value: number) => {
    setStage4Data(prev => {
      const newData = { ...prev };
      (newData as any)[macro] = value;
      
      // Ensure total equals 100%
      const total = newData.carbsPercentage + newData.proteinPercentage + newData.fatsPercentage;
      if (total !== 100) {
        // Adjust other macros proportionally
        const remaining = 100 - value;
        const otherMacros = macro === 'carbsPercentage' ? ['proteinPercentage', 'fatsPercentage'] :
                           macro === 'proteinPercentage' ? ['carbsPercentage', 'fatsPercentage'] :
                           ['carbsPercentage', 'proteinPercentage'];
        
        const currentOther1 = newData[otherMacros[0] as keyof typeof newData] as number;
        const currentOther2 = newData[otherMacros[1] as keyof typeof newData] as number;
        const totalOther = currentOther1 + currentOther2;
        
        if (totalOther > 0) {
          (newData as any)[otherMacros[0]] = Math.round((currentOther1 / totalOther) * remaining);
          (newData as any)[otherMacros[1]] = Math.round((currentOther2 / totalOther) * remaining);
        } else {
          (newData as any)[otherMacros[0]] = Math.round(remaining / 2);
          (newData as any)[otherMacros[1]] = Math.round(remaining / 2);
        }
      }
      
      return newData;
    });
  };

  const adjustMacro = (macro: string, increment: boolean) => {
    const currentValue = stage4Data[macro as keyof typeof stage4Data] as number;
    const newValue = increment ? Math.min(100, currentValue + 5) : Math.max(0, currentValue - 5);
    updateMacroPercentage(macro, newValue);
  };

  const updateStage5Data = (field: string, value: any) => {
    setStage5Data(prev => ({ ...prev, [field]: value }));
  };

  const updateStage6Data = (field: string, value: any) => {
    setStage6Data(prev => ({ ...prev, [field]: value }));
  };

  const toggleMedicalCondition = (value: string) => {
    setStage6Data(prev => {
      const current = prev.medicalConditions;
      const newArray = current.includes(value)
        ? current.filter(item => item !== value)
        : [...current, value];
      return { ...prev, medicalConditions: newArray };
    });
  };

  const inputIcons: { [key: string]: string } = {
    name: '👤',
    gender: '⚧️',
    age: '🎂',
    weight: '⚖️',
    height: '📏',
    goal: '🎯',
    targetWeight: '🏆',
  };

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const renderStage1 = () => (
    <View style={styles.formContainerImproved}>
      <Text style={styles.formHeading}>Tell us about yourself.</Text>
      {/* Name */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your name?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>👤</Text></View>
          <TextInput
            style={[
              styles.inputWithIcon,
              focusedField === 'name' && styles.inputFocused
            ]}
            placeholder="Enter your name"
            placeholderTextColor="#999"
            value={formData.name}
            onChangeText={(value) => updateFormData('name', value)}
            onFocus={() => setFocusedField('name')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>
      {/* Gender */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your gender?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>⚧️</Text></View>
          <TouchableOpacity
            style={[styles.dropdownButtonImproved, { paddingLeft: 38 }]}
            onPress={() => setShowGenderDropdown(!showGenderDropdown)}
          >
            <Text style={[styles.dropdownTextImproved, !formData.gender && styles.placeholderTextImproved]}>
              {formData.gender || 'Select gender'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showGenderDropdown && (
            <View style={styles.dropdownOptions}>
              {genderOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOption}
                  onPress={() => {
                    updateFormData('gender', option);
                    setShowGenderDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      {/* Age */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your age?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>🎂</Text></View>
          <TextInput
            style={[
              styles.inputWithIcon,
              focusedField === 'age' && styles.inputFocused
            ]}
            placeholder="Enter your age"
            placeholderTextColor="#999"
            value={formData.age}
            onChangeText={(value) => updateFormData('age', value)}
            keyboardType="numeric"
            onFocus={() => setFocusedField('age')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>
      {/* Weight */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your current weight (kg)?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>⚖️</Text></View>
          <TextInput
            style={[
              styles.inputWithIcon,
              focusedField === 'weight' && styles.inputFocused
            ]}
            placeholder="Enter your weight"
            placeholderTextColor="#999"
            value={formData.weight}
            onChangeText={(value) => updateFormData('weight', value)}
            keyboardType="numeric"
            onFocus={() => setFocusedField('weight')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>
      {/* Height */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your height (cm)?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>📏</Text></View>
          <TextInput
            style={[
              styles.inputWithIcon,
              focusedField === 'height' && styles.inputFocused
            ]}
            placeholder="Enter your height"
            placeholderTextColor="#999"
            value={formData.height}
            onChangeText={(value) => updateFormData('height', value)}
            keyboardType="numeric"
            onFocus={() => setFocusedField('height')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>
      {/* Goal */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your goal?</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>🎯</Text></View>
          <TouchableOpacity
            style={[styles.dropdownButtonImproved, { paddingLeft: 38 }]}
            onPress={() => setShowGoalDropdown(!showGoalDropdown)}
          >
            <Text style={[styles.dropdownTextImproved, !formData.goal && styles.placeholderTextImproved]}>
              {formData.goal || 'Select your goal'}
            </Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
          {showGoalDropdown && (
            <View style={styles.dropdownOptions}>
              {goalOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownOption}
                  onPress={() => {
                    updateFormData('goal', option);
                    setShowGoalDropdown(false);
                  }}
                >
                  <Text style={styles.dropdownOptionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>
      {/* Target Weight */}
      <View style={styles.inputSectionImproved}>
        <Text style={styles.labelImproved}>What is your target weight (kg)? (Optional)</Text>
        <View style={{ position: 'relative' }}>
          <View style={styles.inputIconWrapper}><Text style={styles.inputIcon}>🏆</Text></View>
          <TextInput
            style={[
              styles.inputWithIcon,
              focusedField === 'targetWeight' && styles.inputFocused
            ]}
            placeholder="Enter target weight"
            placeholderTextColor="#999"
            value={formData.targetWeight}
            onChangeText={(value) => updateFormData('targetWeight', value)}
            keyboardType="numeric"
            onFocus={() => setFocusedField('targetWeight')}
            onBlur={() => setFocusedField(null)}
          />
        </View>
      </View>
      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} disabled>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage2 = () => (
    <View style={styles.formContainer}>
      <View style={styles.stage2Header}>
        <Text style={styles.stage2Heading}>🕒 Daily Routine & Activity Level</Text>
        <Text style={styles.stage2Subtitle}>We'll use this to tailor your meal timings & calories</Text>
      </View>
      
      <View style={styles.inputSection}>
        <Text style={styles.label}>What time do you usually wake up?</Text>
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => {
            setShowWakeTimePicker(true);
            animateTimePicker(wakeTimePickerAnimation, true);
          }}
        >
          <View style={styles.timeDisplayContainer}>
            <Text style={styles.timeDisplayMain}>{get12HourFormat(stage2Data.wakeUpTime)}</Text>
            <Text style={styles.timeDisplayAMPM}>{getAMPM(stage2Data.wakeUpTime)}</Text>
          </View>
          <Text style={styles.timePickerIcon}>🕐</Text>
        </TouchableOpacity>
        {showWakeTimePicker && (
          <Animated.View
            style={[
              styles.timePickerContainer,
              {
                opacity: wakeTimePickerAnimation,
                transform: [{
                  translateY: wakeTimePickerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  })
                }]
              }
            ]}
          >
            <DateTimePicker
              value={new Date(`2000-01-01T${stage2Data.wakeUpTime}:00`)}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedTime) => {
                setShowWakeTimePicker(false);
                animateTimePicker(wakeTimePickerAnimation, false);
                if (selectedTime) {
                  const hours = selectedTime.getHours().toString().padStart(2, '0');
                  const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                  updateStage2Data('wakeUpTime', `${hours}:${minutes}`);
                }
              }}
            />
          </Animated.View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>What time do you usually go to sleep?</Text>
        <TouchableOpacity
          style={styles.timePickerButton}
          onPress={() => {
            setShowSleepTimePicker(true);
            animateTimePicker(sleepTimePickerAnimation, true);
          }}
        >
          <View style={styles.timeDisplayContainer}>
            <Text style={styles.timeDisplayMain}>{get12HourFormat(stage2Data.sleepTime)}</Text>
            <Text style={styles.timeDisplayAMPM}>{getAMPM(stage2Data.sleepTime)}</Text>
          </View>
          <Text style={styles.timePickerIcon}>🕐</Text>
        </TouchableOpacity>
        {showSleepTimePicker && (
          <Animated.View
            style={[
              styles.timePickerContainer,
              {
                opacity: sleepTimePickerAnimation,
                transform: [{
                  translateY: sleepTimePickerAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-20, 0],
                  })
                }]
              }
            ]}
          >
            <DateTimePicker
              value={new Date(`2000-01-01T${stage2Data.sleepTime}:00`)}
              mode="time"
              is24Hour={false}
              display="default"
              onChange={(event, selectedTime) => {
                setShowSleepTimePicker(false);
                animateTimePicker(sleepTimePickerAnimation, false);
                if (selectedTime) {
                  const hours = selectedTime.getHours().toString().padStart(2, '0');
                  const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
                  updateStage2Data('sleepTime', `${hours}:${minutes}`);
                }
              }}
            />
          </Animated.View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you follow intermittent fasting?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage2Data.intermittentFasting && styles.toggleSwitchActive]}
            onPress={() => updateStage2Data('intermittentFasting', !stage2Data.intermittentFasting)}
          >
            <View style={[styles.toggleThumb, stage2Data.intermittentFasting && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>How active are you daily?</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowActivityDropdown(!showActivityDropdown)}
        >
          {stage2Data.activityLevel ? (
            <View style={styles.dropdownSelectedContainer}>
              <Text style={styles.dropdownSelectedIcon}>
                {getSelectedActivityOption()?.icon}
              </Text>
              <Text style={styles.dropdownText}>
                {getSelectedActivityOption()?.label}
              </Text>
            </View>
          ) : (
            <Text style={[styles.dropdownText, styles.placeholderText]}>
              Select activity level
            </Text>
          )}
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {showActivityDropdown && (
          <View style={styles.dropdownOptions}>
            <ScrollView 
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
              style={{ maxHeight: 160 }}
            >
              {activityOptions.map((option, index) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.dropdownOption,
                    index === activityOptions.length - 1 && styles.dropdownOptionLast
                  ]}
                  onPress={() => {
                    updateStage2Data('activityLevel', option.value);
                    setShowActivityDropdown(false);
                  }}
                >
                  <View style={styles.dropdownOptionContainer}>
                    <Text style={styles.dropdownOptionIcon}>{option.icon}</Text>
                    <Text style={styles.dropdownOptionText}>{option.label}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>How many meals do you prefer per day?</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowMealsDropdown(!showMealsDropdown)}
        >
          <Text style={[styles.dropdownText, !stage2Data.mealsPerDay && styles.placeholderText]}>
            {stage2Data.mealsPerDay || 'Select meals per day'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {showMealsDropdown && (
          <View style={styles.dropdownOptions}>
            {mealsOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => {
                  updateStage2Data('mealsPerDay', option);
                  setShowMealsDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage3 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>Dietary Preferences</Text>
      
      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you have any dietary preferences?</Text>
        <View style={styles.checkboxContainer}>
          {dietaryOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() => toggleCheckbox('dietaryPreferences', option)}
            >
              <View style={[
                styles.checkbox,
                stage3Data.dietaryPreferences.includes(option) && styles.checkboxChecked
              ]}>
                {stage3Data.dietaryPreferences.includes(option) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you have any allergies?</Text>
        <View style={styles.checkboxContainer}>
          {allergyOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() => toggleCheckbox('allergies', option)}
            >
              <View style={[
                styles.checkbox,
                stage3Data.allergies.includes(option) && styles.checkboxChecked
              ]}>
                {stage3Data.allergies.includes(option) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Are there any food you dislike or want to exclude?</Text>
        <View style={styles.dislikedFoodInputContainer}>
          <TextInput
            style={styles.dislikedFoodInput}
            placeholder="Enter food item"
            placeholderTextColor="#9CA3AF"
            value={dislikedFoodInput}
            onChangeText={setDislikedFoodInput}
            onSubmitEditing={addDislikedFood}
          />
          <TouchableOpacity style={styles.addButton} onPress={addDislikedFood}>
            <Text style={styles.addButtonText}>Add</Text>
          </TouchableOpacity>
        </View>
        {stage3Data.dislikedFoods.length > 0 && (
          <View style={styles.foodPillsContainer}>
            {stage3Data.dislikedFoods.map((food, index) => (
              <View key={index} style={styles.foodPill}>
                <Text style={styles.foodPillText}>{food}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeDislikedFood(food)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Any specific cuisine you prefer?</Text>
        <View style={styles.checkboxContainer}>
          {cuisineOptions.map((option) => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() => toggleCheckbox('preferredCuisines', option)}
            >
              <View style={[
                styles.checkbox,
                stage3Data.preferredCuisines.includes(option) && styles.checkboxChecked
              ]}>
                {stage3Data.preferredCuisines.includes(option) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage4 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>Caloric Information</Text>
      
      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you know your current daily calorie intake? (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter calories"
          placeholderTextColor="#9CA3AF"
          value={stage4Data.currentCalorieIntake}
          onChangeText={(value) => updateStage4Data('currentCalorieIntake', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you want to follow a specific calorie limit per day? (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter target calories"
          placeholderTextColor="#9CA3AF"
          value={stage4Data.targetCalorieLimit}
          onChangeText={(value) => updateStage4Data('targetCalorieLimit', value)}
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Track Macros</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage4Data.trackMacros && styles.toggleSwitchActive]}
            onPress={() => updateStage4Data('trackMacros', !stage4Data.trackMacros)}
          >
            <View style={[styles.toggleThumb, stage4Data.trackMacros && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
      </View>

      {stage4Data.trackMacros && (
        <View style={styles.macroSection}>
          <Text style={styles.macroHeading}>Macro Distribution</Text>
          
          <View style={styles.macroSliderContainer}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabel}>Carbohydrates: {stage4Data.carbsPercentage}%</Text>
              <View style={styles.macroControls}>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('carbsPercentage', false)}
                >
                  <Text style={styles.macroButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('carbsPercentage', true)}
                >
                  <Text style={styles.macroButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill, 
                    { width: `${stage4Data.carbsPercentage}%`, backgroundColor: '#FF6B6B' }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.macroSliderContainer}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabel}>Protein: {stage4Data.proteinPercentage}%</Text>
              <View style={styles.macroControls}>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('proteinPercentage', false)}
                >
                  <Text style={styles.macroButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('proteinPercentage', true)}
                >
                  <Text style={styles.macroButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill, 
                    { width: `${stage4Data.proteinPercentage}%`, backgroundColor: '#4CAF50' }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.macroSliderContainer}>
            <View style={styles.macroHeader}>
              <Text style={styles.macroLabel}>Fats: {stage4Data.fatsPercentage}%</Text>
              <View style={styles.macroControls}>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('fatsPercentage', false)}
                >
                  <Text style={styles.macroButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.macroButton} 
                  onPress={() => adjustMacro('fatsPercentage', true)}
                >
                  <Text style={styles.macroButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.sliderContainer}>
              <View style={styles.sliderTrack}>
                <View 
                  style={[
                    styles.sliderFill, 
                    { width: `${stage4Data.fatsPercentage}%`, backgroundColor: '#FFC107' }
                  ]} 
                />
              </View>
            </View>
          </View>

          <View style={styles.macroTotal}>
            <Text style={styles.macroTotalText}>
              Total: {stage4Data.carbsPercentage + stage4Data.proteinPercentage + stage4Data.fatsPercentage}%
            </Text>
          </View>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage5 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>Meal Preferences</Text>
      
      <View style={styles.inputSection}>
        <Text style={styles.label}>Include Snacks?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage5Data.includeSnacks && styles.toggleSwitchActive]}
            onPress={() => updateStage5Data('includeSnacks', !stage5Data.includeSnacks)}
          >
            <View style={[styles.toggleThumb, stage5Data.includeSnacks && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subheading}>Toggle Yes to include snacks in your meal plan</Text>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you cook your own meals or rely on tiffin/delivery?</Text>
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setShowMealSourceDropdown(!showMealSourceDropdown)}
        >
          <Text style={[styles.dropdownText, !stage5Data.mealSource && styles.placeholderText]}>
            {stage5Data.mealSource || 'Select meal source'}
          </Text>
          <Text style={styles.dropdownArrow}>▼</Text>
        </TouchableOpacity>
        {showMealSourceDropdown && (
          <View style={styles.dropdownOptions}>
            {mealSourceOptions.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.dropdownOption}
                onPress={() => {
                  updateStage5Data('mealSource', option);
                  setShowMealSourceDropdown(false);
                }}
              >
                <Text style={styles.dropdownOptionText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Quick recipes only?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage5Data.quickRecipes && styles.toggleSwitchActive]}
            onPress={() => updateStage5Data('quickRecipes', !stage5Data.quickRecipes)}
          >
            <View style={[styles.toggleThumb, stage5Data.quickRecipes && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
        <Text style={styles.subheading}>Toggle Yes for recipes that take under 20 minutes</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage6 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>Medical Conditions (if any)</Text>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Do you have any medical conditions?</Text>
        <View style={styles.checkboxContainer}>
          {medicalConditionOptions.map(option => (
            <TouchableOpacity
              key={option}
              style={styles.checkboxRow}
              onPress={() => toggleMedicalCondition(option)}
            >
              <View style={[
                styles.checkbox,
                stage6Data.medicalConditions.includes(option) && styles.checkboxChecked
              ]}>
                {stage6Data.medicalConditions.includes(option) && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </View>
              <Text style={styles.checkboxLabel}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Are you on any medication?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage6Data.onMedication && styles.toggleSwitchActive]}
            onPress={() => updateStage6Data('onMedication', !stage6Data.onMedication)}
          >
            <View style={[styles.toggleThumb, stage6Data.onMedication && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
        {stage6Data.onMedication && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Medication Details :</Text>
            <TextInput
              style={styles.input}
              placeholder="Medication Details (optional)"
              placeholderTextColor="#9CA3AF"
              value={stage6Data.medicationDetails}
              onChangeText={text => updateStage6Data('medicationDetails', text)}
            />
          </View>
        )}
      </View>

      <View style={styles.inputSection}>
        <Text style={styles.label}>Religious Fasting Days?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleSwitch, stage6Data.religiousFasting && styles.toggleSwitchActive]}
            onPress={() => updateStage6Data('religiousFasting', !stage6Data.religiousFasting)}
          >
            <View style={[styles.toggleThumb, stage6Data.religiousFasting && styles.toggleThumbActive]} />
          </TouchableOpacity>
        </View>
        {stage6Data.religiousFasting && (
          <View style={{ marginTop: 12 }}>
            <Text style={styles.label}>Fasting Details :</Text>
            <TextInput
              style={styles.input}
              placeholder="Fasting Details"
              placeholderTextColor="#9CA3AF"
              value={stage6Data.fastingDetails}
              onChangeText={text => updateStage6Data('fastingDetails', text)}
            />
          </View>
        )}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderStage7 = () => (
    <View style={styles.formContainer}>
      <Text style={styles.formHeading}>Additional Notes</Text>
      <Text style={styles.subheading}>Share any other details that might help us customize your meal plan</Text>
      <View style={styles.inputSection}>
        <Text style={styles.label}>Notes</Text>
        <TextInput
          style={[styles.input, { minHeight: 80, textAlignVertical: 'top' }]}
          placeholder="Type your notes here..."
          placeholderTextColor="#9CA3AF"
          value={stage7Notes}
          onChangeText={setStage7Notes}
          multiline
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.backButton]} onPress={handleBack}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => {/* handle generate plan here */}}>
          <Text style={styles.buttonText}>Generate Plan</Text>
        </TouchableOpacity>
      </View>
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
            <View style={styles.headerSafeArea}>
              <ChefMeal width={160} height={160} style={styles.chefSvg} />
              <Text style={styles.heading}>Plan Your Meals</Text>
              <Text style={styles.subheading}>Create a Weekly Meal Plan</Text>
            </View>
            
            {currentStage === 1 && renderStage1()}
            {currentStage === 2 && renderStage2()}
            {currentStage === 3 && renderStage3()}
            {currentStage === 4 && renderStage4()}
            {currentStage === 5 && renderStage5()}
            {currentStage === 6 && renderStage6()}
            {currentStage === 7 && renderStage7()}
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
  scrollContainer: {
    flexGrow: 1,
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
  formContainer: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  formContainerImproved: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f9f9f9', // Soft background
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputSection: {
    marginBottom: 15,
  },
  inputSectionImproved: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  labelImproved: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
  },
  inputFocused: {
    borderColor: '#FF6B6B',
    borderWidth: 2,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    marginBottom: 0,
    borderWidth: 0,
    padding: 0,
  },
  inputIcon: {
    fontSize: 20,
    color: '#6B7280',
    marginLeft: 4,
    marginRight: 4,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#fff',
    minHeight: 56,
  },
  dropdownButtonImproved: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    backgroundColor: '#F9FAFB',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownTextImproved: {
    fontSize: 16,
    color: '#333',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  placeholderTextImproved: {
    color: '#999',
  },
  dropdownArrow: {
    fontSize: 16,
    color: '#6B7280',
  },
  dropdownOptions: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    marginTop: 8,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dropdownOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  dropdownOptionLast: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 0,
  },
  dropdownOptionText: {
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
    backgroundColor: '#FF6B6B',
  },
  backButton: {
    backgroundColor: '#E5E7EB',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  backButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  timePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    backgroundColor: '#F9FAFB',
    minHeight: 60,
  },
  timePickerText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  timePickerIcon: {
    fontSize: 18,
  },
  toggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleSwitch: {
    width: 51,
    height: 31,
    backgroundColor: '#E5E7EB',
    borderRadius: 16,
    padding: 2,
    justifyContent: 'center',
  },
  toggleSwitchActive: {
    backgroundColor: '#FF6B6B',
  },
  toggleThumb: {
    width: 27,
    height: 27,
    backgroundColor: '#fff',
    borderRadius: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    transform: [{ translateX: 0 }],
  },
  toggleThumbActive: {
    transform: [{ translateX: 20 }],
  },
  toggleLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginLeft: 12,
  },
  checkboxContainer: {
    marginTop: 8,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  checkboxChecked: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF6B6B',
  },
  checkmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  dislikedFoodInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  dislikedFoodInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  foodPillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  foodPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  foodPillText: {
    fontSize: 14,
    color: '#333',
    marginRight: 8,
  },
  removeButton: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#EF4444',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  macroSection: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  macroHeading: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  macroSliderContainer: {
    marginBottom: 20,
  },
  macroLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  sliderContainer: {
    position: 'relative',
    height: 40,
    justifyContent: 'center',
  },
  sliderTrack: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    position: 'relative',
  },
  sliderFill: {
    height: '100%',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  sliderThumb: {
    width: 20,
    height: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    position: 'absolute',
    top: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  macroTotal: {
    alignItems: 'center',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  macroTotalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  macroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  macroControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  macroButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FF6B6B',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  macroButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  inputIconWrapper: {
    position: 'absolute',
    left: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    zIndex: 2,
  },
  inputWithIcon: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    backgroundColor: '#fff',
    marginLeft: 0,
    paddingLeft: 38,
  },
  stage2Header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stage2Heading: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  stage2Subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    lineHeight: 22,
  },
  timePickerContainer: {
    marginTop: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    alignItems: 'center',
  },
  timeDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  timeDisplayMain: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  timeDisplayAMPM: {
    fontSize: 18,
    color: '#6B7280',
    marginLeft: 4,
  },
  dropdownSelectedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownSelectedIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  dropdownOptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownOptionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
}); 