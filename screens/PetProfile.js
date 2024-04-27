import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Platform} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { useNavigation } from "@react-navigation/native";


export default function PetProfile() {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState();
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Search function - empty for now
    function handleSearch(){
    }

    // Fetching profile data from server
    const fetchData = async () => {
        try {
          // Make HTTP GET request to fetch profile data
        const response = await axios.get('http://192.168.1.98:3000/getPet');
         //console.log("this is new get response:",response.data);
        setProfiles(response.data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      useEffect(() => {
        fetchData();
    }, []);

    // Function to render the current profile
    const renderCurrentProfile = () => {
    const profile = profiles[currentIndex];
    if (!profile) return null;
    return (
        <View>
            <View>
                <View>
                    {/* Image and profile imformation */}
                    <Image source={{ uri: profile.image }} style={{ width: 300, height: 300 }} />
                </View>
                <Text>{profile.name}</Text>
                {profile.isdate !== undefined && (
                <Text>Date Available: {new Date(profile.isdate).toDateString()}</Text>
            )}
                <Text>Description: {profile.desc}</Text>
                <Text>Disposition: {profile.disposition}</Text>
                <Text>Specie: {profile.speciesName}</Text>
                <Text>Breed: {profile.selectedItem.label}</Text>
            </View>
        </View>
        );
    };

return(
    <View>
        {/* Header and back icon */}
        <View style={styles.header}>
            <Icon style={styles.icon} name="keyboard-arrow-left" size={40} color="black" onPress={() => navigation.navigate("Home")} />
            <Text style={styles.heading}>Pet Match</Text>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
            <TextInput
            style={{ flex: 1, padding: 5, marginRight: 10, marginLeft: 10, marginTop: 12 }}
            placeholder="Find your perfect match..."
            value={searchText}
            onChangeText={setSearchText}
            />
            <AntDesign name="search1" size={20} color="black" />
            <TouchableOpacity onPress={handleSearch}>
            </TouchableOpacity>
        </View>

        <View>
        {/* renders profile */}
        {renderCurrentProfile()}
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
    // Search Bar Styling
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 0.3,
        borderRadius: 5,
        padding: -1,
        paddingHorizontal: 10,
        marginRight: 20,
        marginLeft: 20,
        marginTop: 20,
    },

})