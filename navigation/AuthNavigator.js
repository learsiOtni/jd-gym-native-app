import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen, SignupScreen, ForgotScreen } from '../screens';
import { Colors, Spacing, Typography } from '../styles';

const Stack = createStackNavigator();
const AuthNavigator = () => {
    return(
        <Stack.Navigator initialRouteName='Login' screenOptions={{
            title: null,
            headerStyle: styles.headerStyle,
            headerBackImage: () => <Image style={styles.backImage} source={require('../assets/images/back.png')} />,
            headerBackTitleStyle: styles.backTitle,
        }}>

            <Stack.Screen 
                name="Login" 
                component={LoginScreen}
                options={{
                    //header: () => null,
                }}
            />

            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Forgot" component={ForgotScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigator;

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: Colors.PRIMARY,
        shadowColor: 'transparent',
        elevation: 0, // for android
    },
    backImage: {
        marginLeft: 30,
        tintColor: Colors.ACCENT,
    },
    backTitle: {
        color: Colors.ACCENT,
        paddingLeft: 10,
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
    }
});