import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import SafeScreen from "../components/SafeScreen";
import { useNavigation } from "@react-navigation/native";

import colors from '../config/colors'; 

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
          <TouchableOpacity style={styles.accountButton}
          onPress={() => navigation.navigate("AddPet")}
          >
            <Text>Add Pet</Text>
          </TouchableOpacity>
        </View>

<View style={styles.newsContainer}>
        <View >
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
  </View>

          <View style={styles.articleContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../assets/thank-you-adoption.jpg")}
                style={{width: 120, height: 120, resizeMode: "contain"}}
              />
            </View>
            <View style={styles.articleTextContainer}>
              <Text style={styles.articleTitle}>Sample Article</Text>
              <ScrollView contentContainerStyle={{flexGrow: 1}}>
              <Text style={styles.articleText}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum.
              </Text>
              </ScrollView>
            </View>
          </View>
        </View>


        <View style={styles.petContainer}>
          <View style={styles.petTitleContainer}>
            <Text style={styles.petTitleText}>Available Pets</Text>
            <View style={styles.petButtonContainer}>
              <TouchableOpacity style={styles.petButton}>
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
    textAlign: "center",
    fontWeight: "bold",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
    // flex: 1,
    // flexWrap: 'wrap'
  },
  articleText: {
    // margin: 5,
    fontSize: 16,
    // textAlign: "left", 
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
    // margin: 5,
    // justifyContent: "center",
    // alignItems: "center",
    // resizeMode: "cover",
    // width: 150,
    // height: 150,
    width: '30%'
  },
  images: {
    width: 100, 
    height: 100, 
  }, 
  newsTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  newsButtonContainer: {
    paddingLeft: 50,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  newsContainer: {
    textAlign: "center",
    flexDirection: "column",
    flexWrap: "nowrap",
    marginVertical: 10,
    marginBottom: 20, // new
    marginHorizontal: 10,
    maxHeight: 400,  // new
    overflow: "scroll", // new
  },
  articleTextContainer: {
    // flexDirection: "column",
    // margin: 5,
    width: '65%',
    maxHeight: 120
  },
  articleContainer: {
    // flexDirection: "row",
    // borderWidth: 1,
    // borderColor: "lightgray",
    // borderRadius: 10,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // margin: 5,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'flex-start', 
    width: '100%', 
    paddingHorizontal: 10, 
    marginTop: 20
  },
  petTitleText: {
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
  },
  petTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  petButtonText: {},
  petImageContainer: {
    // alignContent: "center",
    alignItems: "center",
  },
  petTextContainer: {
    // flexDirection: "column",
    // flex: 1,
    // margin: 5,
    alignItems: 'center'
  },
  petProfileBanner: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginVertical: 20,
    // marginHorizontal: 10,
    marginTop: 20, // new
    // marginBottom: 20, // new
    paddingHorizontal: 10
  },
  petProfileContainer: {
    // flexDirection: "column",
    // flex: 1,
    // borderWidth: 1,
    // borderColor: "lightgray",
    // borderRadius: 10,
    // shadowOffset: { width: 2, height: 2 },
    // shadowOpacity: 0.2,
    // margin: 5,
    width: '40%', 
    borderWidth: 1, 
    borderColor: colors.black, 
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 20
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  petButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  petButton: {
    // flexDirection: "row",
    // borderWidth: 2,
    fontSize: 16,
    // borderRadius: 10,
    // margin: 15,
    marginTop: 5
  },
  petContainer: {
    textAlign: "center",
    flexWrap: "wrap",
    margin: 15,
  },
});

export default HomeScreen;
