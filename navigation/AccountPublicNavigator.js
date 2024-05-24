import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MenuPublicScreen from "../screens/MenuPublicScreen";
import PetProfile from "../screens/PetProfile";
import SearchPet from '../screens/SearchPet';
import EmailPreferences from '../screens/EmailPreferences';

const Stack = createNativeStackNavigator();

const AccountPublicNavigator = () => (
    <Stack.Navigator
      screenOptions={{
        headerBackButtonMenuEnabled: true,
        headerBackTitle: "Back",
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
        <Stack.Screen
            name="EmailPreferences"
            component={EmailPreferences}
        />
    </Stack.Navigator>
)

export default AccountPublicNavigator;