import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CreateAccountScreen from './screens/CreateAccountScreen';
import AddPet from './screens/AddPet'

export default function App() {
  return (
    <CreateAccountScreen />,
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
