import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmailPreferences() {
    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.emailHeading}>Email Preferences</Text>
            </View>
            <View style={styles.contain}>
                <Text style={styles.heading}>Choose your email preferences</Text>
                <Text>Choose how often would you like to recieve updates</Text>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    // Header Styling
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 20,
        paddingLeft: 10,
    },
    emailHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    contain: {
        marginLeft: 18,
    },
    heading: {
        marginTop:22,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
})