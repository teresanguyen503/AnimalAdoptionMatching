import React from 'react';
import { Text, StyleSheet } from 'react-native';
import colors from '../config/colors';

function ErrorMessage({ error, visible }) {
    if (!visible || !error) return null; 
    return (
        <Text style={styles.error}>
            {error}
        </Text>
    );
}

const styles = StyleSheet.create({
    error: {
        color: colors.error
    }
})

export default ErrorMessage;