import React from 'react';
import { StyleSheet, View, Text, Image, FlatList} from 'react-native';
import axios from 'axios';


export default function FilterPet({onFilteredProfiles}){

    return (
        <View>
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