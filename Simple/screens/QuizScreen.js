import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { ThemeContext } from '../Features/ThemeContext';

export default function QuizScreen({ route, navigation }) {
  const { category, type } = route.params;
  const { isDarkMode } = useContext(ThemeContext);

  const backgroundColor = isDarkMode ? '#121212' : '#f5f5f5';
  const textColor = isDarkMode ? '#fff' : '#1a237e';
  const questionColor = isDarkMode ? '#ddd' : '#333';
  const cardBackground = isDarkMode ? '#1e1e1e' : '#fff';
  const cardTextColor = isDarkMode ? '#fff' : '#1a237e';
  const progressColor = isDarkMode ? '#aaa' : '#777';

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timer, setTimer] = useState(60); // 1 minute for timed quiz

  const modeMap = {
    'Quick Quiz': 'quick',
    'Challenge Mode': 'challenge',
    'Timed Quiz': 'timed',
  };

  const modeKey = modeMap[type];

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
        const response = await fetch(`http://10.0.2.2:3000/questions/${tableName}/${modeKey}`);
        const data = await response.json();
        setQuestions(data);
        setSelectedAnswers(new Array(data.length).fill(null)); // initialize selections
      } catch (error) {
        console.error('Error fetching questions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  // ⏱ Timer logic for Timed Quiz
  useEffect(() => {
    if (type === 'Timed Quiz' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else if (type === 'Timed Quiz' && timer === 0) {
      handleSubmit();
    }
  }, [timer]);

  const handleAnswer = (selectedKey) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentIndex] = selectedKey;
    setSelectedAnswers(updatedAnswers);
  };

  const goToNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    let finalScore = 0;
    questions.forEach((q, i) => {
      if (selectedAnswers[i] === q.correct_answer) {
        finalScore += 1;
      }
    });

    navigation.navigate('ResultsScreen', {
      score: finalScore,
      total: questions.length,
      category,
      type,
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', backgroundColor }]}>
        <ActivityIndicator size="large" color="#ff6f00" />
        <Text style={{ marginTop: 10, color: progressColor }}>Loading questions...</Text>
      </View>
    );
  }

  if (questions.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={{ textAlign: 'center', color: progressColor }}>
          No questions available for this category.
        </Text>
      </View>
    );
  }

  const current = questions[currentIndex];
  const selectedOption = selectedAnswers[currentIndex];

  const options = [
    { key: 'A', text: current.option_a },
    { key: 'B', text: current.option_b },
    { key: 'C', text: current.option_c },
    { key: 'D', text: current.option_d },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, { color: textColor }]}>
        {category.name} - {type}
      </Text>

      {type === 'Timed Quiz' && (
        <Text style={[styles.timer, { color: '#ff6f00' }]}>
          Time Left: {timer}s
        </Text>
      )}

      <Text style={[styles.question, { color: questionColor }]}>
        {current.question}
      </Text>

      {options.map((option) => (
        <TouchableOpacity
          key={option.key}
          style={[
            styles.option,
            {
              backgroundColor:
                selectedOption === option.key ? '#1e90ff' : cardBackground,
            },
          ]}
          onPress={() => handleAnswer(option.key)}
          activeOpacity={0.85}
        >
          <Text style={[styles.optionText, { color: cardTextColor }]}>
            {option.key}. {option.text}
          </Text>
        </TouchableOpacity>
      ))}

      <View style={styles.navigationButtons}>
        <TouchableOpacity
          style={[styles.navButton, { backgroundColor: '#ccc' }]}
          onPress={goToPrevious}
          disabled={currentIndex === 0}
        >
          <Text style={{ color: '#333' }}>Previous</Text>
        </TouchableOpacity>

        {currentIndex + 1 < questions.length ? (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: '#ff6f00' }]}
            onPress={goToNext}
          >
            <Text style={{ color: '#fff' }}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.navButton, { backgroundColor: '#1a237e' }]}
            onPress={handleSubmit}
          >
            <Text style={{ color: '#fff' }}>Submit</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={[styles.progress, { color: progressColor }]}>
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
    marginBottom: 10,
    textAlign: 'center',
  },
  timer: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
  },
  question: {
    fontSize: 16,
    marginBottom: 20,
  },
  option: {
    padding: 12,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  optionText: {
    fontSize: 14,
    fontWeight: '600',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  navButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  progress: {
    marginTop: 20,
    textAlign: 'center',
  },
});