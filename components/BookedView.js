import React from 'react';
import { StyleSheet } from 'react-native';

import { Colors, Spacing } from '../styles';
import Text from './Text';
import View from './View';

const BookedView = () => {
    return(
        <View style={styles.bookedView}>
            <Text subtitle white>
                BOOKED
            </Text>
        </View>
    )
};

const styles = StyleSheet.create({
    bookedView: {
        backgroundColor: Colors.ACCENT,
        borderRadius: 2,
        paddingHorizontal: Spacing.SCALE_8 * 1.25,
    }
});

export default BookedView;