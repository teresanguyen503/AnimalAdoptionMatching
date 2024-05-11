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
        </View>
    )

}

const styles = StyleSheet.create({
    // Header Styling
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingLeft: 10,
        // top: 10,
    },
})