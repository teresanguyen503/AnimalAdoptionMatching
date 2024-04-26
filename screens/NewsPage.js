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
      <View style={styles.header}>
        <Text style={styles.heading}>Recent News</Text>
        <TouchableOpacity>
          <Icon style={styles.icon} name="menu" size={40} color="black" />
        </TouchableOpacity>
      </View>
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
});

export default NewsPage;
