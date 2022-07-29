import React from 'react';
import { StyleSheet } from 'react-native';

import View from './View';
import Text from './Text';
import { overallVisits } from '../utils/mockData';
import { Colors } from '../styles';

const GraphBar = () => {

    const calcHeight = (num) => {
        return num * 5.85;
    };

    return (
        <View row style={styles.graphBar}>
            {overallVisits.slice(1).map( (data, index) => {
                let percColor = Colors.ACCENT;
                if (data.perc.startsWith('-')) {
                    percColor = Colors.ERROR;
                };
                
                return (
                <View key={`${data.id}-${data.index}`} style={styles.graphPiece}>
                    <Text subtitle style={{color: percColor}}>
                        {data.perc}
                    </Text>
                    <Text body secondary>{data.name.toUpperCase()}</Text>
                    <View style={{height: calcHeight(data.visits), ...styles.graph}}/>
                    <Text body secondary>{data.visits}</Text>
                </View>
                )
            }
            )}
        </View>

        
    ) 
}

const styles=StyleSheet.create({
    graphBar: {
        //height: 176, //If fixed height for graph, make graph piece percentage of height
    },
    graphPiece: {
        flexDirection: 'column-reverse',
        width: "20%",
        alignItems: 'center',
    },
    graph: {
        borderRadius: 5,
        width: "15%",
        backgroundColor: Colors.ACCENT,
    },
});

export default GraphBar;
