import { StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Text } from '../../components';
import { Colors, Spacing } from '../../styles';
const { SCALE_8 } = Spacing;

const AccountBox = props => {

    return (
        <TouchableOpacity onPress={props.clicked}>
            <View style={{...styles.accountBox, ...props.style}} row center>
                <View style={styles.label}>
                    {
                        props.multilabel ? 
                            props.children : 
                            <Text subtitle secondary>{props.children}</Text>
                    }
                </View>
                
                {
                    props.icon && <Icon style={styles.icon} name="chevron-right" size={16} />
                }
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    accountBox: {
        marginLeft: SCALE_8,
        borderBottomWidth: .3,
        borderBottomColor: Colors.SECONDARY,
        paddingVertical: SCALE_8 * 1.25,
        paddingHorizontal: SCALE_8 * 1.25,  
    },
    icon: {
        color: Colors.SECONDARY,
    },
    label: {
        width: "90%",
    }
});

export default AccountBox;