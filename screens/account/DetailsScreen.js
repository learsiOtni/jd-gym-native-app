import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';

import { Text, View , Button, TitleBox} from '../../components';
import AccountBox from './AccountBox';
import { Colors, Spacing, Mixins, Typography } from '../../styles';
const { SCALE_18, SCALE_16, SCALE_12, SCALE_8 } = Spacing;

const userDetails = 
    {
        'First Name': 'Israel',
        'Last Name': 'Yo',
        'Date of Birth': '01/01/1991',
        'Post Code': 'SE1 1ES',
        'Email address': 'admin@gmail.com',
        'Mobile Number': '012345678910'
    };
    //Maybe remove email and mobile from object into new array

    
const DetailsScreen = ({navigation}) => {

    const label = Object.keys(userDetails);

    const detailsBox = (item, index) => 
        <AccountBox multilabel key={`${item}-${index}`}>
            <View>
                <Text subtitle secondary >{item}</Text>
                <Text title primary>{userDetails[item]}</Text>
            </View>
        </AccountBox>

    const renderGeneral = () => label.slice(0, 4).map( 
        (item, index) => detailsBox(item, index));

    const renderContact = () => label.slice(4).map( 
        (item, index) => detailsBox(item, index));

    return(
        <View flex style={styles.screen}>
            <View row center style={styles.headerContainer}>
                <TouchableOpacity onPress={ () => navigation.navigate('Account')} style={styles.backButton} >
                    <Image source={require('../../assets/images/back.png')} />
                </TouchableOpacity>
                <Text title white style={styles.title}>PERSONAL DETAILS</Text>
            </View>

            <View>
                <TitleBox>GENERAL</TitleBox>
                {renderGeneral()}
            </View>

            <View>
                <TitleBox>CONTACT DETAILS</TitleBox>
                {renderContact()}
            </View>

            <View>
                <Button style={styles.editButton}>EDIT</Button>
            </View>
            
        </View>
    )

};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: Colors.WHITE,
    },
    headerContainer: {
        backgroundColor: Colors.PRIMARY,
        borderTopWidth: 0.3,
        borderTopColor: Colors.WHITE,
    },
    backButton: {
        paddingRight: SCALE_8,
        paddingLeft: SCALE_16 * 1.25,
        paddingVertical: SCALE_16 * 2,
    },
    title: {
        fontSize: Typography.FONT_SIZE_16 * 1.5,
    },
    editButton: {
        marginTop: SCALE_8 * 1.25,
        paddingVertical: 5,
    }
});

export default DetailsScreen;