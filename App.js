import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import CreateAccountScreen from "./screens/CreateAccountScreen";
import AddPet from "./screens/AddPet";
import AddNews from "./screens/AddNews";
import PetProfile from "./screens/PetProfile";
import NewsPage from "./screens/NewsPage";
import LoginScreen from "./screens/LoginScreen"; 
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import NewsPage from "./screens/NewsPage";
import PetProfile from "./screens/PetProfile";
import MenuPublicScreen from "./screens/MenuPublicScreen";
import SearchPet from "./screens/SearchPet";
import colors from "./config/colors";

import AddNews from "./screens/AddNews";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

const Stack = createNativeStackNavigator();

const NewsPageNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}
  >
    <Stack.Screen
      name="NewsPage"
      component={NewsPage}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
)

const HomeNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackButtonMenuEnabled: true,
      headerTitle: ""
    }}
  >
    <Stack.Screen
      name="HomeStack"
      component={HomeScreen}
    />
    <Stack.Screen
      name="CreateAccount"
      component={CreateAccountScreen}
    />
    <Stack.Screen
      name="Login"
      component={LoginScreen}
    />
    <Stack.Screen
      name="ForgotPassword"
      component={ForgotPasswordScreen}
    />
    <Stack.Screen
      name="ResetPassword"
      component={ResetPasswordScreen}
    />
    <Stack.Screen
      name="AddPet"
      component={AddPet}
    />
    <Stack.Screen
      name="PetProfile"
      component={PetProfile}
    />
    <Stack.Screen
      name="SearchPet"
      component={SearchPet}
    />
    <Stack.Screen
      name="AddNews"
      component={AddNews}
    />
  </Stack.Navigator>
)

const AccountNavigator = () => (
  <Stack.Navigator
    screenOptions={{
      headerBackButtonMenuEnabled: true,
      headerTitle: ""
    }}
  >
    <Stack.Screen
      name="MenuPublic"
      component={MenuPublicScreen}
    />
    <Stack.Screen
      name="PetProfile"
      component={PetProfile}
    />
  </Stack.Navigator>
)

const Tab = createBottomTabNavigator();
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: colors.lightgray,
      tabBarActiveTintColor: colors.black,
      headerShown: false
    }}
  >
    <Tab.Screen
      name="News Feed"
      component={NewsPageNavigator}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="newspaper" size={size} />}}
    />
    <Tab.Screen
      name="Home"
      component={HomeNavigator}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="home" size={size} />}}
    />
    <Tab.Screen
      name="Account"
      component={AccountNavigator}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="account" size={size} />}}
    />
  </Tab.Navigator>
)

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

export default App;
