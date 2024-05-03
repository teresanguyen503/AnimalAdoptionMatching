import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MenuItem from '../components/MenuItem';
import SafeScreen from '../components/SafeScreen'; 
import Icon from '../components/Icon';

import colors from '../config/colors'; 

function MenuPublicScreen(props) {
    const menuItems = [
        {
            title: "Dogs", 
            icon: {
                name: "dog", 
                backgroundColor: colors.mediumblue
            }
        },
        {
            title: "Cats", 
            icon: {
                name: "cat", 
                backgroundColor: colors.mediumblue
            }
        },
        {
            title: "Other Animals", 
            icon: {
                name: "turtle", 
                backgroundColor: colors.mediumblue
            }
        },
        {
            title: "Search", 
            icon: {
                name: "card-search", 
                backgroundColor: colors.black
            }, 
            
        }, 
        {
            title: "Add or Update Animals", 
            icon: {
                name: "plus", 
                backgroundColor: colors.error
            }
        }, 
        {
            title: "Add or Update News", 
            icon: {
                name: "newspaper-plus", 
                backgroundColor: colors.error
            }
        }, 
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
                            onPress={() => console.log("Will later replace this with navigation.")}
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
            <View style={styles.separator} />
            <MenuItem 
                title="Log Out"
                onPress={() => console.log("Will later replace this with navigation too.")}
                IconComponent={<Icon name="logout" backgroundColor={colors.lightgray} />}
            />
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