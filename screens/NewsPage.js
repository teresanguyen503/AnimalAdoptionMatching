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

function HomeScreen() {
  const navigation = useNavigation();

  return (<SafeScreen>
    
  </SafeScreen>);
}

const styles = StyleSheet.create({});

export default HomeScreen;
