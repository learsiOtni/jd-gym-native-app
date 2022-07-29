import { View, StyleSheet, Animated } from 'react-native';

const Views = props => {

    // PROPS
    const {
        flex,
        row,
        column,
        center,
        middle,
        left,
        right,
        top,
        bottom,
        space,
        //animation
        animated,
        children,
        style
    } = props;

    const viewStyles = [
        flex && { flex: 1},
        row && styles.row,
        column && styles.column,
        center && styles.center,
        middle && styles.middle,
        left && styles.left,
        right && styles.right,
        top && styles.top,
        bottom && styles.bottom,
        space && styles.space,
    ];

    if (animated) {
        return (
            <Animated.View {...props} style={[viewStyles, style]}>
                {children}
            </Animated.View>
        )
    }

    return (
        <View {...props} style={[viewStyles, style]} >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    center: {
        alignItems: "center"
    },
    middle: {
        justifyContent: "center"
    },
    left: {
        justifyContent: "flex-start"
    },
    right: {
        justifyContent: "flex-end"
    },
    top: {
        justifyContent: "flex-start"
    },
    bottom: {
        justifyContent: "flex-end"
    },
    space: {
        justifyContent: "space-between"
    },
});

export default Views;