import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SafeScreen from '../components/SafeScreen';
import dogData from '../breed-data/dog-breed.json';
import catData from '../breed-data/cat-breed.json';
import otherData from '../breed-data/other-breed.json';
import DateModal from '../components/DateModal';


const SearchPet = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dispositionButton, setDispositionButton] = useState(null);
    const [isdate, setDate] = useState('');

    {/* Species Button Function */}
    const handleButtonPress = (buttonId) => {
        setSelectedButton(buttonId);
    }

    // Filtered data based on search query
const filteredDogData = dogData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );
    {/* Select Breed Function */}
    const filteredCatData = catData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
    );


    const renderItem = ({ item }) => (
      <TouchableOpacity onPress={() =>{handleItemPress(item); handleSelectedItem(item); }}>
        <Text>{item.label}</Text>
      </TouchableOpacity>
    );
    //console.log("selectedItem:", selectedItem)


    const handleSelectedItem = (item) => {
      setSelectedItem(item);
      setIsOpen(false); // Close the dropdown after selecting an item
    };
    //console.log("selectedItem 2:", selectedItem.label)
    let selectedData;
    if (selectedButton === 1) {
      selectedData = filteredDogData;
        specieName = "Dog";
    } else if (selectedButton === 2) {
      selectedData = filteredCatData;
       specieName = "Cat";
    } else {
      selectedData = otherData;
        specieName = "Other";
    }

    {/* Disposition Button Function */}
    const handleDispositionPress = (buttonId) => {
        setDispositionButton(buttonId);
    }
    {/* Date Function */}
    const handleDateSelect = (date) => {
        setDate(date)
    };
      {/* Apply Filter Function */}
    const handleApplyFilter = () => {
    };



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

                {/* Disposition */}
                <Text style={styles.dispositionHeader}>Disposition</Text>
                <View style={styles.speciesContainer}>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.accountButton, dispositionButton === 1  && styles.selectedButton]}
                        onPress={() => handleDispositionPress(1)}
                        >
                        <Text style={styles.buttonText}>Good with other animals</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.accountButton, dispositionButton === 2 && styles.selectedButton]}
                        onPress={() => handleDispositionPress(2)}
                        >
                        <Text style={styles.buttonText}>Good with children</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.accountButton, dispositionButton === 3  && styles.selectedButton]}
                        onPress={() => handleDispositionPress(3)}
                        >
                        <Text style={styles.buttonText}>Must be leashed at all times</Text>
                        </TouchableOpacity>
                    </View>
                </View>

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

                {/* Apply filter Button */}
                <View style={styles.applyFilterButton}>
                    <TouchableOpacity onPress={handleApplyFilter} style={styles.accountButton}>
                    <Text>Apply Filter</Text>
                    </TouchableOpacity>
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
    breedHeader: {
        paddingLeft: 22,
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: -2,
    },
    /* Disposition Checkbox and Label Styling */
    dispositionHeader: {
        fontSize: 18,
        paddingTop: 8,
        paddingLeft: 20,
        paddingBottom: 16,
        fontWeight: 'bold', marginTop: 2,
        top: 6,
    },
    // Date
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 10,
        width: '90%',
        marginTop: -12,
    },
    applyFilterButton: {
        width: '90%',
        paddingTop: 45,
        marginLeft: 18,
        marginTop: -25,
     },

})

export default SearchPet;