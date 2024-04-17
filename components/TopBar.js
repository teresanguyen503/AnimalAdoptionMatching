import React from 'react';
import { View, Text } from 'react-native';

const TopBar = ({ title }) => {
  return (
    <View style={styles.topbar}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  topbar: {
    height: 50,
    backgroundColor: '#f4f4f4',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TopBar;