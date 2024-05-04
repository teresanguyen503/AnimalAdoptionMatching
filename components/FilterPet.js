import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, ScrollView} from 'react-native';
import axios from 'axios';
import { useSafeAreaInsets } from 'react-native-safe-area-context'; 

export default function FilterPet({onFilteredProfiles}){
    const insets = useSafeAreaInsets(); 
    const tabBarHeight = insets.bottom + 20; // Height of the bottom tab navigation

    return (
        <View>
            <View style={styles.filteredProfileContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: tabBarHeight }}>
                  {onFilteredProfiles.map(profile => (
                 <View key={profile._id} style={{  flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                 <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                 <Image
                     source={{ uri: profile.image }}
                     style={{ width: 50, height: 50, borderRadius: 25, marginRight: 10 }}
                 />
                 </View>
                 <View>
                     <Text style={{ fontWeight: 'bold' }}>{profile.name}</Text>
                     {profile.isdate !== undefined && (
                     <Text style={styles.profileData}>Date Available: {new Date(profile.isdate).toDateString()}</Text>
                     )}
                     <Text>Description: {profile.desc}</Text>
                     <Text>Animal Type: {profile.speciesName}</Text>
                     <Text>Breed: {profile.selectedItem.label}</Text>
                     <Text>Disposition: {profile.disposition}</Text>
                 </View>

            </View>
            ))}
                </ScrollView>
              </View>
        </View>
    );
};

const styles = StyleSheet.create({
    filteredProfileContainer: {
        width: "100%",
        maxHeight: 350,
    },

})