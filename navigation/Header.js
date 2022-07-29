import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Logo } from '../components';
import { Colors } from '../styles';

const Header = () => {
    return(
        <View style={styles.header}>
            <View style={styles.logoContainer}>
                <Logo style={{height: 31, width: 96}}/>
            </View>
        </View>
    );
};

const styles= StyleSheet.create({
    header: {
        width: "100%",
        height: 100,
        backgroundColor: Colors.PRIMARY, 
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingTop: 35,
    },
    logoContainer: {
        width: "100%",
        alignItems: "center",
    },
});

export default Header;