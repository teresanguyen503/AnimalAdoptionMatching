import React, { useContext, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";
import AuthConext from "../auth/context";

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthConext);

  const handleViewNavigation = (nav) => {
    if (user) {
      navigation.navigate(nav);
    } else {
      alert("Login Required. Please login or sign up.");
    }
  }

  return (
    <SafeScreen>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Animal Adoption Matching App</Text>
          </View>

          {!user ? (
            <View style={styles.accountButtonContainer}>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => navigation.navigate("CreateAccount")}
              >
                <Text style={styles.accountButtonText}>Sign Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.accountButton}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.accountButtonText}>Sign In</Text>
              </TouchableOpacity>
            </View>
            ) : (
              <View />
            )
          }

          <View style={styles.newsContainer}>
            <View>
              <View style={styles.newsTitleContainer}>
                <Text style={styles.titleText}>Recent News</Text>
                <View style={styles.newsButtonContainer}>
                  <TouchableOpacity
                    style={styles.viewAllButton}
                    onPress={() => handleViewNavigation("NewsPage")}
                  >
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
            </View>

            <View style={styles.articleContainer}>
              <View style={styles.imageContainer}>
                <Image
                  source={require("../assets/thank-you-adoption.jpg")}
                  style={{ width: 120, height: 120, resizeMode: "contain" }}
                />
              </View>
              <View style={styles.articleTextContainer}>
                <Text style={styles.articleTitle}>Sample Article</Text>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <Text style={styles.articleText}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </Text>
                </ScrollView>
              </View>
            </View>
          </View>

          <View style={styles.petContainer}>
            <View style={styles.petTitleContainer}>
              <Text style={styles.petTitleText}>Available Pets</Text>
              <View style={styles.petButtonContainer}>
                <TouchableOpacity style={styles.viewAllButton}
                onPress={() => handleViewNavigation("PetProfile")}
                >
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
          </View>

          <View style={styles.petProfileBanner}>
            <View style={styles.petProfileContainer}>
              <View style={styles.petImageContainer}>
                <Image
                  source={require("../assets/pauline.jpg")}
                  style={styles.images}
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
                  style={styles.images}
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
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    fontSize: 20,
    padding: 10,
    textAlign: "center",
    width,
    backgroundColor: colors.lightgray,
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
    alignItems: "center",
    color: colors.iceWhite,
  },

  // Account Section
  accountButtonContainer: {
    flexDirection: "row",
    alignItem: "center",
    justifyContent: "center",
  },
  accountButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: colors.darkRose,
    borderColor: colors.darkRose,
    borderWidth: 2,
    fontSize: 45,
    borderRadius: 10,
    margin: 10,
    textAlign: "center",
    alignItems: "center",
  },
  accountButtonText: {
    color: colors.iceWhite,
  },

  // News Section
  newsContainer: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    maxHeight: 400,
    overflow: "scroll",
    padding: 5,
    // borderWidth: 1,
    // borderColor: colors.nightBlack,
    borderRadius: 5,
    backgroundColor: colors.iceWhite,
  },
  newsTitleContainer: {
    padding: 0,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  titleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  newsButtonContainer: {
    paddingLeft: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllButton: {
    flexDirection: "row",
    borderColor: colors.darkRose,
    borderWidth: 2,
    backgroundColor: colors.darkRose,
    fontSize: 45,
    color: colors.iceWhite,
    borderRadius: 10,
    margin: 15,
  },
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
    paddingHorizontal: 5,
    marginTop: 20,
  },
  imageContainer: {
    width: "30%",
  },
  images: {
    width: 100,
    height: 100,
  },
  articleTextContainer: {
    width: "65%",
    maxHeight: 120,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  articleText: {
    fontSize: 14,
  },
  articleButtonText: {
    alignSelf: "center",
    paddingLeft: 5,
    color: colors.iceWhite,
  },

  // Pet Section
  petContainer: {
    textAlign: "center",
    flexWrap: "wrap",
    marginStart: 10,
  },
  petTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  petTitleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  petButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  petButtonText: {},
  petImageContainer: {
    alignItems: "center",
  },
  petTextContainer: {
    alignItems: "center",
  },
  petProfileBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingHorizontal: 10,
  },
  petProfileContainer: {
    width: "49%",
    // borderWidth: 1,
    // borderColor: colors.nightBlack,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: colors.iceWhite,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
});

export default HomeScreen;
