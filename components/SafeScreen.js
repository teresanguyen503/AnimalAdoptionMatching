import React from 'react';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet } from 'react-native';

function SafeScreen({ children, style }) {
    return (
       <SafeAreaView style={[styles.container, style]}>
            {children}
       </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: Constants.statusBarHeight
    }
})

export default SafeScreen;