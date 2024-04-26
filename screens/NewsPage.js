import React, { useState } from "react";
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

import colors from "../config/colors";

const { width } = Dimensions.get("window");

function NewsPage() {
  const navigation = useNavigation();

  return (
    <SafeScreen>
      <ScrollView>
      <View style={styles.header}>
        <Text style={styles.heading}>Recent News</Text>
        <TouchableOpacity>
          <Icon style={styles.icon} name="menu" size={40} color="black" />
        </TouchableOpacity>
      </View>

      {/* Article 1 */}
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>

      {/* Article 2 */}
      <View style={styles.articleContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/kanashi.jpg")}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.articleTextContainer}>
          <Text style={styles.articleTitle}>Sample Article</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.articleText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>

      {/* Article 3 */}
      <View style={styles.articleContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/hannah.jpg")}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.articleTextContainer}>
          <Text style={styles.articleTitle}>Sample Article</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.articleText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>

      {/* Article 4 */}
      <View style={styles.articleContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/kabo.jpg")}
            style={{ width: 120, height: 120, resizeMode: "contain" }}
          />
        </View>
        <View style={styles.articleTextContainer}>
          <Text style={styles.articleTitle}>Sample Article</Text>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.articleText}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </ScrollView>
        </View>
      </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
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

  // News Articles
  articleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    padding: 5,
    marginStart: 5,
    marginTop: 20,
    borderWidth: 1,
    borderColor: colors.black,
  },
  imageContainer: {
    width: "30%",
  },
  images: {
    width: 120,
    height: 120,
  },
  articleTextContainer: {
    width: "65%",
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: "bold",
    margin: 10,
  },
  articleText: {
    fontSize: 14,
  },
});

export default NewsPage;
