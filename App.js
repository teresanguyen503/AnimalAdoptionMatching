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
import LoginScreen from "./screens/LoginScreen"; 
import ForgotPasswordScreen from "./screens/ForgotPasswordScreen";
import ResetPasswordScreen from "./screens/ResetPasswordScreen";
import NewsPage from "./screens/NewsPage";
import PetProfile from "./screens/PetProfile";
import MenuPublicScreen from "./screens/MenuPublicScreen";
import colors from "./config/colors";


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator(); 
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveBackgroundColor: colors.lightgray, 
      tabBarActiveTintColor: colors.black
    }}
  >
    <Tab.Screen 
      name="News Feed" 
      component={NewsPage}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="newspaper" size={size} />}}
    />
    <Tab.Screen 
      name="Home" 
      component={HomeScreen} 
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="home" size={size} />}}
    />
    <Tab.Screen 
      name="Account"  
      component={MenuPublicScreen}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="account" size={size} />}}
    />
  </Tab.Navigator>
)

function App() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
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
    //     name="Login"
    //     component={LoginScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="ForgotPassword"
    //     component={ForgotPasswordScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="ResetPassword"
    //     component={ResetPasswordScreen}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //     name="AddPet"
    //     component={AddPet}
    //     options={{ headerShown: false }}
    //   />
    //    <Stack.Screen
    //     name="PetProfile"
    //     component={PetProfile}
    //     options={{ headerShown: false }}
    //   />
    //   <Stack.Screen
    //       name="NewsPage"
    //       component={NewsPage}
    //       options={{ headerShown: false }}
    //   />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App;
