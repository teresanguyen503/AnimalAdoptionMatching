import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from "@react-navigation/native";

import SafeScreen from '../components/SafeScreen';
import { AppFormField, ErrorMessage, SubmitButton } from '../components/forms'; 
import resetPassword from '../api/resetPassword'

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    securityQuestion: Yup.string().notOneOf(['']).required("Please choose a security question"), 
    securityAnswer: Yup.string().required("Please input an answer to a security question.") 
}); 

function ForgotPasswordScreen(props) {
    const navigation = useNavigation();

    const handleSubmit = async (values) => {
        try {
            const response = await resetPassword.resetPasswordApi(values); 

            if (!response.ok) {
                if (response.status === 401) {
                    alert('That was not the security question you chose when creating your account.');
                }
                else if (response.status === 402) {
                    alert('Your answer did not match to your original answer.'); 
                }                 
                else if (response.status === 404) {
                    alert('The email you entered is not in our system.'); 
                }
            } else {
                alert('Great! Now lets reset your password.');
                navigation.navigate("Reset"); 
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
                    initialValues={{ email: '', securityQuestion: '', securityAnswer: '' }}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                >
                    { ({ handleChange, values, errors, touched }) => (
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
                            <Picker itemStyle={{ fontSize: 16 }} selectedValue={values.securityQuestion} onValueChange={handleChange('securityQuestion')}>
                                <Picker.Item label="Select your security question." value="" />
                                <Picker.Item label="What is your mother's maiden name?" value="What is your mother's maiden name?" />
                                <Picker.Item label="What city were you born in?" value="What city were you born in?" />
                                <Picker.Item label="What middle school did you attend?" value="What middle school did you attend?" /> 
                                <Picker.Item label="What is the name of our first pet?" value="What is the name of our first pet?" /> 
                                <Picker.Item label="What was your first car?" value="What was your first car?" /> 
                                <Picker.Item label="What was your first job?" value="What was your first job?" />  
                            </Picker>
                            <ErrorMessage error={errors.securityQuestion} visible={touched.securityQuestion} />
                            <AppFormField 
                                autoCapitalize="none"
                                autoCorrect={false}
                                name="securityAnswer"
                                placeholder="Answer to security question"
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