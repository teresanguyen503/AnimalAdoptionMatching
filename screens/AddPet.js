import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { Dropdown } from 'react-native-element-dropdown';
import CheckBox from 'expo-checkbox';
import { MaterialIcons } from '@expo/vector-icons';
import dogData from '../breed-data/dog-breed.json';
import catData from '../breed-data/cat-breed.json';
import otherData from '../breed-data/other-breed.json';
import DateModal from '../components/DateModal';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";
import apiClient from "../api/client";

export default function AddPet() {
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [isdate, setDate] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState(null);
    const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const initialState = {
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
    }
    const [state, setState] = useState(initialState);
    let disposition;
    if(state.checkbox1 === true){
      disposition = "Good with other animals"
    }if(state.checkbox2 === true){
      disposition = "Good with children"
    } if(state.checkbox3 === true){
      disposition = "Animal must be leashed at all times"
    }  if(state.checkbox1 === true && state.checkbox2 === true){
      disposition = "Good with other animals and good with children"

    }
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    {/* Date Function */}
    const handleDateSelect = (date) => {
        setDate(date)
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
          maxWidth: 300,
          maxHeight: 300,
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

    {/* Dropdown Function */}
    // Filtered data based on search query
    const filteredDogData = dogData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCatData = catData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() => handleSelectedItem(item)}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );

    const handleSelectedItem = (item) => {
      setSelectedItem(item);
      setIsOpen(false); // Close the dropdown after selecting an item
    };

     {/* Select Data for dropdown depending on selected species */}
    let selectedData;
    if (selectedButton === 1) {
      selectedData = filteredDogData;
      speciesName = "Dog";
    } else if (selectedButton === 2) {
      selectedData = filteredCatData;
      speciesName = "Cat";
    } else {
      selectedData = otherData;
      speciesName = "Other";
    }

    const handleAddProfile = async () => {
        if(!name || !desc || !isdate ||!image || !selectedItem ){
          alert('Please check required fields.')
          return;
        }
        try{
        // expo go:
        const base64Image = await convertImageToBase64(image);
        const {data} = await apiClient.post(('/addPet'), {name, isdate, desc, speciesName, selectedItem, image:base64Image, disposition});
          alert('New Profile successfully added')
          // Clear input fields
          setName('');
          setDate('');
          setDesc('');
          setSelectedButton(null);
          setSelectedItem({});
          setHasGalleryPermission(null);
          setImage(null);
          setState(false);
        } catch(err){
          console.log(err);
        }
      }

    // converting images to base64
    const convertImageToBase64 = async (uri) => {
        if (!uri) return null;

        const response = await fetch(uri);
        const blob = await response.blob();
        const base64 = await blobToBase64(blob);
        return base64;
    };

    const blobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onerror = reject;
          reader.onload = () => {
            resolve(reader.result);
          };
          reader.readAsDataURL(blob);
        });
    };

    return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Add Pet</Text>
                </View>

            {/* Name Placeholder */}
            <View style={styles.outerContainer}>
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
                style={styles.textInput}>
            <Text >{isdate}</Text>
            </TouchableOpacity>

            </View>

            {/* Date Picker Modal */}
            <DateModal onDateSelect={handleDateSelect}/>

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

            {/* Species Header */}
            <Text style={styles.name}>Species</Text>
            </View>
            {/* Buttons for Dog, Cat and Other */}
            <View style={styles.speciesContainer}>
                <View style={styles.item}>
                    <TouchableOpacity
                    style={[styles.accountButton, selectedButton ===1 && styles.selectedButton]}
                    onPress={() => handleButtonPress(1)}
                    >
                        <Text style={styles.buttonText}>Dog</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.accountButton, selectedButton === 2 && styles.selectedButton]}
                    onPress={() => handleButtonPress(2)}
                    >
                        <Text style={styles.buttonText}>Cat</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.item}>
                <TouchableOpacity
                    style={[styles.accountButton, selectedButton === 3 && styles.selectedButton]}
                    onPress={() => handleButtonPress(3)}
                    >
                        <Text style={styles.buttonText}>Other</Text>
                    </TouchableOpacity>

                </View>
            </View>
            {/* Select Breed Header */}
            <View>
                <Text style={styles.breedHeader}>Select Breed</Text>
            {/* Breed Dropdown */}
            <View>
                <TouchableOpacity onPress={() => setIsOpen(!isOpen)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', borderWidth: 0.5, borderRadius: 5, borderColor: 'black', padding: 5, paddingLeft: 0, marginLeft: 12, marginRight: 25,}}>
                    <Text style={{ paddingLeft: 22}}>{selectedItem ? selectedItem.label : 'Select Breed'}</Text>
                    <MaterialIcons name={isOpen ? 'arrow-drop-up' : 'arrow-drop-down'}  size={24} />
                </View>
                </TouchableOpacity>
            {isOpen && (
                <View style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}>
                    <TextInput
                    placeholder="Search..."
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                    />
                    <FlatList
                    data={selectedData}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    search
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus ? 'Select Breed' : '...'}
                    searchPlaceholder="Search..."
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                    setValue(item);
                    setIsFocus(false);
                }}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.value.toString()}
                    />
                </View>
            )}
            </View>
            </View>

             {/* Image Upload */}
            <View style={styles.imageContainer}>
            {image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                <View style={styles.uploadBtnContainer}>
                    <TouchableOpacity onPress={pickImage} style={styles.uploadBtn} >
                        <AntDesign name="camera" size={20} color="black" />
                        <Text>{image ? 'Edit' : 'Upload'} Image</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Disposition */}
            <Text style={styles.dispositionHeader}>Disposition</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center',   flexWrap: 'wrap', }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: -20, width: 90 }}>
                    <CheckBox style={styles.checkBox} disabled={false} value={state.checkbox1} onValueChange={(value) => setState({...state, checkbox1:value})}  />
                    <Text style={styles.checkLabel1} >Good with other animals</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center',  width: 70, marginLeft: 50,}}>
                    <CheckBox style={styles.checkBox} disabled={false} value={state.checkbox2} onValueChange={(value) => setState({...state, checkbox2:value})}  />
                    <Text style={styles.checkLabel2}>Good with children</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', width: 130, marginLeft: 30}}>
                    <CheckBox style={styles.checkBox} disabled={false} value={state.checkbox3} onValueChange={(value) => setState({...state, checkbox3:value})}  />
                    <Text style={styles.checkLabel3}>Animal must be leashed at all times</Text>
                </View>
            </View>

                {/* Add Profile Button */}
                <View style={styles.addProfileButton}>
                    <TouchableOpacity onPress={handleAddProfile} style={styles.accountButton}>
                        <Text>Add Profile</Text>
                    </TouchableOpacity>
                </View>

        </View>

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

     /* Main Heading */
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingLeft: 10,
        paddingTop: 10,
        // marginTop: 15,
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    icon: {
        paddingLeft: 0.5,
    },

     /* Subheading */
    name: {
        fontSize: 20,
        paddingTop: 0.6,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 1,
      //   marginTop: Platform.OS === 'ios' ? 15 : 1,
    },
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        width: '90%',
        marginTop: -12,
    },
    outerContainer: {
        paddingLeft: 15,
    },

    /* Date/Calendar Styling */
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

    /* Upload Image Styling */
    imageContainer: {
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
        marginLeft: 5,
        left: 80,
        marginTop: 12,
     //   left: Platform.OS === 'ios' ? 115 : 80,
      //  marginTop: Platform.OS === 'ios' ? 30 : 12,
       // marginBottom: Platform.OS === 'ios' ? 20 : 0,

    },
    uploadBtnContainer: {
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'25%',
    },
    uploadBtn: {
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    },

    /* Species Styling */
    /* Adjusting the species item width to achieve a side-by-side layout */
    item: {
        width: '27%',
        paddingHorizontal: 10,
        paddingLeft: 15,
    },

    /* Species Container that controls the items */
    speciesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 12,
        marginTop: -7,
    },
    /* Species Button Styling */
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 8,
    },
    selectedButton: {
        backgroundColor: 'grey',
        color: 'white',
        borderColor: "transparent",
    },
    buttonText: {
        color: 'black',
        // color: 'white',
        fontWeight: 'bold',
    },
    breedHeader: {
        paddingLeft: 22,
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: -2,
    },

    /* Disposition Checkbox and Label Styling */
    dispositionHeader: {
        fontSize: 20,
        paddingTop: 1.0,
        paddingLeft: 29,
        paddingBottom: 16,
        fontWeight: 'bold', marginTop: 2,
        top: 6,
    },
    checkLabel1: {
        top: -8,
        left: 15,
        paddingHorizontal: 1,
        fontSize: 14,
    },
    checkLabel2: {
        left: 15,
        paddingHorizontal: 1,
        fontSize: 14,
        top: -8,
    },
    checkLabel3: {
        left: 15,
        paddingHorizontal: 1,
        fontSize: 14,
        top: -8,
    },
    checkBox: {
        top: -8,
        right: -12,
    },

    /* Dropdown Styling */
    dropdown: {
        // height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        marginLeft: 12,
        marginRight: 24,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },

    /* Add Profile Button Styling */
    addProfileButton: {
        width: '90%',
        paddingTop: 45,
        marginLeft: 18,
        marginTop: -25,
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

})