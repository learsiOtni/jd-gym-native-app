import React, {useState} from 'react';
import { View, StyleSheet } from 'react-native';

import InputField from './InputField';
import Button from './Button';

const Form = props => {

    const {
        title,
        children
    } = props;

    const submitHandler = () => {

    }

    return(
        <View style={styles.container}>

            {children}
            
            <Button style={{marginTop: 10}} onPress={submitHandler}>
                {title}
            </Button>
        </View>
    )
};

const styles = StyleSheet.create({

});

export default Form;