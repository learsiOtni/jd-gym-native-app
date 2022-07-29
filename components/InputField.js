import React from 'react';
import { View, StyleSheet } from 'react-native'; 
import { Colors, Spacing, Typography } from '../styles';

import Text from './Text';
import Input from './Input';

const InputField = props => {

    const {
        label,
    } = props;

    return(
        <View style={styles.input}>
            <Text white style={styles.label}>
                { label }
            </Text>

            <Input {...props} style={props.style}  />
        </View>
    )
};

const styles = StyleSheet.create({
    input: {
        paddingVertical: 5,
    },
    label: {
        fontFamily: Typography.FONT_FAMILY_SEMIBOLD,
        fontSize: Typography.FONT_SIZE_16,
    }
});

export default InputField;