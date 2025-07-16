import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';

export default function QuizTypesScreen({ route, navigation }) {
  const { category } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const quizTypes = [
    { id: '1', name: 'Quick Quiz' },
    { id: '2', name: 'Challenge Mode' },
    { id: '3', name: 'Timed Quiz' },
  ];

  const handleQuizTypeSelect = (type) => {
    navigation.navigate('QuizScreen', {
      category,
      type,
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>{category.name}</Text>
      <Text style={styles.subtitle}>Choose Your Quiz Mode</Text>

      {quizTypes.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          style={styles.card}
          onPress={() => handleQuizTypeSelect(quiz.name)}
        >
          <Text style={styles.cardText}>{quiz.name}</Text>
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
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    color: '#1a237e',
    fontWeight: '600',
  },
});