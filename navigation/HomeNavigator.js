import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import LoginScreen from "../screens/LoginScreen"; 
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";
import AddPet from "../screens/AddPet";
import PetProfile from '../screens/PetProfile';

const Stack = createNativeStackNavigator(); 

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
    </Stack.Navigator>
  )

  export default HomeNavigator; 