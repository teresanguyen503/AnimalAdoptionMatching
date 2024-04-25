import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function LoginScreen(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(false); 

    return (
        <SafeScreen>
            <View style={styles.container}>
                <Formik 
                    initialValues={{ email: '', password: '' }}
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
                            <AppFormField 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                textContentType="password" 
                            />
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