import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AddPet from "../screens/AddPet";
import MenuAdminScreen from "../screens/MenuAdminScreen";

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
    </Stack.Navigator>
)

export default AccountAdminNavigator; 