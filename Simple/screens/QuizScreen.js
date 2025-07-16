import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
  ActivityIndicator,
} from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { category, type } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  const modeKey = type.toLowerCase().replace(/\s/g, '');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const categoryMap = {
          'General Knowledge': 'general_knowledge',
          'Science & Technology': 'science_technology',
          'History': 'history',
          'Sports': 'sports',
          'Movies & Entertainment': 'movies_entertainment',
          'Geography': 'geography',
          'Current Affairs': 'current_affairs',
        };

        const tableName = categoryMap[category.name];
        const response = await fetch(`http://10.0.2.2:3000/questions/general_knowledge/quick`);
        const data = await response.json();
        console.log('Fetched questions:', data);
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (selectedOptionKey) => {
    const current = questions[currentIndex];
    if (selectedOptionKey === current.correct_answer) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      navigation.navigate('ResultsScreen', {
        score: selectedOptionKey === current.correct_answer ? score + 1 : score,
        total: questions.length,
        category,
        type,
      });
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#ff6f00" />
        <Text style={{ marginTop: 10, color: '#777' }}>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center', color: '#777' }}>No questions available for this category.</Text>
      </View>
    );
  }

  const current = questions[currentIndex];

  const options = [
    { key: 'A', text: current.option_a },
    { key: 'B', text: current.option_b },
    { key: 'C', text: current.option_c },
    { key: 'D', text: current.option_d },
  ];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>{category.name} - {type}</Text>
      <Text style={styles.question}>{current.question}</Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={styles.option}
          onPress={() => handleAnswer(option.key)}
        >
          <Text style={styles.optionText}>{option.key}. {option.text}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.progress}>
        Question {currentIndex + 1} of {questions.length}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
    color: '#333',
  },
  option: {
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  optionText: {
    fontSize: 14,
    color: '#1a237e',
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
    color: '#777',
  },
});