import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import QuizTypesScreen from '../screens/QuizTypesScreen';
import QuizScreen from '../screens/QuizScreen'; // if you have it
import ResultsScreen from '../screens/ResultsScreen';
import HomeScreen from '../screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
      <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="QuizTypes" component={QuizTypesScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      <Stack.Screen name="ResultsScreen" component={ResultsScreen} />

    </Stack.Navigator>
  );
}