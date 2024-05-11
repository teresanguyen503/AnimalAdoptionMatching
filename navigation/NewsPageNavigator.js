import React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import NewsPage from "../screens/NewsPage";

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

export default NewsPageNavigator; 