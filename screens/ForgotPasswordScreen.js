import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 
import resetPassword from '../api/resetPassword'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
}); 

function ForgotPasswordScreen(props) {
    const handleSubmit = async (values) => {
        try {
            const response = resetPassword.resetPasswordApi(values); 

            if (!response.ok) {
                alert('Failed to initiate password reset');
            } else {
                alert('Check your email to continue to reset your password.');
            } 
        } catch (error) {
            alert('Something went wrong.'); 
            console.log('Reset password error: ', error); 
        }
    }
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Text style={styles.text}>Enter the email that you want to reset the password for:</Text>
                <Formik 
                    initialValues={{ email: '' }}
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