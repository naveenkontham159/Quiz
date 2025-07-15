import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useColorScheme,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const categories = [
  { id: '1', name: 'General Knowledge', icon: 'book' },
  { id: '2', name: 'Science & Technology', icon: 'flask' },
  { id: '3', name: 'History', icon: 'history' },
  { id: '4', name: 'Sports', icon: 'futbol-o' },
  { id: '5', name: 'Movies & Entertainment', icon: 'film' },
  { id: '6', name: 'Geography', icon: 'globe' },
  { id: '7', name: 'Current Affairs', icon: 'newspaper-o' },
];

function CategoriesScreen({ navigation }) {
  const isDarkMode = useColorScheme() === 'dark';

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('QuizTypes', { category: item })}
    >
      <FontAwesome name={item.icon} size={30} color="#ff6f00" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#f5f5f5' }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <Text style={styles.title}>Categories</Text>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a237e',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    alignItems: 'center',
    elevation: 3,
  },
  cardText: {
    marginTop: 10,
    fontSize: 14,
    color: '#1a237e',
    textAlign: 'center',
  },
});

export default CategoriesScreen;