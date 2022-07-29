import React from 'react';
import { StyleSheet } from 'react-native';
import View from './View';
import Text from './Text';
import { Colors } from '../styles'

const Stat = props => {

    const {
        data
    } = props;

    let percColor = Colors.ACCENT;
        if (data.perc.startsWith('-')) {
            percColor = Colors.ERROR;
        };

    return (
        <View center>
            <Text title primary style={styles.statTitle}>{data.num}</Text>
            <Text body secondary>{data.name.toUpperCase()}</Text>
            <Text subtitle style={{color: percColor}}>{data.perc}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    statTitle: {
        fontSize: 52,
        paddingVertical: 0,
        //marginVertical: -10,
    },
});

export default Stat;