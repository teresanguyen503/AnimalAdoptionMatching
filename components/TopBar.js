import React from "react";
import { View, Text } from "react-native";
import SafeScreen from "./SafeScreen";
import Icon from "react-native-vector-icons/AntDesign";

const Topbar = ({ title, rightButton, leftButton }) => {
  return (
    <SafeScreen>
      <View style={styles.topbar}>
        {leftButton && <TouchableOpacity>{leftButton}</TouchableOpacity>}
        {iconName && <Icon name={menu} style={styles.icon} />}
        <Text style={styles.title}>{title}</Text>
        {rightButton && <TouchableOpacity>{rightButton}</TouchableOpacity>}
        {iconName && <Icon name={back} style={styles.icon} />}
      </View>
    </SafeScreen>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: 50,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 24,
    marginRight: 10,
  },
});

export default Topbar;
