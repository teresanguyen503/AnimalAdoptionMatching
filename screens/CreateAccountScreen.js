import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker';

import SafeScreen from '../components/SafeScreen';
import { AppFormField, SubmitButton} from '../components/forms'; 
import colors from '../config/colors';

const validationSchema = Yup.object().shape({
    accountType: Yup.string().required("Please select an account type"),
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function CreateAccountScreen(props) {
    const [passwordVisible, setPasswordVisible] = useState(false); 

    const togglePasswordVisibility = () => {
        setPasswordVisible(!passwordVisible); 
    }; 
    return (
        <SafeScreen>
            <View style={styles.container}>
            <Formik
                initialValues={{accountType: '', email: '', password: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >
                {({ handleChange, values }) => (
                    <>
                        <Text style={styles.text}>Join the Pack:</Text>
                        <Text style={styles.text}>Choose Your Role, Rescue a Soul!</Text>
                        <Picker selectedValue={values.accountType} onValueChange={handleChange('accountType')}>
                            <Picker.Item label="Admin" value="admin" />
                            <Picker.Item label="Public" value="public" /> 
                        </Picker>
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
                                <AppFormField 
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    icon="lock"
                                    name="password"
                                    placeholder="Password"
                                    secureTextEntry={!passwordVisible}
                                    textContentType="password"
                                />
                            </View>
                            <TouchableOpacity onPress={togglePasswordVisibility}>
                                <MaterialCommunityIcons
                                name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={20}
                                color={colors.black}
                                />
                            </TouchableOpacity>
                        </View>
                        <SubmitButton title="Create Account" />
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
    passwordContainer: {
        flexDirection: 'row', 
        alignItems: 'center'
    }, 
    password: {
        flex: 1, 
        paddingRight: 5
    }, 
    text: {
        fontSize: 27, 
        textAlign: 'center'
    }
})

export default CreateAccountScreen;