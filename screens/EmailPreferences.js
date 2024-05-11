import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function EmailPreferences() {
    const [selectedButton, setSelectedButton] = useState(null);
    const [frequency, setFrequency] = useState('');
    const [events, setEvents] = useState('');

    const handleFrequencyChange = async (selectedFrequency) => {
        setFrequency(selectedFrequency);
        try {
          await AsyncStorage.setItem('emailFrequency', selectedFrequency);
        } catch (error) {
          console.error('Error saving email frequency:', error);
        }
    };

    const handleEventsChange = async (selectedEvent) => {
        setEvents(selectedEvent);
        try {
          await AsyncStorage.setItem('eventType', selectedEvent);
        } catch (error) {
          console.error('Error saving event type:', error);
        }
    };



    return(
        <View>
            <View style={styles.header}>
                <Text style={styles.emailHeading}>Email Preferences</Text>
            </View>
            <View style={styles.contain}>
                <Text style={styles.heading}>Choose your email preferences</Text>
                <Text>Choose how often would you like to recieve updates</Text>
            </View>
            <View style={styles.contain}>
                <Text style={styles.heading}>Frequency</Text>
            </View>

            <View style={styles.speciesContainer}>
                <View style={styles.item}>
                    <TouchableOpacity style={[styles.accountButton, selectedButton === 1 && styles.selectedButton]}
                    onPress={() => handleFrequencyChange('daily')}
                    >
                    <Text style={styles.buttonText}> {frequency === 'daily' ? '✓' : ''} Daily</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={[styles.accountButton, selectedButton === 2 && styles.selectedButton]}
                    onPress={() => handleFrequencyChange('weekly')}
                    >
                    <Text style={styles.buttonText}>{frequency === 'weekly' ? '✓' : ''}Weekly</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.item}>
                    <TouchableOpacity style={[styles.accountButton, selectedButton === 3 && styles.selectedButton]}
                    onPress={() => handleFrequencyChange('monthly')}
                    >
                    <Text style={styles.buttonText}>{frequency === 'monthly' ? '✓' : ''}Monthly</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.contain}>
                <Text>Select the type of emails you would like to recieve from us</Text>
            </View>

            <View style={styles.speciesContainer}>
                <View style={styles.item}>
                    <TouchableOpacity style={[styles.accountButton, selectedButton === 1 && styles.selectedButton]}
                     onPress={() => handleEventsChange('AdoptablePetUpdates')}
                    >
                    {/* <Text style={styles.buttonText}>Adoptable Pet Updates</Text> */}
                     <Text style={styles.buttonText}> {events === 'AdoptablePetUpdates' ? '✓' : ''} Adoptable Pet Updates</Text>
                    </TouchableOpacity>
                </View>


                <View style={styles.item}>
                    <TouchableOpacity style={[styles.accountButton, selectedButton === 3 && styles.selectedButton]}
                       onPress={() => handleEventsChange('AdoptionEvents')}
                    >
                    {/* <Text style={styles.buttonText}>Adoption Events</Text> */}
                     <Text style={styles.buttonText}> {events === 'AdoptionEvents' ? '✓' : ''} Adoption Events</Text>
                    </TouchableOpacity>
                </View>


            </View>



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
        paddingTop: 20,
        paddingLeft: 10,
    },
    emailHeading: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
    },
    contain: {
        marginLeft: 18,
    },
    heading: {
        marginTop:22,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
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
    speciesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
        marginBottom: 12,
        marginTop: -7,
    },

    item:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,

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