import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import CreateAccountScreen from "../screens/CreateAccountScreen";
import LoginScreen from "../screens/LoginScreen"; 
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import ResetPasswordScreen from "../screens/ResetPasswordScreen";

const Stack = createNativeStackNavigator(); 

const AuthNavigator = () => (
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
  </Stack.Navigator>
)

export default AuthNavigator; 