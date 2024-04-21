import React, { useState } from "react";
import {
  Button, 
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Linking,
} from "react-native";
import colors from "../config/colors";
import SafeScreen from "../components/SafeScreen";
// import { useNavigation } from "@react-navigation/native";
// import Topbar from "../components/TopBar";

function HomeScreen() {
  //   const createAccountUrl = "AnimalAdoptionMatching://CreateAccountScreen";

  //   const onPressHandler = () => {
  //     Linking.openURL(createAccountUrl);
  //   };

  return (
    <SafeScreen>
      {/* <Topbar
            title="Animal Adoption Matching"
            rightButton={<Icon name="menu" />}
        /> */}
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={onPressHandler}> */}
        <TouchableOpacity>
        <Text>Make Account</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.newsContainer}>
        <Text style={styles.titleText}>Recent News</Text>
        <Text style={styles.articleText}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
        {/* <Image source={require('../assets/thank-you-adoption.jpg')} style={styles.imageContainer} /> */}
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
  },
  buttonContainer: {
    padding: 2,
    backgroundColor: "#fff",
    borderColor: "#D3D3D3",
    borderRadius: 5,
    fontSize: 15,
  },
  titleText: {
    fontSize: 27,
    color: "black",
    textAlign: "center",
  },
  articleText: {
    fontSize: 18,
    textAlign: "center",
  },
  // imageContainer: {
  //     alignItem: 'center',
  //     width: 200,
  //     resizeMode: 'contain',
  // },
  newsContainer: {
    textAlign: "center",
  },
});

export default HomeScreen;
