import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuAdminScreen from "../screens/MenuAdminScreen";
import PetProfile from "../screens/PetProfile";

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
            name="PetProfile"
            component={PetProfile}
        /> 
    </Stack.Navigator>
)

export default AccountAdminNavigator; 