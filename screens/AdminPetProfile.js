import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../config/colors';


export default function AdminPetProfile() {
    const navigation = useNavigation();
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchedProfileIds, setSearchedProfileIds] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [buttonStatus, setButtonStatus] = useState('available');
    const [availabilityStatus, setAvailabilityStatus] = useState('available');

   // Function to fetch profiles from the backend
    const fetchProfiles = async () => {
        try {
            // Make HTTP GET request to fetch profile data
            // const response = await axios.get('http://192.168.1.98:3000/getPet');
             const response = await axios.get('http://192.168.1.12:3000/getPet');
            setProfiles(response.data);
            // Initialize searchedProfileIds with all profile IDs
            setSearchedProfileIds(response.data.map(profile => profile._id));
        } catch (error) {
        console.error(error);
        }
    };

     // Function to search for a profile by name
    const searchProfileByName = (text) => {
        setSearchId(text);
        // Search for profiles containing the entered text in their name (case insensitive)
        const results = profiles.filter(profile => profile.name.toLowerCase().includes(text.toLowerCase()));
        setSearchOptions(results);
        setModalVisible(true);
    };

    const selectSearchOption = (profile) => {
        setSearchId(profile.name);
        setSearchResult(profile);
        // Set currentIndex to the index of the selected profile in searchedProfileIds
        setCurrentIndex(searchedProfileIds.indexOf(profile._id));
        setSearchOptions([]);
        setModalVisible(false);
        setSearchId('');
    };

    // Function to navigate to the next profile
    const nextProfile = () => {
        // Increment index and loop back to the beginning if at the end
        setCurrentIndex(prevIndex => (prevIndex + 1) % searchedProfileIds.length);
        setSearchResult(null);
    };

  // Function to navigate to the previous profile
    const prevProfile = () => {
        // Decrement index and loop back to the end if at the beginning
        setCurrentIndex(prevIndex => (prevIndex - 1 + searchedProfileIds.length) % searchedProfileIds.length);
        setSearchResult(null);
    };

    // Fetch profiles when the component mounts
    useEffect(() => {
    fetchProfiles();
    }, []);


    // Function to render the current profile
    const renderCurrentProfile = () => {
    const profile = profiles[currentIndex];
    if (!profile) return null;
    return (
        <View>
            <View style={styles.profileContainer}>
                <View style={styles.imageContainer}>
                    {/* Image and profile imformation */}
                    <Image source={{ uri: profile.image }} style={{ width: 300, height: 300 }} />
                </View>
                <Text style={styles.profileName}>{profile.name}</Text>
                {profile.isdate !== undefined && (
                <Text style={styles.profileData}>Date Available: {new Date(profile.isdate).toDateString()}</Text>
            )}
                <Text style={styles.profileData}>Description: {profile.desc}</Text>
                <Text style={styles.profileData}>Disposition:{profile.disposition}</Text>
                <Text style={styles.profileData}>Specie: {profile.speciesName}</Text>
                <Text style={styles.profileData}>Breed: {profile.selectedItem.label}</Text>

            </View>

        </View>
        );
    };

    const handlePetClick = async (currentIndex, status) => {
        try {
          const petId = searchedProfileIds[currentIndex]; // Get the ID of the pet at the current index
          // Send a request with the ID of the pet at the current index
        //   console.log("status:",status)
        //   console.log("petId:",petId)
          const response = await axios.patch(`http://192.168.1.98:3000/${petId}`, { availability: status });
          setAvailabilityStatus(status);
          // Handle the response from the backend
        } catch (error) {
          // Handle errors
          console.error('Error fetching pet profile:', error);
        }
     };

    // Remove the profile once they are deleted
    const onDelete = (deletedPetId) => {
        setProfiles(profiles.filter(pet => pet._id !== deletedPetId));
    //    console.log("deletedPetId", deletedPetId)

    };

    //  Delete pet profile by id
    const handleDelete = async () => {
        try {
            // Get the ID of the pet at the current index
            const petId = searchedProfileIds[currentIndex];
          // Send a DELETE request to the backend to delete the pet profile
          await axios.delete(`http://192.168.1.12:3000/${petId}`);
          onDelete(petId);
          alert("Pet has been deleted")
        } catch (error) {
          console.error('Error deleting pet profile:', error);
        }
    };

    const AvailableButton = ({ profileId }) => {
        useEffect(() => {
            profileId = JSON.stringify(currentIndex);
            // Load button status from AsyncStorage when component mounts
            loadButtonStatus();

          }, [[profileId]]);


        const loadButtonStatus = async () => {
            try {
              // Retrieve the saved button status from AsyncStorage
              const savedStatus = await AsyncStorage.getItem(`button_${profileId}`);
              if (savedStatus) {
                setButtonStatus(savedStatus);
              }
              else{
                setButtonStatus('')
              }
            } catch (error) {
              console.error('Error loading button status:', error);
            }
          };

          const handleButtonPress = async (status) => {
            try {
              // Update the button status in state
              setButtonStatus(status);
              // Save the button status to AsyncStorage
              await AsyncStorage.setItem(`button_${profileId}`, status);
            } catch (error) {
              console.error('Error setting button status:', error);
            }
          };


        return (
            <View  style={styles.container}>
                <View >
                    <TouchableOpacity
                    style={[styles.availablityButton, buttonStatus === 'available' && styles.activeButton]}
                    onPress={() =>  {handleButtonPress('available'); handlePetClick(currentIndex, 'Available')}}
                    >
                    <Text>Available</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                    style={[styles.availablityButton, buttonStatus === 'adopted' && styles.activeButton]}
                    onPress={() => {handleButtonPress('adopted'); handlePetClick(currentIndex, 'Adopted')}}
                    >
                    <Text>Adopted</Text>
                    </TouchableOpacity>

                </View>

                <View>
                    <TouchableOpacity
                    style={[styles.availablityButton, buttonStatus === 'pending' && styles.activeButton]}
                    onPress={() => {handleButtonPress('pending'); handlePetClick(currentIndex, 'Pending')}}
                    >
                    <Text>Pending</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                    style={[styles.availablityButton, buttonStatus === 'not_available' && styles.activeButton]}
                    onPress={() => {handleButtonPress('not_available'); handlePetClick(currentIndex, 'Not Available')}}
                    >
                    <Text>Not Available</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                     style={[styles.deleteButton]}
                    >
                        <Text>Delete</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

        );
    };

    const ProfileScreen = ({ profileId }) => {
        return (
            <View>
                {/* Profile content */}
                <AvailableButton profileId={profileId} />
            </View>
        );
    };

