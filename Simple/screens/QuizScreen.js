import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  useColorScheme,
} from 'react-native';

export default function QuizScreen({ route, navigation }) {
  const { category, type } = route.params;
  const isDarkMode = useColorScheme() === 'dark';

  const dummyQuestions = [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'Delhi', 'Hyderabad', 'Chennai'],
      correct: 'Delhi',
    },
    {
      question: 'Who invented the telephone?',
      options: ['Edison', 'Tesla', 'Bell', 'Newton'],
      correct: 'Bell',
    },
    {
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correct: 'Mars',
    },
    // Add more if needed
  ];

  const questionLimit = type === 'Quick Quiz' ? 10 : type === 'Challenge Mode' ? 20 : 30;

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const selected = dummyQuestions.slice(0, questionLimit);
    setQuestions(selected);
  }, []);

  const handleAnswer = (option) => {
    const current = questions[currentIndex];
    if (option === current.correct) {
      setScore((prev) => prev + 1);
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // Auto-submit when last question is answered
      navigation.navigate('ResultsScreen', {
        score: option === current.correct ? score + 1 : score,
        total: questions.length,
        category,
        type,
      });
    }
  };

  if (questions.length === 0) return <Text>Loading questions...</Text>;

  const current = questions[currentIndex];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>{category.name} - {type}</Text>
      <Text style={styles.question}>{current.question}</Text>

      {current.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => handleAnswer(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
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