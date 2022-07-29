import React, {useState, useRef, useEffect} from 'react';
import {
    View, StyleSheet,
    Animated, KeyboardAvoidingView,
    Platform, Keyboard, TouchableWithoutFeedback,
    TouchableOpacity
} from 'react-native';

import { Logo, Text, Button, InputField } from '../components'
import { Colors, Typography } from '../styles'

const ForgotScreen = () => {

    const fontSize = 32;
    const [email, setEmail] = useState();
    const resizeFont = useRef(new Animated.Value(fontSize)).current;

    const emailHandler = (text) => {
        setEmail(text);
    };

    const toggleResize = (value) => {
        Animated.spring( resizeFont, {
            toValue: value,
            useNativeDriver: false
            //duration: 500
        }).start();
    };

    useEffect( () => {
        const keyboardShown = Keyboard.addListener(
            'keyboardWillShow', () => {
                toggleResize(18);
            }
        );
        const keyboardGone = Keyboard.addListener(
            'keyboardWillHide', () => {
                toggleResize(fontSize);
            }
        );
        return () => {
            keyboardShown.remove();
            keyboardGone.remove();
        }
    }, [])

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView 
                style={styles.screen} 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <View style={{marginVertical: 10}}>
                    <Text animated title white style={{fontSize: resizeFont}}>
                        Forgot Password?
                    </Text>
                </View>

                <View>
                    <InputField
                        placeholder="Type your email"
                        onChangeText={emailHandler}
                        value={email}
                    />
                    <Button>SEND TO EMAIL</Button>
                </View>

            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )

};

const styles = StyleSheet.create({
    screen: {
        marginTop: -90,
        flex: 1,
        backgroundColor: Colors.PRIMARY,
        alignItems: "center",
        justifyContent: 'center', // Needed for KeyboardAvoiding
    },
});

export default ForgotScreen;