return(
    <View >
    <ScrollView >

        {/* Header and back icon */}
        <View style={styles.header}>
            <Text style={styles.heading}>Pet Match</Text>
        </View>

        {/* Search Bar */}
        <TextInput style={styles.input}
        placeholder="Find your perfect match..."
         value={searchId}
         onChangeText={searchProfileByName}
      />

      {/* Display search options */}
      {searchOptions.length > 0 && (
        <ScrollView style={{ maxHeight: 200, width: '100%' }}>
          {searchOptions.map(profile => (
            <TouchableOpacity key={profile._id} onPress={() => selectSearchOption(profile)}>
              <Text style={styles.item}>{profile.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}


         {/* displays all profiles with back and next arrows */}
        <View style={styles.container}>
            {/* Back icon */}
            <TouchableOpacity onPress={prevProfile}>
                <Icon style={styles.backIcon} name="keyboard-arrow-left" size={40} color="black" />

            </TouchableOpacity>

            {/* Container for profiles */}
                {renderCurrentProfile()}

        {/* Next icon */}
        <TouchableOpacity onPress={nextProfile}>
            <Icon name="keyboard-arrow-right" size={40} color="black" />
        </TouchableOpacity>
        </View>

            {ProfileScreen(currentIndex)}
            {/* Delete Button */}
            <View>
                <TouchableOpacity
                style={[styles.deleteButton]}
                onPress={() => handleDelete()}
                >
                <Text>Delete</Text>
                </TouchableOpacity>
            </View>



    </ScrollView>
    </View>

)

}


const styles = StyleSheet.create({
    // Header Styling
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 10,
        paddingLeft: 10,
        // top: 10,
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
    // Search
    item: {
        padding: 10,
        fontSize: 18,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
      },
      input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        top:20,
        marginLeft: Platform.OS === 'ios' ? 20 : 12,
        marginRight: Platform.OS === 'ios' ? 20 : 12,
      },
    // profile display container
    profileContainer:{
        borderRadius: 12,
        borderColor : 'grey',
        borderWidth:  0.5,
        width: 300,
      //  marginLeft: 50,
        marginTop: 50,
      //  paddingBottom: 15,
    },
    imageContainer:{
        elevation:2,
        height:300,
        width:298,
        backgroundColor:'#efefef',
        position:'relative',
        overflow:'hidden',
        borderRadius: 12,
    },
    profileName:{
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    profileData: {
        marginLeft: 15,
        marginTop: 8,
        fontSize: 16,
    },

    // Styling for arrow buttons
    nextIcon:{
        marginTop: -40,

       marginLeft: Platform.OS === 'ios' ? 380 : 350,
    },
    //Pass and Like Button Styling
    buttonContainer: { // Container that controls the items
        flexDirection: 'row', // Align children from left to right
        flexWrap: 'wrap',
        alignItems: 'flex-start', // Align children to the start of the container's cross axis
     //   marginBottom: 12,

    },
    button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -202,
    },
    likeContainer:{
        borderRadius: 20,
        borderColor : 'grey',
        borderWidth:  0.5,
        width: '35%',
        height: '7.5%',
        marginTop: 48,
    },

    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: colors.lightgray,
      },
      profilesContainer: {
        flex: 1, // This allows the profile container to occupy the remaining space
       left: -30,
      },
      activeButton: {
        backgroundColor: 'grey'
      },
      buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white'
      },
    availablityButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 10,
        backgroundColor: 'transparent',
        borderWidth: 0.5,
        marginTop: 20,
        marginRight: 40,
        marginLeft: 50,
        alignItems: 'center',
    },
    selected: {
        backgroundColor: 'blue', // Change the color to whatever you prefer
    },
    deleteButton: {
        borderWidth: 0.5,
        marginLeft: 140,
        alignItems: 'center',
        borderRadius: 10,
        backgroundColor: 'transparent',
        paddingVertical: 10,
        width: '30%',
        marginTop: 10,
        marginBottom: 20,
    },
})