import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SafeScreen from '../components/SafeScreen';


const SearchPet = () => {
    const [selectedButton, setSelectedButton] = useState(null);

    {/* Species Button Function */}
    const handleButtonPress = (buttonId) => {
        setSelectedButton(buttonId);
}


    return(
        <SafeScreen>
            <View>
                <View style={styles.header}>
                    <Text style={styles.heading}>Refine Search</Text>
                </View>

                {/* Animal Type Header */}
                <View style={styles.contain}>
                    <Text style={styles.name}>Select Animal Type</Text>
                </View>
                {/* Animal Type Selection */}
                <View style={styles.speciesContainer}>
                    <View style={styles.item}>
                        <TouchableOpacity style={[styles.accountButton, selectedButton === 1 && styles.selectedButton]}
                        onPress={() => handleButtonPress(1)}
                        >
                        <Text style={styles.buttonText}>Dog</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity style={[styles.accountButton, selectedButton === 2 && styles.selectedButton]}
                        onPress={() => handleButtonPress(2)}
                        >
                        <Text style={styles.buttonText}>Cat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity style={[styles.accountButton, selectedButton === 3 && styles.selectedButton]}
                        onPress={() => handleButtonPress(3)}
                        >
                        <Text style={styles.buttonText}>Other</Text>
                        </TouchableOpacity>
                    </View>

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
        paddingTop: 20,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    name:{
        fontSize: 18,
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 5,
      },
    contain: {
        paddingLeft: 15,
    },
    accountButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        fontSize: 45,
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center",
      },
    selectedButton: {
        backgroundColor: 'grey',
        color: 'white',
        borderColor: "transparent",
    },
    buttonText: {
        fontWeight: 'bold',
        color: 'black',
    },
    speciesContainer: { // Container that controls the items
        flexDirection: 'row', // Align children from left to right
        flexWrap: 'wrap',
        alignItems: 'flex-start', // Align children to the start of the container's cross axis
        marginBottom: 12,
        marginTop: -7,
    },

    item:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,

    },

})

export default SearchPet;