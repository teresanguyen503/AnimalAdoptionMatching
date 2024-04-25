import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
}); 

function ForgotPasswordScreen(props) {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text style={styles.text}>Enter the email that you want to reset the password for:</Text>
                <Formik 
                    initialValues={{ email: '' }}
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
    text: {
        fontSize: 20, 
        textAlign: 'center'
    }
})

export default ForgotPasswordScreen;