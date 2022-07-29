import React, { useState, } from 'react';
import { View, StyleSheet, 
    KeyboardAvoidingView, Keyboard,
    TouchableWithoutFeedback } from 'react-native';

import { Text, InputField, Form } from '../components';
import { Colors } from '../styles';
import { AuthContext } from '../utils/AuthProvider';

const SignupScreen = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');

    const usernameHandler = text => {
        setUsername(text);
    };

    const emailHandler = text => {
        setEmail(text);
    };

    const passwordHandler = text => {
        setPassword(text);
    };

    const confirmPassHandler = text => {
        setConfirmPass(text);
    };

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView  
                style={styles.container} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
        
                <View style={{marginBottom: 30, marginTop: -30}}>
                    <Text title white style={{fontSize: 32}}>Sign Up</Text>
                </View>

                <Form title="SIGN UP">
                    <InputField
                        label="Username"
                        placeholder="Enter your username"
                        onChangeText={usernameHandler}
                        value={username}
                    />

                    <InputField
                        label="Email"
                        placeholder="Enter your email address"
                        onChangeText={emailHandler}
                        value={email}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        onChangeText={passwordHandler}
                        value={password}
                        secureTextEntry
                    />

                    <InputField
                        style={{marginTop: -20}}
                        placeholder="Confirm your password"
                        onChangeText={confirmPassHandler}
                        value={confirmPass}
                        secureTextEntry
                    />
                </Form>

                <View style={{ height: 130 }} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        
    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SignupScreen;