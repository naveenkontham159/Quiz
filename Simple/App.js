import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from './screens/HomeScreen'; // ✅ Add this
import CategoriesScreen from './screens/CategoriesScreen';
import QuizTypesScreen from './screens/QuizTypesScreen';
import QuizScreen from './screens/QuizScreen';
import ResultsScreen from './screens/ResultsScreen';

// Theme
import { ThemeProvider } from './Features/ThemeContext'; // ✅ Wrap app with this

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Categories"
            component={CategoriesScreen}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="QuizTypes"
            component={QuizTypesScreen}
            options={({ route }) => ({
              title: route.params?.category?.name || 'Quiz Types',
            })}
          />
          <Stack.Screen
            name="QuizScreen"
            component={QuizScreen}
            options={({ route }) => ({
              title: `${route.params?.type || 'Quiz'} - ${route.params?.category?.name || ''}`,
            })}
          />
          <Stack.Screen
            name="ResultsScreen"
            component={ResultsScreen}
            options={{ title: 'Your Results' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}