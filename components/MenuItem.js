import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';

import colors from '../config/colors';

function MenuItem({ title }) {
    return (
        <TouchableHighlight>
            <View style={styles.container}>
                <Text style={styles.text}>{ title }</Text>
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
    text: {
        fontWeight: 500
    }
})

export default MenuItem;