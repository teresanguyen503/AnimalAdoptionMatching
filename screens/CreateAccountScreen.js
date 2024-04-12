import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import AppTextInput from '../components/AppTextInput';
import SafeScreen from '../components/SafeScreen';
import AppButton from '../components/AppButton';

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function CreateAccountScreen(props) {
    return (
        <SafeScreen style={styles.container}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                { ({setFieldTouched, handleChange, errors, touched}) => (
                    <>
                        <AppTextInput 
                            onBlur={() => setFieldTouched("email")}
                            onChangeText={handleChange("email")}
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="email"
                            keyboardType="email-address"
                            name="email"
                            placeholder="Email"
                            textContentType="emailAdress"
                        />
                        <AppTextInput 
                            onBlur={() => setFieldTouched("password")}
                            onChangeText={handleChange("password")}
                            autoCapitalize="none"
                            autoCorrect={false}
                            icon="lock"
                            name="password"
                            placeholder="Password"
                            secureTextEntry
                            textContentType="password"
                        />
                        <AppButton title="Create Account" onPress={console.log("Pressed button")} />

                    </>
                )}
            </Formik>
        </SafeScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default CreateAccountScreen;