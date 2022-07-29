import { StyleSheet } from 'react-native';

import { Colors, Spacing } from '../styles';
import View from './View';
import Text from './Text';

const TitleBox = props => {

    return (
        <View {...props} style={{...styles.titleBox, ...props.style}}>
            <Text subtitle primary>{props.children}</Text>
        </View>
        
    )
};

const styles = StyleSheet.create({
    titleBox: {
        backgroundColor: Colors.TERTIARY,
        paddingVertical: Spacing.SCALE_8 * .625,
        paddingHorizontal: Spacing.SCALE_16,
        borderWidth: 0.3,
        borderColor: Colors.SECONDARY,
    }
});

export default TitleBox;