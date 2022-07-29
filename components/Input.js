import { TextInput, StyleSheet } from 'react-native'; 
import { Colors, Mixins, Typography } from '../styles';

const Input = props => {

    const {
        inputType
    } = props;

    return(
        <TextInput  
            {...props} 
            style={{...styles.input, ...props.style }} 
            autoCapitalize="none"
            autoComplete="off"
            autoCorrect={false}
            keyboardType={inputType}
            placeholderTextColor='rgba(242, 242, 242, .6)'
        />
    )
};

const styles = StyleSheet.create({
    input: {
        padding: 16,
        marginVertical: 10,
        borderColor: 'rgba(255, 255, 255, .5)',
        borderWidth: 2,
        borderRadius: 6,
        elevation: 5,
        width: Mixins.WINDOW_WIDTH * .9,
        fontFamily: Typography.FONT_FAMILY_BOLD,
        fontSize: Typography.FONT_SIZE_14,
        color: Colors.WHITE,
    }
});

export default Input;