import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

import MenuItem from '../components/MenuItem';
import SafeScreen from '../components/SafeScreen';
import Icon from '../components/Icon';
import AuthContext from '../auth/context';

import colors from '../config/colors';

function MenuPublicScreen(props) {
    const { user, setUser } = useContext(AuthContext);
    const navigation = useNavigation();

    const menuItems = [
        {
            title: "View All Animals",
            icon: {
                name: "turtle",
                backgroundColor: colors.mediumblue
            },
            nav: "AdminPetProfile"
        },
        {
            title: "Search",
            icon: {
                name: "card-search",
                backgroundColor: colors.black
            },
            nav: "SearchPet"
        },
        {
            title: "Add Animals",
            icon: {
                name: "plus",
                backgroundColor: colors.error
            },
            nav: "AddPet"
        },
        {
            title: "Update Animals",
            icon: {
                name: "update",
                backgroundColor: colors.error
            },
            nav: "AddPet"
        },
        {
            title: "Add News",
            icon: {
                name: "newspaper-plus",
                backgroundColor: colors.error
            },
            nav: "AddNews"
        },
        {
            title: "Update News",
            icon: {
                name: "newspaper-variant",
                backgroundColor: colors.error
            },
            nav: "AddNews"
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
                            onPress={() => navigation.navigate(item.nav)}
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