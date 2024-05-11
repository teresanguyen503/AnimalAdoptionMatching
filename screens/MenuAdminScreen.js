import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import MenuItem from '../components/MenuItem';
import SafeScreen from '../components/SafeScreen'; 
import Icon from '../components/Icon';
import AuthContext from '../auth/context';

import colors from '../config/colors'; 

function MenuPublicScreen(props) {
    const { user, setUser } = useContext(AuthContext); 

    const menuItems = [
        {
            title: "View All Animals", 
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
            title: "Add Animals", 
            icon: {
                name: "plus", 
                backgroundColor: colors.error
            }
        }, 
        {
            title: "Update Animals", 
            icon: {
                name: "update", 
                backgroundColor: colors.error
            }
        }, 
        {
            title: "Add News", 
            icon: {
                name: "newspaper-plus", 
                backgroundColor: colors.error
            }
        },
        {
            title: "Update News", 
            icon: {
                name: "newspaper-variant", 
                backgroundColor: colors.error
            }
        },  
    ]
    return (
        <SafeScreen> 
            <MenuItem 
                title={user[1]}
                IconComponent={<Icon name="account" backgroundColor={colors.lightgray} />}
            />
            <View style={styles.separator} />
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
                IconComponent={<Icon name="logout" backgroundColor={colors.lightgray} />}
                onPress={() => setUser(null)}
            />
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
    }, 
    separator: {
        width: "100%", 
        height: 1,
        backgroundColor: colors.lightgray
    }
})

export default MenuPublicScreen;