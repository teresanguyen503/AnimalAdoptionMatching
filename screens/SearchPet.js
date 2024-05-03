import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Modal, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import SafeScreen from '../components/SafeScreen';
import dogData from '../breed-data/dog-breed.json';
import catData from '../breed-data/cat-breed.json';
import otherData from '../breed-data/other-breed.json';
import DateModal from '../components/DateModal';
import FilterPet from '../components/FilterPet';


const SearchPet = () => {
    const [selectedButton, setSelectedButton] = useState(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);
    const [dispositionButton, setDispositionButton] = useState(null);
    const [isdate, setDate] = useState('');
    const [selectedSpecie, setSelectedSpecie] = useState('');
    const [selectedDisposition, setSelectedDisposition] = useState('');
    const [filteredProfiles, setFilteredProfiles] = useState([]);


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


    const handleSelectedItem = (item) => {
      setSelectedItem(item);
      setIsOpen(false); // Close the dropdown after selecting an item
    };

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
        handleStartDatePress(date)
    };

      {/* Filter Function */}
      const handleSpeciePress = (specie) => {
        setSelectedSpecie(specie);
    };

    const handleDispositionPr = (disposition) => {
        setSelectedDisposition(disposition);
    };

    const handleStartDatePress = (startDate) => {
        setDate(startDate);
    };

    const handleItemPress = (item) => {
        setSelectedItem(item.label);
    };
     {/* Apply Filter Function */}
     const handleApplyFilter = () => {
        const selectedFilters = {
            speciesName: selectedSpecie,
            disposition: selectedDisposition,
            isdate: setDate,
            selectedItem: selectedItem
        };
       applyFilter(selectedFilters);
       setSelectedButton('')
       setDate('');
       setDispositionButton('');
       setSelectedItem('');

    };

    const applyFilter = async (selectedFilters) => {
        try {
        // Send selectedFilters to the backend API
        const response = await fetch('http://192.168.1.12:3000/filter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedFilters)
        })
        const data = await response.json();
        if(data == '' ){
            alert('No profiles found!')
            return;
          }
        setFilteredProfiles(data);
        } catch(error) {
            // Handle errors
            console.error('Error applying filter:', error);
        };
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
                        onPress={() => {handleSpeciePress('Dog'); handleButtonPress(1); }}
                        >
                        <Text style={styles.buttonText}>Dog</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity style={[styles.accountButton, selectedButton === 2 && styles.selectedButton]}
                        onPress={() => {handleSpeciePress('Cat'); handleButtonPress(2); }}
                        >
                        <Text style={styles.buttonText}>Cat</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity style={[styles.accountButton, selectedButton === 3 && styles.selectedButton]}
                        onPress={() => {handleSpeciePress('Other'); handleButtonPress(3); }}
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

                {/* Date Placeholder */}
                <View>
                    <Text style={styles.dateHeader}>Date Available</Text>
                    <TouchableOpacity
                    style={styles.textInput}>
                    <Text >{isdate}</Text>
                    </TouchableOpacity>

                </View>

                {/* Date Picker Modal */}
                <DateModal onDateSelect={handleDateSelect}/>

                {/* Disposition */}
                <Text style={styles.dispositionHeader}>Disposition</Text>
                <View style={styles.speciesContainer}>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.dispositionButton, dispositionButton === 1  && styles.selectedButton]}
                        onPress={() =>  {handleDispositionPr('Good with other animals'); handleDispositionPress(1);}}
                        >
                        <Text style={styles.buttonText}>Good with other animals</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.dispositionButton, dispositionButton === 2 && styles.selectedButton]}
                        onPress={() =>  {handleDispositionPr('Good with children'); handleDispositionPress(2);}}
                        >
                        <Text style={styles.buttonText}>Good with children</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.item}>
                        <TouchableOpacity
                        style={[styles.dispositionButton, dispositionButton === 3  && styles.selectedButton]}
                        onPress={() => {handleDispositionPr('Animal must be leashed at all times'); handleDispositionPress(3);}}
                        >
                        <Text style={styles.buttonText}>Must be leashed at all times</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Apply filter Button */}
                <View style={styles.applyFilterButton}>
                    <TouchableOpacity onPress={handleApplyFilter} style={styles.filterButton}>
                    <Text>Apply Filter</Text>
                    </TouchableOpacity>
                </View>



                <FilterPet onFilteredProfiles={filteredProfiles}/>




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
        paddingTop: 10,
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
        marginTop: -10,
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
        marginTop: -10,
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
    dispositionButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        fontSize: 45,
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center",
        marginTop: -20,
        marginBottom: -5,

    },
    // Date
    textInput: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 5,
        paddingLeft: 20,
        width: '90%',
        marginTop: -12,
        marginLeft: 15,
    },
    dateHeader : {
        fontSize: 18,
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 10,
        fontWeight: 'bold',
        marginTop: 5,
        marginLeft: 15,

    },
    applyFilterButton: {
        width: '90%',
        paddingTop: 20,
        marginLeft: 18,
        marginTop: -30,
    },
    filterButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 1,
        fontSize: 45,
        borderRadius: 10,
        textAlign: "center",
        alignItems: "center",
    }

})

export default SearchPet;