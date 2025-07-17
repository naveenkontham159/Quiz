import React, { useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useWindowDimensions,
  Switch,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../Features/ThemeContext'; // adjust path if needed

export default function HomeScreen({ navigation }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const { width } = useWindowDimensions();

  const backgroundColor = isDarkMode ? '#000' : '#f5f5f5';
  const textColor = isDarkMode ? '#fff' : '#1a237e';

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      {/* Navbar */}
      <View style={styles.navbar}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome name="bars" size={24} color={textColor} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: textColor }]}>Quiz Master</Text>
        <View style={styles.switchContainer}>
          <Switch
            value={isDarkMode}
            onValueChange={toggleTheme}
            thumbColor={isDarkMode ? '#ff6f00' : '#ccc'}
            trackColor={{ false: '#999', true: '#ffcc80' }}
          />
        </View>
      </View>

      {/* Center Play Button */}
      <View style={styles.center}>
        <TouchableOpacity
          style={styles.playButton}
          onPress={() => navigation.navigate('Categories')}
          activeOpacity={0.85}
        >
          <FontAwesome name="play-circle" size={32} color="#fff" />
          <Text style={styles.playText}>Play Quiz</Text>
          <Text style={styles.subText}>Challenge your brain now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navbar: {
    height: 80,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#ff6f00',
    paddingVertical: 30,
    paddingHorizontal: 40,
    borderRadius: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    alignItems: 'center',
  },
  playText: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  subText: {
    marginTop: 6,
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
});