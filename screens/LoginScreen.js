import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    View, StyleSheet,
    Animated, KeyboardAvoidingView,
    Platform, Keyboard, TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { Logo, Text, Button, InputField } from '../components'
import { Colors } from '../styles'
import { AuthContext } from '../utils/AuthProvider';

const LoginScreen = ({ navigation }) => {

    //Animation
    const slideUpValue = useRef(new Animated.Value(0)).current;
    const fadeValue = useRef(new Animated.Value(0)).current;
    const fadeLogo = useRef(new Animated.Value(0)).current;


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const emailHandler = text => {
        setEmail(text);
    };

    const passHandler = text => {
        setPassword(text);
    };

    // Animation to move logo when typing for login.
    const moveLogo = (value) => {
        Animated.timing(fadeLogo, {
            toValue: value,
            duration: 400,
            useNativeDriver: true
        }).start();
    };
    // -----------------------------------

    useEffect( () => {
        Animated.sequence([
            Animated.timing(slideUpValue, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                useNativeDriver: true
            }),
            Animated.timing(fadeValue, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true
            })
        ]).start();
        //Animation Ends
    }, []);

    // LOGO ANIMATION
    useEffect( () => {
        const keyboardShown = Keyboard.addListener(
            'keyboardWillShow', () => {
                moveLogo(100);
            }
        );
        const keyboardGone = Keyboard.addListener(
            'keyboardWillHide', () => {
                moveLogo(0);
            }
        );
        return () => {
            keyboardShown.remove();
            keyboardGone.remove();
        };
    }, []);

    const auth = useContext(AuthContext);
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.screen}
            >

                <Animated.View style={[
                    {
                        transform: [{
                            translateY: slideUpValue.interpolate({
                                inputRange: [0, 1],
                                outputRange: [1200, 100]
                            })
                        }]
                    },
                    styles.logoContainer
                ]}>
                    <Logo animated style={{
                        transform: [{
                            translateY: fadeLogo,
                        }]
                        }}/>
                </Animated.View>

                <Animated.View style={{ opacity: fadeValue }}>
                    <InputField
                        label="Email"
                        placeholder="Enter your email address"
                        onChangeText={emailHandler}
                        value={email}
                    />

                    <InputField
                        label="Password"
                        placeholder="Enter your password"
                        onChangeText={passHandler}
                        value={password}
                        secureTextEntry

                    />

                    <Button style={{marginTop: 10}} onPress={auth.signIn.bind(this, email, password)}>LOGIN</Button>

                    <View style={styles.linksContainer}>
                        <TouchableOpacity onPress={ () => navigation.navigate('Forgot') }>
                            <Text small white2 >Forgot Password</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={ () => navigation.navigate('Signup') }>
                            <Text small white2>Not a Member</Text>
                        </TouchableOpacity>
                    </View>
                </Animated.View>

                <View style={{ height: 300 }} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>

    )

};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: 'center', // Needed for KeyboardAvoiding
    },
    logoContainer: {
        height: 250,
        padding: 20,
        marginVertical: 50,
    },
    linksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
    },
});

export default LoginScreen;