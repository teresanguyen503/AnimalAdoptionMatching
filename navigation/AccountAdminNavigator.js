import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddPet from "../screens/AddPet";
import MenuAdminScreen from "../screens/MenuAdminScreen";
import SearchPet from '../screens/SearchPet';
import AddNews from '../screens/AddNews'; 
import PetProfile from '../screens/PetProfile';

const Stack = createNativeStackNavigator(); 

const AccountAdminNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: true,
        headerTitle: ""
      }}
    >
      <Stack.Screen
        name="MenuAdmin"
        component={MenuAdminScreen}
      />  
      <Stack.Screen
        name="AddPet"
        component={AddPet}
      />
      <Stack.Screen
        name="SearchPet"
        component={SearchPet}
      /> 
      <Stack.Screen
        name="PetProfile"
        component={PetProfile}
      />
      <Stack.Screen
        name="AddNews"
        component={AddNews}
      />
    </Stack.Navigator>
)

export default AccountAdminNavigator; 