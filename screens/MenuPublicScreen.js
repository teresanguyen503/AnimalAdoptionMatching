import React from 'react';
import { FlatList, StyleSheet, Text, TouchableHighlight, View } from 'react-native';

import MenuItem from '../components/MenuItem';
import SafeScreen from '../components/SafeScreen'; 
import Icon from '../components/Icon';

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
                name: "chart-bar", 
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
                    renderItem={({ item }) => (
                        <MenuItem 
                            title={item.title}
                            IconComponent={
                                <Icon 
                                    name={item.icon.name}
                                    backgroundColor={item.icon.backgroundColor}
                                />
                            }
                        />
                    )}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
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