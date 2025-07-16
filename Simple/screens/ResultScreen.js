import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';

export default function ResultsScreen({ route, navigation }) {
  const { score, total, category, type } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const percentage = ((score / total) * 100).toFixed(0);
  const message =
    percentage >= 80
      ? 'Excellent!'
      : percentage >= 50
      ? 'Good job!'
      : 'Keep practicing!';

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Results</Text>
      <Text style={styles.subtitle}>{category.name} - {type}</Text>
      <Text style={styles.score}>You scored {score} out of {total}</Text>
      <Text style={styles.message}>{message}</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Categories')}
      >
        <Text style={styles.buttonText}>Back to Categories</Text>
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
    color: '#1a237e',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  message: {
    fontSize: 16,
    color: '#777',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#ff6f00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    color: '#1a237e',
    fontWeight: 'bold',
  },
});