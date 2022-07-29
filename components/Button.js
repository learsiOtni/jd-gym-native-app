import { StyleSheet, TouchableOpacity } from 'react-native'

import { Colors, Spacing } from '../styles'
import Text from './Text'

const Button = props => {

    const {
        children,
        textStyle,
        style
    } = props;

    return (
        <TouchableOpacity {...props} style={{...styles.button, ...style}} >
            <Text white center subtitle style={textStyle}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: Colors.ACCENT,
        borderRadius: 5,
        paddingVertical: Spacing.SCALE_8 * 2
    }
})

export default Button;