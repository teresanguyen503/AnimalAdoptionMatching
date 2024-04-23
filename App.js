import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AddPet from "./screens/AddPet";
import AddNews from "./screens/AddNews";
import PetProfile from "./screens/PetProfile";
import NewsPage from "./screens/NewsPage";
import LoginScreen from "./screens/LoginScreen"; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <LoginScreen />
    // <NavigationContainer>
    //   <Stack.Navigator initialRouteName="Home">
    //   <Stack.Screen
    //     name="Home"
    //     component={HomeScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="CreateAccount"
    //     component={CreateAccountScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="AddPet"
    //     component={AddPet}
    //     options={{ headerShown: false }}
    //   />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
