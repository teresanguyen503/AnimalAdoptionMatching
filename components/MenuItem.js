import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function MenuItem({ IconComponent, title }) {
    return (
        <TouchableHighlight>
            <View style={styles.container}>
                {IconComponent}
                <View style={styles.detailsContainer}>
                    <Text style={styles.text}>{ title }</Text>
                </View>
            </View>
        </TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row", 
        padding: 15, 
        backgroundColor: colors.white
    }, 
    detailsContainer: {
        marginLeft: 15, 
        justifyContent: "center"
    },
    text: {
        fontWeight: 500
    }
})

export default MenuItem;