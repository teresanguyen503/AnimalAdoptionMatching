import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Image, TouchableOpacity, Platform, ScrollView} from 'react-native';
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

    // Function to handle "Next Profile" button press
    const handleNextProfile = () => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % profiles.length);
    };

    // Function to handle "Previous Profile" button press
    const handlePreviousProfile = () => {
        setCurrentIndex(currentIndex => (currentIndex - 1) % profiles.length);
    };

    // Function to handle Pass Button - goes to next profile when pass is clicked
    const handlePassButton = () => {
        setCurrentIndex(currentIndex => (currentIndex + 1) % profiles.length);

    };

return(
    <ScrollView>
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

         {/* arrow button for previous profile */}
         {currentIndex > 0 && (
            <Icon style={styles.backIcon} name="keyboard-arrow-left" size={40} color="black" onPress={handlePreviousProfile}/>
        )}

        {/* arrow button for next profile */}
        {currentIndex == 0 && (
            <Icon style={styles.firstNextIcon} name="keyboard-arrow-right" size={40} color="black" onPress={handleNextProfile}/>
        )}
        {currentIndex > 0 && (
            <Icon style={styles.nextIcon} name="keyboard-arrow-right" size={40} color="black" onPress={handleNextProfile}/>
        )}
        </View>

        {/* Pass Button */}
        <View style={styles.buttonContainer}>
            <View style={styles.buttonItem}>
                <TouchableOpacity onPress={handlePassButton}style={styles.button}>
                <Text>Pass</Text>
                </TouchableOpacity>
            </View>


        </View>






    </View>
    </ScrollView>
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
    // profile display container
    profileContainer:{
        borderRadius: 12,
        borderColor : 'grey',
        borderWidth:  0.5,
        width: 300,
        paddingBottom: 15,
        marginLeft: Platform.OS === 'ios' ? 65 : 50,
        marginTop: Platform.OS === 'ios' ? 60 : 20,
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
        marginLeft: 125,
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
        textTransform: 'uppercase',
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
        marginTop: -270,

    },
    firstNextIcon:{
        marginLeft: Platform.OS === 'ios' ? 380 : 350,
        marginTop: Platform.OS === 'ios' ? -270 : -270,

    },
    //
    buttonItem: { // Adjusting the item width to achieve a side-by-side layout
        width: '40%',
        paddingHorizontal: 10,
        paddingLeft: 15,
        marginLeft: 27,
        // marginTop: 250,
        borderRadius: 5,
        marginTop: Platform.OS === 'ios' ? 320 : 250,

    },
    buttonContainer: { // Container that controls the items
        flexDirection: 'row', // Align children from left to right
        flexWrap: 'wrap',
        alignItems: 'flex-start', // Align children to the start of the container's cross axis
        marginBottom: 12,
    },
    button: {
        backgroundColor: 'transparent',
        padding: 10,
        borderRadius: 20,
        borderWidth: 0.5,
        borderColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
    },

})