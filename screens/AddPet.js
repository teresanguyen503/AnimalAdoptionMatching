import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AddPet() {
    const [name, setName] = useState('');
    const [desc, setDesc] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
            <View style={styles.header}>
            <Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" />
            <Text style={styles.heading}>Add Pet</Text>
            </View>
            <View style={styles.contain}>
            <Text style={styles.name}>Animal Name</Text>
            <TextInput
                style={styles.textInput}
                placeholder="Enter name"
                onChangeText={setName}
                value={name}
            />
            </View>
            </View>
        </ScrollView>

    );


}

const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
      // justifyContent: 'center',
      // alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row', // Align items in a row
        justifyContent: 'flex-start', // Align items to the start (left)
        alignItems: 'center', // Center vertically
        paddingHorizontal: 16, // Add padding for spacing
        paddingTop: 40,
        paddingLeft: 20,
      },
      heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
      },
      icon:{
        paddingLeft: 0.5,

      },
      name:{
        fontSize: 20,
        paddingTop: 0.6,
        paddingLeft: 10,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 1,
      },
      textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 10,
        paddingLeft: 10,
        width: '90%',
      },
      contain: {
        paddingLeft: 20,
      },
})