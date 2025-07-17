import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { ThemeContext } from '../Features/ThemeContext'; // adjust path if needed

export default function QuizTypesScreen({ route, navigation }) {
  const { category } = route.params;
  const { isDarkMode } = useContext(ThemeContext);

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

  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
  const textColor = isDarkMode ? '#fff' : '#1a237e';
  const subtitleColor = isDarkMode ? '#ccc' : '#555';
  const cardBackground = isDarkMode ? '#1e1e1e' : '#fff';
  const cardTextColor = isDarkMode ? '#fff' : '#1a237e';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: textColor }]}>{category.name}</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        Choose Your Quiz Mode
      </Text>

      {quizTypes.map((quiz) => (
        <TouchableOpacity
          key={quiz.id}
          style={[styles.card, { backgroundColor: cardBackground }]}
          onPress={() => handleQuizTypeSelect(quiz.name)}
          activeOpacity={0.85}
        >
          <Text style={[styles.cardText, { color: cardTextColor }]}>
            {quiz.name}
          </Text>
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
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    padding: 16,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    alignItems: 'center',
  },
  cardText: {
    fontSize: 16,
    fontWeight: '600',
  },
});