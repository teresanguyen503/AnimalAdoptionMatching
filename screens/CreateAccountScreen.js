import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik'; 
import * as Yup from 'yup'; 

const validationSchema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"), 
    password: Yup.string().required().min(6).label("Password")
}); 

function CreateAccountScreen(props) {
    return (
        <View style={styles.container}>
            <Formik
                initialValues={{email: '', password: ''}}
                onSubmit={values => console.log(values)}
                validationSchema={validationSchema}
            >

            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        
    }
})

export default CreateAccountScreen;