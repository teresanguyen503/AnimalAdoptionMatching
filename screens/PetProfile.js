import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";


export default function PetProfile() {
    const navigation = useNavigation();

return(
    <View>
        {/* Header and back icon */}
        <View style={styles.header}>
            <Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" onPress={() => navigation.navigate("Home")} />
            <Text style={styles.heading}>Pet Match</Text>
        </View>





    </View>
)

}


const styles = StyleSheet.create({
    // Header Styling
    header: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'flex-start', // Align items to the start (left)
        alignItems: 'center', // Center vertically
        paddingHorizontal: 16, // Add padding for spacing
        paddingTop: 60,
        paddingLeft: 10,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    icon:{
        paddingLeft: 0.5,
    },


})