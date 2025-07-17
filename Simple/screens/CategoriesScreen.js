import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  useWindowDimensions,
  StatusBar,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../Features/ThemeContext'; // adjust path if needed

const categories = [
  { id: '1', name: 'General Knowledge', icon: 'book' },
  { id: '2', name: 'Science & Technology', icon: 'flask' },
  { id: '3', name: 'History', icon: 'history' },
  { id: '4', name: 'Sports', icon: 'futbol-o' },
  { id: '5', name: 'Movies & Entertainment', icon: 'film' },
  { id: '6', name: 'Geography', icon: 'globe' },
  { id: '7', name: 'Current Affairs', icon: 'newspaper-o' },
];

const categoryColors = [
  ['#ff9966', '#ff5e62'],
  ['#36d1c4', '#1e90ff'],
  ['#f7971e', '#ffd200'],
  ['#f953c6', '#b91d73'],
  ['#00c9ff', '#92fe9d'],
  ['#fc5c7d', '#6a82fb'],
  ['#ff6a00', '#ee0979'],
];

export default function CategoriesScreen({ navigation }) {
  const { isDarkMode } = useContext(ThemeContext);
  const { width } = useWindowDimensions();
  const numColumns = 2;
  const cardSize = (width - 48) / numColumns;

  const renderItem = ({ item, index }) => (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: categoryColors[index % categoryColors.length][0],
          width: cardSize,
        },
      ]}
      onPress={() => navigation.navigate('QuizTypes', { category: item })}
      activeOpacity={0.85}
    >
      <FontAwesome name={item.icon} size={28} color="#000" />
      <Text style={styles.cardText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#000' : '#f5f5f5' },
      ]}
    >
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.headerContainer}>
        <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#1a237e' }]}>
          Choose a Category
        </Text>
      </View>

      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        contentContainerStyle={styles.grid}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 12,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  grid: {
    justifyContent: 'center',
    paddingBottom: 20,
  },
  card: {
    margin: 8,
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});