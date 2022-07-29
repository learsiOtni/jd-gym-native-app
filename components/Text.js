import { Text, StyleSheet, Animated } from 'react-native';
import { Typography, Colors, Spacing } from '../styles';

const { 
    BODY,
    TITLE,
    SUBTITLE,
    SMALL
} = Typography;

const {
    ACCENT,
    PRIMARY,
    SECONDARY,
    TERTIARY,
    WHITE,
    WHITE_2
} = Colors;


const Texts = props => {
    // PROPS
    const {
        body,
        title,
        subtitle,
        small,
        children,
        // colors
        accent,
        primary,
        secondary,
        tertiary,
        white,
        white2,
        // position
        center,
        right,
        //animation
        animated,
        style
    } = props;

    const textStyles = [
        body && {...styles.body, ...styles.padding},
        title && {...styles.title, ...styles.padding},
        subtitle && {...styles.subtitle, ...styles.padding},
        small && {...styles.small, ...styles.padding},
        // COLORS
        accent && styles.accent,
        primary && styles.primary,
        secondary && styles.secondary,
        tertiary && styles.tertiary,
        white && styles.white,
        white2 && styles.white2,
        // Position
        center && styles.center,
        right && styles.right,
    ];

    if (animated) {
        return (
            <Animated.Text {...props} style={[textStyles, style]} >
                {children}
            </Animated.Text>
        )
    }

    return (
        <Text {...props} style={[textStyles, style]} >
            {children}
        </Text>
    );
}

const styles = StyleSheet.create({
    //default style
    //font
    body: BODY,
    title: TITLE,
    subtitle: SUBTITLE,
    small: SMALL,
    //padding
    padding: { 
        paddingVertical: Spacing.SCALE_8 * 0.625 
    },
    //position
    center: { textAlign: 'center' },
    right: { textAlign: 'right' },
    //colors
    accent: { color: ACCENT },
    primary: { color: PRIMARY },
    secondary: { color: SECONDARY },
    tertiary: { color: TERTIARY },
    white: { color: WHITE },
    white2: { color: WHITE_2 },
});

export default Texts;