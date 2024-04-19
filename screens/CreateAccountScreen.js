import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

import SafeScreen from '../components/SafeScreen';
import { AppFormField, ErrorMessage, SubmitButton} from '../components/forms'; 
import colors from '../config/colors';
import userAccounts from '../api/userAccounts';

const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Please select an account type"),
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function CreateAccountScreen(props) {
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 

    const formSubmit = async (user) => {
        try {
            const result = await userAccounts.addUser(user); 
            console.log(result.problem); 
            if (!result.ok) {
                if (result.problem === 'CLIENT_ERROR' && result.status === 409) {
                    alert('Email already exists. Please use a different email');
                } else {
                    alert('Could not register user. Try again');
                }
            } else {
                alert('Success');
            } 
        } catch (error) {
            console.error('Error occurred: ', error); 
            alert('An error occurred. Please try again later.'); 
        }
    }; 

    return (
        <SafeScreen>
            <View style={styles.container}>
            <Formik
                initialValues={{accountType: 'admin', email: '', password: ''}}
                onSubmit={values => formSubmit(values)}
                validationSchema={validationSchema}
            >
                {({ handleChange, values, errors, touched }) => (
                    <>
                        <Text style={styles.text}>Join the Pack:</Text>
                        <Text style={styles.text}>Choose Your Role, Rescue a Soul!</Text>
                        <Picker selectedValue={values.accountType} onValueChange={handleChange('accountType')}>
                            <Picker.Item label="Admin" value="admin" />
                            <Picker.Item label="Public" value="public" /> 
                        </Picker>
                        <ErrorMessage error={errors.accountType} visible={touched.accountType} />
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
    }, 
    text: {
        fontSize: 27, 
        textAlign: 'center'
    }
})

export default CreateAccountScreen;