import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { useRoute } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton } from '../components/forms'; 
import newPassword from '../api/newPassword';

const validationSchema = Yup.object().shape({
    password: Yup.string().required().min(6).label("Password")
}); 

function ResetPasswordScreen() {
    const navigation = useNavigation();
    const route = useRoute(); 
    const { email } = route.params; 

    const handleSubmit = async (values) => {
        try {
            const response = await newPassword.newPasswordApi(values.password, email); 

            if (!response.ok) {
                console.log(response); 
                alert('Something went wrong. Try again.'); 
            } else {
                alert('Great! Now log back in using your new password.');
                navigation.navigate("Login"); 
            } 
        } catch (error) {
            alert('Something went wrong.'); 
            console.log('Reset password error1: ', error); 
        }
    }

    return (
        <SafeScreen>
            <View style={styles.container}>
                <Formik 
                    initialValues={{ password: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    { () => (
                        <>
                            <Text style={styles.text}>Create a new password.</Text>
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