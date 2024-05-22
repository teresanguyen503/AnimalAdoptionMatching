import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { AntDesign } from '@expo/vector-icons';
import axios from 'axios'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

import colors from "../config/colors";

export default function PetProfile() {
    const navigation = useNavigation();
    const [profiles, setProfiles] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchId, setSearchId] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [searchedProfileIds, setSearchedProfileIds] = useState([]);
    const [searchOptions, setSearchOptions] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

   // Function to fetch profiles from the backend
    const fetchProfiles = async () => {
        try {
            // Make HTTP GET request to fetch profile data
           //  const response = await axios.get('http://192.168.1.98:3000/getPet');
             const response = await axios.get('http://192.168.254.23:3000/getPet');
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

    // Function to handle Pass Button - goes to next profile when pass is clicked
    const handlePassButton = () => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % profiles.length);
    };

    // Function to handle Like Button
    const LikeButton = ({ profileId, initialColor, changedColor }) => {
        const [liked, setLiked] = useState(false);

        useEffect(() => {
            // Check if profile is liked when component mounts
            profileId = JSON.stringify(currentIndex);
            AsyncStorage.getItem(profileId).then((result) => {
                if (result === 'liked') {
                    setLiked(true);
                }
            });
        }, [profileId]);

        const handlePress = () => {
            setLiked(!liked);
            // Save liked state to AsyncStorage
            profileId = JSON.stringify(currentIndex);
            AsyncStorage.setItem(profileId, liked ? 'unliked' : 'liked');
        };

        return (
            <TouchableOpacity
                style={[styles.likeButton, { backgroundColor: liked ? changedColor : initialColor }]}
                onPress={handlePress}
            >
                <Text style={[ { color: liked ? 'white' : 'black' }]}>{liked ? 'Liked' : 'Like'}</Text>
            </TouchableOpacity>
        );
    };

    const ProfileScreen = ({ profileId }) => {
        return (
            <View style={styles.likeContainer}>
                {/* Profile content */}
                <LikeButton profileId={profileId} initialColor="transparent" changedColor="black" />
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
        <View>
        {/* {renderCurrentProfile()} */}
        <View >
        {/* <Icon style={styles.backIcon}name="keyboard-arrow-left" size={40} color="black" onPress={prevProfile}/> */}
        {/* <Icon style={styles.nextIcon} name="keyboard-arrow-right" size={40} color="black" onPress={nextProfile}/> */}
        </View>
        </View>


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

        {/* Pass and Like Button Container */}
        <View style={styles.buttonContainer}>
            {/* Pass Button */}
            <View style={styles.buttonItem}>
                <TouchableOpacity onPress={handlePassButton}style={styles.button}>
                <Text>Pass</Text>
                </TouchableOpacity>
            </View>
            {ProfileScreen(currentIndex)}

             {/* Like Button */}
            <View style={styles.buttonItem}>
            </View>
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
    backIcon:{
       // marginLeft: 350,
       //marginTop: -270,
       //paddingHorizontal: 10,
     //  alignSelf: 'flex-start',
    },
    //Pass and Like Button Styling
    buttonItem: {
        width: '40%',
        paddingHorizontal: 10,
        paddingLeft: 15,
        marginLeft: 27,
        borderRadius: 5,
        marginTop: 250,
        marginLeft: 50,
    },
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
        // marginTop: 12,
        // marginTop: -1,
    },
    likeContainer:{
        borderRadius: 20,
        borderColor : 'grey',
        borderWidth:  0.5,
        width: '35%',
        height: '7.5%',
    },
    likeButton: {
        padding: 12,
        borderRadius: 20,
        marginBottom: -8,
        alignItems: 'center',

    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      profilesContainer: {
        flex: 1, // This allows the profile container to occupy the remaining space
        // alignItems: 'center',
        // justifyContent: 'center',
       // marginRight: 50,
       left: -30,
      },
})