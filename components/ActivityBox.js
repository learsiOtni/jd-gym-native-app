import React from 'react';
import { StyleSheet } from 'react-native';

import View from './View';
import Text from './Text';

import { Colors, Spacing } from '../styles';
const { SCALE_16, SCALE_8 } = Spacing;

const ActivityBox = props => {

    return (
        <View style={{...styles.activityBox, ...props.style}}>
            <View row center space>
                <Text body secondary>{props.date} at {props.time}</Text>
                <Text subtitle accent>{props.length}</Text>
            </View>

            <Text title primary>{props.name}</Text>
            <Text subtitle secondary>{props.location}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    activityBox: {
        padding: SCALE_8 * 1.25,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.WHITE_2,
        marginHorizontal: SCALE_16,
        marginVertical: SCALE_8 * 1.25,
        backgroundColor: Colors.WHITE,
        shadowColor: Colors.WHITE_2,
        shadowRadius: 4,
        shadowOpacity: 1,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    }
});

export default ActivityBox;