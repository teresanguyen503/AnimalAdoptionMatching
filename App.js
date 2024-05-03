import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigation/AuthNavigator";
import AppAdminNavigator from "./navigation/AppAdminNavigator";
import AppPublicNavigator from "./navigation/AppPublicNavigator";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  return (
    <NavigationContainer>
      <AppPublicNavigator />
    </NavigationContainer>
  );
}

export default App;
