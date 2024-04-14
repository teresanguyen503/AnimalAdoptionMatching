import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';

export default function AddPet() {
    const [name, setName] = useState('');
    const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState("");
    const [startedDate, setStartedDate] = useState("2024/04/14");
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);

    {/* Date Function */}
    const today = new Date();
    const startDate = getFormatedDate(
      today.setDate(today.getDate() + 1),
      "YYYY/MM/DD"
    );

    const onDoneDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
      };

    const onCancelDate = () => {
        setOpenStartDatePicker(!openStartDatePicker);
        setSelectedStartDate(startedDate);
      };

    {/* Image Function */}
    useEffect(() => {
        (async () => {
          const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
          setHasGalleryPermission(galleryStatus.status === 'granted');
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    }

    {/* Species Button Function */}
    const handleButtonPress = (buttonId) => {
        setSelectedButton(buttonId);
    }

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" />
                    <Text style={styles.heading}>Add Pet</Text>
                </View>

            {/* Name Placeholder */}
            <View style={styles.contain}>
                <Text style={styles.name}>Animal Name</Text>
                <TextInput
                style={styles.textInput}
                placeholder="Enter name"
                onChangeText={setName}
                value={name}
                />

            {/* Date Placeholder */}
            <View>
                <Text style={styles.name}>Date Available</Text>
                <TouchableOpacity
                style={styles.textInput}
                onPress={onDoneDate}
                >
                <Text>{selectedStartDate}</Text>
                </TouchableOpacity>
            </View>

            {/* Date Picker Modal */}
            <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />
                {/* Cancel Date */}
                <TouchableOpacity onPress={onCancelDate}>
                    <Text style={{ color: "white", marginRight: 150, }}>Cancel</Text>
                </TouchableOpacity>

                {/* Done Date */}
                <TouchableOpacity onPress={onDoneDate}>
                  <Text style={{ color: "white", marginLeft: 150, marginTop: -19,}}>Done</Text>
                </TouchableOpacity>

              </View>
            </View>
          </Modal>

         {/* Description Placeholder */}
        <View>
            <Text style={styles.name}>Description</Text>
            <TextInput
            style={styles.textInput}
            placeholder="Enter description"
            onChangeText={setDesc}
            value={desc}
            />
        </View>

        {/* Image Upload */}
        <View style={styles.containers}>
            {image  && <Image source={{ uri: image }} style={{ width: 250, height: 200 }} />}
                <View style={styles.uploadBtnContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadBtn} >
                        <AntDesign name="camera" size={20} color="black" />
                        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    </TouchableOpacity>
                </View>
        </View>
            {/* Species Header */}
            <Text style={styles.name}>Species</Text>
            </View>
            {/* Buttons for Dog, Cat and Other */}
            <View style={styles.conta}>
                <View style={styles.item}>
                    <TouchableOpacity
                    style={[styles.button, selectedButton ===1 && styles.selectedButton]}
                    onPress={() => handleButtonPress(1)}
                    >
                        <Text style={styles.buttonText}>Dog</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.button, selectedButton === 2 && styles.selectedButton]}
                    onPress={() => handleButtonPress(2)}
                    >
                        <Text style={styles.buttonText}>Cat</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.button, selectedButton === 3 && styles.selectedButton]}
                    onPress={() => handleButtonPress(3)}
                    >
                        <Text style={styles.buttonText}>Other</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {/* Select Breed Header */}
            <View style={styles.container}>
                <Text style={styles.breed}>Select Breed</Text>


            </View>



            </View>
        </ScrollView>

    );


}

const styles = StyleSheet.create({
    scrollViewContent: {
      flexGrow: 1,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
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
        marginTop: -8,
    },
    contain: {
        paddingLeft: 20,
    },
    centeredView: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30,

    },
    modalView: {
        margin: 20,
        backgroundColor: "#080516",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 20,
        padding: 35,
        height: "45%",
        width: "80%",
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
    },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
    containers:{
        marginTop: 12,
        elevation:2,
        height:200,
        width:250,
        left:65,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
        marginLeft: -15,
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },
     /* Adjusting the item width to achieve a side-by-side layout */
    item: {
        width: '27%',
        paddingHorizontal: 10,
        paddingLeft: 15,
    },
     /* Container that controls the items */
    conta: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignItems: 'flex-start',
      marginBottom: 18,
    },
    /* Species Button Styling */
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: 'black',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    breed: {
        paddingLeft: 22,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -12,
      },

})