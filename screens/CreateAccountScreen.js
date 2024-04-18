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

    // function handleSubmit(values) {
        // const userData = {
        //     accountType: values.accountType, 
        //     email: values.email, 
        //     password: values.password
        // }; 
    //     const userData = new FormData(); 
    //     userData.append('accountType', values.accountType); 
    //     userData.append('email', values.email); 
    //     userData.append('password', values.password);

    //     axios
    //         .post('http://192.168.1.12:3000/register', userData)
    //         .then(res => console.log(res.data))
    //         .catch(e => console.log(e)); 
    // }

    // const formSubmit = async (user) => {
    //     const result = await userAccounts.addUser(user); 
    //     console.log(result.data); 
    //     if (!result.ok) return alert('Could not register user. Try again'); 
    //     alert('Success'); 
    // }; 

    // const handleSubmit = async (values) => {
    //     try {
    //     const data = new FormData(); 
    //     data.append('accountType', values.accountType); 
    //     data.append('email', values.email); 
    //     data.append('password', values.password); 

    const formSubmit = async (values) => {
        try {
            const jsonData = JSON.stringify(values); 
            const result = await axios.post("http://192.168.1.12:3000/register", jsonData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }); 
        console.log(result.data); 
        alert("Success"); 
        } catch (error) {
            console.error("An error occured while submitting the form:", error); 
            alert("An error occurred"); 
        }
    }

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