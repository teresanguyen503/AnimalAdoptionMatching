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

function AddNews() {
  const navigation = useNavigation();

  return (
    <SafeScreen>
      <ScrollView>
        
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  password: {
    flex: 1,
    paddingRight: 5,
  },
  text: {
    fontSize: 27,
    textAlign: "center",
  },
});

export default AddNews;
