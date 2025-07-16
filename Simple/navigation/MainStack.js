import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CategoriesScreen from '../screens/CategoriesScreen';
import QuizTypesScreen from '../screens/QuizTypesScreen';
import QuizScreen from '../screens/QuizScreen'; // if you have it


const Stack = createNativeStackNavigator();

export default function MainStack() {
  return (
    <Stack.Navigator initialRouteName="Categories">
      <Stack.Screen name="Categories" component={CategoriesScreen} />
      <Stack.Screen name="QuizTypes" component={QuizTypesScreen} />
      <Stack.Screen name="QuizScreen" component={QuizScreen} />
      
    </Stack.Navigator>
  );
}