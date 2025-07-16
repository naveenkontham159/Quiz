import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from './screens/CategoriesScreen'; // adjust path as needed
import QuizTypesScreen from './screens/QuizTypesScreen';   // adjust path as needed
import QuizScreen from './screens/QuizScreen';             // adjust path as needed
import ResultsScreen from './screens/ResultsScreen';
      // optional, if you’ve added it

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Categories">
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{ headerShown: false }}
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
  );
}