import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";
import colors from "../config/colors";

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
          <TouchableOpacity style={styles.accountButton}
          onPress={() => navigation.navigate("Login")}
          >
            <Text>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.accountButton}
            onPress={() => navigation.navigate("AddPet")}
          >
            <Text>Add Pet</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.newsContainer}>
          <View>
            <View style={styles.newsTitleContainer}>
              <Text style={styles.titleText}>Recent News</Text>
              <View style={styles.newsButtonContainer}>
                <TouchableOpacity style={styles.viewAllButton}>
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
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </Text>
              </ScrollView>
            </View>
          </View>
        </View>

        <View style={styles.adoptionApplicationStatusContainer}>
          <View style={styles.adoptionStatusHeader}>
            <Text style={styles.adoptionStatusTitle}>
              Adoption Application Status
            </Text>
            <TouchableOpacity style={styles.viewAllButton}>
              <Text style={styles.articleButtonText}>
                View All Applications
              </Text>
              <Icon
                style={styles.icon}
                name="keyboard-arrow-right"
                size={20}
                color="black"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.statusContainer}>
            <View style={styles.petImageContainer}>
              <Image
                source={require("../assets/alvan.jpg")}
                style={styles.images}
              />
            </View>
            <View style={styles.petStatusTextContainer}>
              <Text style={styles.adoptionStatusPetName}>Alvan</Text>
              <Text style={styles.adoptionStatusText}>Under Review</Text>
            </View>
          </View>
        </View>

        <View style={styles.petContainer}>
          <View style={styles.petTitleContainer}>
            <Text style={styles.petTitleText}>Available Pets</Text>
            <View style={styles.petButtonContainer}>
              <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.petButtonText}>View All Pets</Text>
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
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
    alignItems: "center",
    alignItems: "center",
  },

  // Account Section

  // Account Section
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
    borderWidth: 1,
    padding: 5,
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
    borderWidth: 1,
    padding: 5,
  },
  newsTitleContainer: {
    padding: 0,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
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
  newsButtonContainer: {
    paddingLeft: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  viewAllButton: {
  viewAllButton: {
    flexDirection: "row",
    borderWidth: 2,
    fontSize: 45,
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
  articleButtonText: {},

  // Adoption Application Status Section
  adoptionApplicationStatusContainer: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginVertical: 10,
    marginBottom: 20,
    marginHorizontal: 10,
    maxHeight: 400,
    overflow: "scroll",
    borderWidth: 1,
    padding: 5,
  },
  adoptionStatusHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  adoptionStatusTitle: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  statusContainer: {
    paddingTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "start",
  },
  petStatusTextContainer: {
    flexDirection: "column",
  },
  adoptionStatusPetName: {
    fontSize: 18,
    paddingLeft: 10,
    fontWeight: "bold",
  },
  adoptionStatusText: {
    fontSize: 18,
    paddingLeft: 10,
  },

  // Pet Section
  petContainer: {
    textAlign: "center",
    flexWrap: "wrap",
    margin: 15,
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
  petButtonText: {},
  petImageContainer: {
    alignItems: "center",
  },
  petTextContainer: {
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
    borderWidth: 1,
    borderColor: colors.black,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
});

export default HomeScreen;
