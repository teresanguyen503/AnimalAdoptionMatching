import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../config/colors';
import SafeScreen from '../components/SafeScreen';
import CreateAccountScreen from './CreateAccountScreen';

function HomeScreen () {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text className={`${colors.heading} font-bold`}>Animal Adoption Matching App</Text>
                <TouchableOpacity style={styles.buttonContainer}>
                    <Text className={colors.heading}>Create Account</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.imageContainer}>
                <Image source={require('../assets/thank-you-adoption.jpg')} className="w-60 h-80"/>
            </View>
            <View>
                <View style={styles.newsContainer}>
                    <Text>
                        Recent News
                    </Text>
                </View>
            </View>
        </SafeScreen>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
        textAlign: 'center'
    },
    buttonContainer: {
        padding: 2,
        backgroundColor: black,
        borderBlockColor: gray
    },
    text: {
        fontSize: 27, 
        textAlign: 'center'
    },
    imageContainer: {

    },
    newsContainer: {
        textAlign: 'left'
    }
})

export default HomeScreen;