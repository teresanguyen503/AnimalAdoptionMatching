import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"; 
import { MaterialCommunityIcons } from "@expo/vector-icons"; 

import NewsPageNavigator from "./NewsPageNavigator"; 
import HomeNavigator from "./HomeNavigator"; 
import AccountPublicNavigator from "./AccountPublicNavigator";

import colors from '../config/colors';

const Tab = createBottomTabNavigator(); 

const AppPublicNavigator = () => (
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
      component={AccountPublicNavigator}
      options={{ tabBarIcon: ({ size }) => <MaterialCommunityIcons name="account" size={size} />}}
    />
  </Tab.Navigator>
)

export default AppPublicNavigator; 