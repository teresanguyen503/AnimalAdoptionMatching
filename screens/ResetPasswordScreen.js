import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 
import newPassword from '../api/newPassword';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(6).label("Password")
}); 

function ResetPasswordScreen() {
    const navigation = useNavigation();

    const [passwordVisible, setPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 

    const route = useRoute(); 
    const { email } = route.params; 

    const handleSubmit = async (values) => {
        try {
            const response = await newPassword.newPasswordApi(values.password, email); 

            if (!response.ok) {
                console.log(response); 
                alert('Something went wrong. Try again.'); 
            } else {
                alert('Great! Now log back in using your new password.');
                navigation.navigate("Login"); 
            } 
        } catch (error) {
            alert('Something went wrong.'); 
            console.log('Reset password error1: ', error); 
        }
    }

    return (
        <SafeScreen>
            <View style={styles.container}>
                <Formik 
                    initialValues={{ password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    { () => (
                        <>
                            <Text style={styles.text}>Create a new password.</Text>
                                <View style={styles.passwordContainer}>
                                    <View style={styles.password}>
                                        <AppFormField style={{ flex: 1 }}
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            icon="lock"
                                            name="password"
                                            placeholder="Password"
                                            secureTextEntry
                                            textContentType="password" 
                                        />
                                        <TouchableOpacity 
                                                    style={styles.eyeOutline}
                                                    onPress={togglePasswordVisibility}
                                                    >
                                                    <MaterialCommunityIcons
                                                    name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                                    size={20}
                                                    color={colors.black}
                                                    />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            <SubmitButton title="Reset Password" />
                        </>
                    )}
                </Formik>
            </View>
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    }, 
    eyeOutline: {
        position: 'absolute', 
        top: 25, 
        right: 25
    }, 
    passwordContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    password: {
        flex: 1, 
        paddingRight: 5
    }, 
    text: {
        fontSize: 20
    }
})

export default ResetPasswordScreen;