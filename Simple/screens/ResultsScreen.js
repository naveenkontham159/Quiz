import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { ThemeContext } from '../Features/ThemeContext'; // adjust path if needed

export default function ResultsScreen({ route, navigation }) {
  const { score, total, category, type } = route.params;
  const { isDarkMode } = useContext(ThemeContext);

  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
  const textColor = isDarkMode ? '#fff' : '#1a237e';
  const subtitleColor = isDarkMode ? '#ccc' : '#555';
  const cardBackground = isDarkMode ? '#1e1e1e' : '#fff';
  const cardTextColor = isDarkMode ? '#fff' : '#1a237e';

  const percentage = ((score / total) * 100).toFixed(0);
  const message =
    percentage >= 80
      ? 'Excellent!'
      : percentage >= 50
      ? 'Good job!'
      : 'Keep practicing!';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: textColor }]}>Results</Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        {category.name} - {type}
      </Text>
      <Text style={[styles.score, { color: textColor }]}>
        You scored {score} out of {total}
      </Text>
      <Text style={[styles.message, { color: subtitleColor }]}>{message}</Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#ff6f00' }]}
        onPress={() => navigation.navigate('Home')} // ✅ changed from 'Categories' to 'Home'
      >
        <Text style={[styles.buttonText, { color: '#1a237e' }]}>
          Back to Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#1a237e' }]}
        onPress={() => navigation.navigate('QuizScreen', { category, type })}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Retry Quiz</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});