import React, {useContext} from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { Text, View , Button, TitleBox } from '../../components';

import AccountBox from './AccountBox';
import { Colors, Spacing, Mixins, Typography } from '../../styles';
const { SCALE_18, SCALE_16, SCALE_12, SCALE_8 } = Spacing;

import { AuthContext } from '../../utils/AuthProvider';

const AccountScreen = ({navigation}) => {

    const auth = useContext(AuthContext);
    return(
        <View flex style={styles.screen}>
            <View style={styles.headerContainer}>
                <Text title white style={styles.title}>ISRAEL LABARINTO</Text>
                
                <TouchableWithoutFeedback onPress={ () => navigation.navigate("Details")}>
                    <View style={styles.underline}>
                        <Text subtitle white>View Personal Details</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View>
                <TitleBox>Membership</TitleBox>
                <AccountBox icon>Your Gym Membership</AccountBox> 
                <AccountBox icon style={{borderBottomWidth: 0}}>Member Benefits</AccountBox>
            </View>

            <View>
                <TitleBox>Support</TitleBox>
                <AccountBox icon>Help Centre</AccountBox>
                <AccountBox icon>Give Us Feedback</AccountBox>
                <AccountBox icon>App Preferences</AccountBox>
                <AccountBox icon>Find Gym</AccountBox>
                <AccountBox icon>Online Shop</AccountBox>
            </View>

            <View>
                <Button onPress={auth.signOut} style={styles.button}>LOGOUT</Button>
            </View>
            
        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
    },
    headerContainer: {
        padding: SCALE_16,
        paddingBottom: SCALE_16 * 1.75,
        backgroundColor: Colors.PRIMARY,
        borderTopWidth: 0.3,
        borderTopColor: Colors.WHITE,
    },
    title: {
        fontSize: Typography.FONT_SIZE_16 * 1.5,
    },
    underline: {
        width: "42%",
        borderBottomColor: Colors.WHITE,
        borderBottomWidth: StyleSheet.hairlineWidth,
    },
    button: {
        marginTop: SCALE_8 * 1.25,
        paddingVertical: 5,
    }
});

export default AccountScreen;