import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuPublicScreen from "../screens/MenuPublicScreen";
import PetProfile from "../screens/PetProfile";
import SearchPet from '../screens/SearchPet';

const Stack = createNativeStackNavigator(); 

const AccountPublicNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: true,
        headerTitle: ""
      }}
    >
        <Stack.Screen
            name="MenuAdmin"
            component={MenuPublicScreen}
        />  
        <Stack.Screen
            name="PetProfile"
            component={PetProfile}
        />
        <Stack.Screen
            name="SearchPet"
            component={SearchPet}
        />  
    </Stack.Navigator>
)

export default AccountPublicNavigator; 