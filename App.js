import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AddPet from './screens/AddPet'
import HomeScreen from './screens/HomeScreen';

export default function App() {
  return (
    <HomeScreen />,
    <AddPet />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
