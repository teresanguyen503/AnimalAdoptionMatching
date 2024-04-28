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
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name="keyboard-arrow-left"
              size={40}
              color="black"
              onPress={() => navigation.navigate("Home")}
            />
          </TouchableOpacity>
          <Text style={styles.heading}>Add News Article</Text>
        </View>
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  
     /* Main Heading */
     header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 30,
        paddingLeft: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        paddingLeft: 0.5,
    },
});

export default AddNews;
