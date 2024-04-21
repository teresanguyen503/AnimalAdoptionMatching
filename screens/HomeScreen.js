import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");

function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeScreen>
      {/* <Topbar
            title="Animal Adoption Matching"
            rightButton={<Icon name="menu" />}
        /> */}
      <View style={styles.container}>
        {/* <TouchableOpacity onPress={onPressHandler}> */}
        <View style={styles.header}>
          <Text style={styles.heading}>Animal Adoption Matching App</Text>
          <TouchableOpacity>
            <Icon style={styles.icon} name="menu" size={40} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.accountButtonContainer}>
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate("CreateAccount")}
          >
            <Text>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.accountButton}>
            <Text>Sign In</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newsContainer}>
          <View style={styles.newsTitleContainer}>
            <Text style={styles.titleText}>Recent News</Text>
            <View style={styles.newsButtonContainer}>
              <TouchableOpacity style={styles.articleButton}>
                <Text style={styles.articleButtonText}>View All News</Text>
                <Icon
                  style={styles.icon}
                  name="keyboard-arrow-right"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.articleContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/thank-you-adoption.jpg")}
                style={styles.imageContainer}
              />
            </View>
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>Sample Article</Text>
              <Text style={styles.articleText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.petContainer}>
          <View style={styles.petTitleContainer}>
            <Text style={styles.petTitleText}>Available Pets</Text>
            <View style={styles.petButtonContainer}>
              <TouchableOpacity style={styles.articleButton}>
                <Text style={styles.articleButtonText}>View All Pets</Text>
                <Icon
                  style={styles.icon}
                  name="keyboard-arrow-right"
                  size={20}
                  color="black"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.petProfileBanner}>
            <View style={styles.petProfileContainer}>
              <View style={styles.petImageContainer}>
                <Image
                  source={require("../assets/pauline.jpg")}
                  style={styles.imageContainer}
                />
              </View>
              <View style={styles.petTextContainer}>
                <Text style={styles.petName}>Doggy</Text>
                <Text style={styles.petDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
            </View>
            <View style={styles.petProfileContainer}>
              <View style={styles.petImageContainer}>
                <Image
                  source={require("../assets/jeanie.jpg")}
                  style={styles.imageContainer}
                />
              </View>
              <View style={styles.petTextContainer}>
                <Text style={styles.petName}>Kitty</Text>
                <Text style={styles.petDescription}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    width,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    textAlign: "center",
    paddingTop: 30,
    paddingLeft: 10,
    justifyContent: "space-between",
  },
  heading: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
    justifyContent: "center",
  },
  icon: {
    paddingRight: 0.5,
    justifyContent: "right",
  },
  accountButtonContainer: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
  },
  accountButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    fontSize: 45,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    alignItems: "center",
  },
  newsTitleContainer: {
    padding: 0,
    margin: 0,
  },
  titleText: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
  articleText: {
    margin: 5,
    fontSize: 14,
    textAlign: "left",
  },
  articleButton: {
    flexDirection: "row",
    borderWidth: 2,
    fontSize: 45,
    borderRadius: 10,
    margin: 15,
  },
  articleButtonText: {},
  imageContainer: {
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
    resizeMode: "cover",
    width: 250,
    height: 300,
  },
  newsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  newsButtonContainer: {
    paddingLeft: 50,
    flex: 1,
    flexDirection: "row",
  },
  newsContainer: {
    flex: 1,
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  articleTextContainer: {
    flexDirection: "column",
    flex: 1,
    margin: 5,
  },
  articleContainer: {
    flexDirection: "row",
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    margin: 5,
  },
  petTitleText: {
    fontSize: 25,
    color: "black",
    textAlign: "center",
    fontWeight: "bold",
  },
  petTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  petImageContainer: {
    alignContent: "center",
    alignItems: "center",
  },
  petProfileBanner: {
    flexDirection: "row",
  },
  petProfileContainer: {
    flexDirection: "column",
    flex: 1,
    borderWidth: 1,
    borderColor: "lightgray",
    borderRadius: 10,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    margin: 5,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
    margin: 5,
  },
});

export default HomeScreen;
