import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import SafeScreen from '../components/SafeScreen';
import SubmitButton from '../components/SubmitButton';
import AppFormField from '../components/AppFormField';
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function CreateAccountScreen(props) {
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 
    return (
        <SafeScreen>
            <View style={styles.container}>
            <Formik
                initialValues={{accountType: '', email: '', password: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                { () => (
                    <>
                        <AppFormField 
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAddress"
                        />
                        <View style={styles.passwordContainer}>
                            <View style={styles.password}>
                                <AppFormField 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="lock"
                                    name="password"
                                    placeholder="Password"
                                    secureTextEntry={!passwordVisible}
                                    textContentType="password"
                                />
                            </View>
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <MaterialCommunityIcons
                                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={colors.black}
                                />
                            </TouchableOpacity>
                        </View>
                        <SubmitButton title="Create Account" />
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
    passwordContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    password: {
        flex: 1, 
        paddingRight: 5
    }
})

export default CreateAccountScreen;