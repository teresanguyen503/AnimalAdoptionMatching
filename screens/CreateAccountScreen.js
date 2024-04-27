import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

import SafeScreen from '../components/SafeScreen';
import { AppFormField, ErrorMessage, SubmitButton} from '../components/forms'; 
import colors from '../config/colors';
import userAccounts from '../api/userAccounts';

const validationSchema = Yup.object().shape({
    accountType: Yup.string().notOneOf(['']).required("Please select an account type."),
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password"), 
    securityQuestion: Yup.string().notOneOf(['']).required("Please choose a security question"), 
    securityAnswer: Yup.string().required("Please input an answer to a security question.")
}); 

function CreateAccountScreen(props) {
    const navigation = useNavigation();

    const [passwordVisible, setPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 

    const formSubmit = async (user, { resetForm }) => {
        try {
            const result = await userAccounts.addUser(user); 
            if (!result.ok) {
                if (result.problem === 'CLIENT_ERROR' && result.status === 409) {
                    alert('Email already exists. Please use a different email');
                } else {
                    console.log(result.status); 
                    alert('Could not register user. Try again');
                }
            } else {
                alert('Success');
            } 
        } catch (error) {
            console.error('Error occurred: ', error); 
            alert('An error occurred. Please try again later.'); 
        }

        resetForm(); 
    }; 

    return (
        <SafeScreen>
            <View style={styles.container}>
            <Formik
                initialValues={{accountType: '', email: '', password: '', securityQuestion: '', securityAnswer: ''}}
                onSubmit={formSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, values, errors, touched }) => (
                    <>
                        <Picker selectedValue={values.accountType} onValueChange={handleChange('accountType')}>
                            <Picker.Item label="Please select an account type." value="" />
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
                        <Picker itemStyle={{ fontSize: 16 }} selectedValue={values.securityQuestion} onValueChange={handleChange('securityQuestion')}>
                            <Picker.Item label="Select a security question." value="" />
                            <Picker.Item label="What is your mother's maiden name?" value="What is your mother's maiden name?" />
                            <Picker.Item label="What city were you born in?" value="What city were you born in?" />
                            <Picker.Item label="What middle school did you attend?" value="What middle school did you attend?" /> 
                            <Picker.Item label="What is the name of our first pet?" value="What is the name of our first pet?" /> 
                            <Picker.Item label="What was your first car?" value="What was your first car?" /> 
                            <Picker.Item label="What was your first job?" value="What was your first job?" />  
                        </Picker>
                        <ErrorMessage error={errors.securityQuestion} visible={touched.securityQuestion} />
                        <AppFormField 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    // icon="lock"
                                    name="securityAnswer"
                                    placeholder="Answer to security question"
                        />
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
})

export default CreateAccountScreen;