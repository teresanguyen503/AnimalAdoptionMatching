import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import SafeScreen from '../components/SafeScreen'; 

import colors from '../config/colors'; 

function MenuPublicScreen(props) {
    const menuItems = [
        {
            title: "Settings", 
            icon: {
                name: "format-list-bulleted", 
                backgroundColor: colors.black
            }, 
            
        }, 
        {
            title: "Stats", 
            icon: {
                name: "char-bar", 
                backgroundColor: colors.error
            }
        }
    ]
    return (
        <SafeScreen> 
            <View style={styles.container}>
                <FlatList 
                    data={menuItems}
                    keyExtractor={(menuItems) => menuItems.title}
                    ItemSeparatorComponent={styles.separator}
                />
            </View>
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }, 
    separator: {
        width: "100%", 
        height: 1,
        backgroundColor: colors.lightgray
    }
})

export default MenuPublicScreen;