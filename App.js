import "react-native-gesture-handler";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import AuthNavigator from "./navigation/AuthNavigator";
import AppAdminNavigator from "./navigation/AppAdminNavigator";
import AppPublicNavigator from "./navigation/AppPublicNavigator";
import AuthContext from "./auth/context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

function App() {
  const [user, setUser] = useState(null); 

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {
          user === null ? (
            <AuthNavigator />
          ) : user === "admin" ? (
            <AppAdminNavigator />
          ) : (
            <AppAdminNavigator />
          )
        }
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;
