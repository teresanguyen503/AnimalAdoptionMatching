import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, FlatList, Platform} from 'react-native';
import axios from 'axios';
// import SearchPet from '../screens/SearchPet';



export default function FilterPet({onFilteredProfiles}){
    const [filteredProfiles, setFilteredProfiles] = useState([]);

    // const applyFilter = async (selectedFilters) => {
    //     console.log("applyFilter:", "here")
    //     try {
    //     // Send selectedFilters to the backend API
    //     const response = await fetch('http://192.168.1.98:3000/filter', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(selectedFilters)
    //     })
    //     const data = await response.json();
    //     setFilteredProfiles(data);
    //     } catch(error) {
    //         // Handle errors
    //         console.error('Error applying filter:', error);
    //     };
    // };


    return (
        <View>
            {/* <SearchPet applyFilter={applyFilter} /> */}

            <FlatList
                data={onFilteredProfiles}
                renderItem={({ item }) => (
                    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                        <Image
                            source={{ uri: item.image }}
                            style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                        />
                        <View>
                            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
                            {item.isdate !== undefined && (
                            <Text style={styles.profileData}>Date Available: {new Date(item.isdate).toDateString()}</Text>
                            )}
                            <Text>Description: {item.desc}</Text>
                            <Text>Animal Type: {item.speciesName}</Text>
                            <Text>Breed: {item.selectedItem.label}</Text>
                            <Text>Disposition: {item.disposition}</Text>
                            {/* Add more profile details as needed */}
                        </View>
                    </View>
                )}
                keyExtractor={item => item._id}
            />


        </View>
    );
};

const styles = StyleSheet.create({

})