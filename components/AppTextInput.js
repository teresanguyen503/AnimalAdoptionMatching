import React from 'react';
import { TextInput, View, StyleSheet, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import colors from '../config/colors';

function AppTextInput({ icon, ...otherProps }) {
    return (
        <View style={styles.container}>
            {icon && <MaterialCommunityIcons name={icon} size={20} color={colors.iconTextInput} style={styles.icon} />}
            <TextInput style={styles.textInput} {...otherProps} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.inputBackground, 
        borderRadius: 25, 
        flexDirection: "row", 
        width: "100%", 
        padding: 15, 
        marginVertical: 10
    }, 
    icon: {
        marginRight: 10
    },
    textInput: {
        fontSize: 18, 
    }
})

export default AppTextInput;