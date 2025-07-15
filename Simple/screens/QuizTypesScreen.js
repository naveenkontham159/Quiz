import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function QuizTypesScreen({ route, navigation }) {
  const { category } = route.params;

  const quizTypes = [
    { id: '1', name: 'Quick Quiz' },
    { id: '2', name: 'Challenge Mode' },
    { id: '3', name: 'Timed Quiz' },
  ];

  const handleQuizTypeSelect = (type) => {
    // You can navigate to QuizScreen and pass both category and type
    navigation.navigate('QuizScreen', { category, type });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{category.name} - Choose Quiz Type</Text>
      {quizTypes.map((type) => (
        <TouchableOpacity
          key={type.id}
          style={styles.card}
          onPress={() => handleQuizTypeSelect(type.name)}
        >
          <Text style={styles.cardText}>{type.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
  },
  cardText: {
    fontSize: 16,
    color: '#1a237e',
    textAlign: 'center',
  },
});