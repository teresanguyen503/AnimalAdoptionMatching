import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(6).label("Password")
}); 

function ResetPasswordScreen(props) {
    return (
        <SafeScreen>
            <View style={styles.container}>
                <Formik 
                    initialValues={{ password: '' }}
                    onSubmit={values => console.log(values)}
                    validationSchema={validationSchema}
                >
                    { () => (
                        <>
                            <Text style={styles.text}>Choose a new password.</Text>
                            <AppFormField 
                                autoCapitalize="none"
                                autoCorrect={false}
                                icon="lock"
                                name="password"
                                placeholder="Password"
                                secureTextEntry
                                textContentType="password" 
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
        fontSize: 20
    }
})

export default ResetPasswordScreen;