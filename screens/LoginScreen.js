import React from 'react';
import { StyleSheet } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(4).label("Password")
}); 

function LoginScreen(props) {
    return (
        <SafeScreen>
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
            
        </SafeScreen>
    );
}

export default LoginScreen; 