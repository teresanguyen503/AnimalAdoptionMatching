import React, { useContext, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 
import login from '../api/login'
import colors from '../config/colors';
import AuthContext from '../auth/context';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function LoginScreen(props) {
    const navigation = useNavigation();
    const [isLoggedIn, setIsLoggedIn] = useState(false); 
    const [passwordVisible, setPasswordVisible] = useState(false);
    
    const authConext = useContext(AuthContext); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 

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
                const user = response.data.data; 
                authConext.setUser(user);
                alert('Success');
                navigation.navigate("HomeStack"); 
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
                            <View style={styles.passwordContainer}>
                                <View style={styles.password}>
                                    <AppFormField style={{ flex: 1 }}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        icon="lock"
                                        name="password"
                                        placeholder="Password"
                                        secureTextEntry={!passwordVisible}
                                        textContentType="password"
                                        fontSize={18} 
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
                            <TouchableWithoutFeedback
                                onPress={() => navigation.navigate("ForgotPassword")}
                            >
                                <Text style={styles.text}>Forgot Password?</Text>
                            </TouchableWithoutFeedback>
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
        color: colors.mediumblue
    }
})

export default LoginScreen; 