import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { useNavigation } from "@react-navigation/native";

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 
import login from '../api/login'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function LoginScreen(props) {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    const handleSubmit = async (values) => {
        try {
            const response = await login.loginApi(values); 

            if (!response.ok) {
                if (response.status === 404) {
                    alert('You need to register for an account to login');
                } else {
                    alert('Invalid password. Try again.');
                }
            } else {
                setIsLoggedIn(true); 
                alert('Success');
                navigation.navigate("Home")
            } 
        } catch (error) {
            alert('Invalid email or password'); 
            console.log('Login error: ', error); 
        }
    }

    return (
        <SafeScreen>
            <View style={styles.container}>
                <Formik 
                    initialValues={{ email: '', password: '' }}
                    onSubmit={handleSubmit}
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
                            <AppFormField 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                textContentType="password" 
                            />
                            <TouchableHighlight 
                                onPress={() => navigation.navigate("ForgotPassword")}
                            >
                                <Text>Forgot Password?</Text>
                            </TouchableHighlight>
                            <SubmitButton title="Login" />
                        </>
                    )}
                </Formik>
            </View>
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10, 
    }
})

export default LoginScreen; 