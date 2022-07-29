import React, {useContext} from 'react';
import {StyleSheet } from 'react-native'; 
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text } from '../components'
import { Colors, Typography, Spacing } from '../styles';

const Footer = ({state, navigation}) => {
    return(
        <View row style={styles.footer}>
            { state.routes.map( (route, index) => { //state.routes returns an array of route object

                const isSelected = state.index === index;
                let selected = {color: Colors.PRIMARY};
                if (isSelected) {
                    selected = {color: Colors.ACCENT}
                }

                const navigateHandler = () => {
                    navigation.navigate(route.name);
                }
                return (
                    <View 
                        center 
                        key={route.key} 
                        style={styles.icon} 
                        onTouchEnd= {navigateHandler}
                    >
                        <Icon style={selected} name={route.params.iconName} size={24}/>
                        <Text style={{...selected, ...styles.text}}>{route.name.toUpperCase()}</Text>
                    </View>
                )
            })
            }           
        </View>
    )
};

const styles = StyleSheet.create({
    footer: {
        borderTopWidth: 0.5,
        borderRadius: 4,
        borderColor: 'rgba(150, 150, 150, 0.2)',
        backgroundColor: Colors.WHITE_2,
    },
    icon: {
        width: "25%",
        paddingBottom: Spacing.SCALE_16 * 1.875,
        paddingTop: Spacing.SCALE_8,
    },
    text: {
        fontSize: Typography.FONT_SIZE_16 * 0.5,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        paddingTop: Spacing.SCALE_8,
    }
});

export default Footer;