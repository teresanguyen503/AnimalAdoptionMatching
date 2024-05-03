import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableHighlight, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SafeScreen from '../components/SafeScreen';


const SearchPet = () => {
    return(
        <SafeScreen>
            <View>
                <View style={styles.header}>
                    <Text style={styles.heading}>Refine Search</Text>
                </View>

            </View>
        </SafeScreen>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'center', // Align items to the start (left)
        alignItems: 'center', // Center vertically
        paddingHorizontal: 16, // Add padding for spacing
        paddingTop: 30,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },

})

export default SearchPet;