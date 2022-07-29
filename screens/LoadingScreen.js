import { StyleSheet, ActivityIndicator } from 'react-native';

import { Text, View } from '../components';
import { Colors, Spacing } from '../styles'

const LoadingScreen = () => {

    return(
        <View flex center middle>
            <ActivityIndicator size="large" color={Colors.ACCENT} />
            <Text center style={styles.text}>Loading...</Text>
        </View>
    )

};

const styles = StyleSheet.create({
    text: {
        paddingVertical: Spacing.SCALE_16 * 1.25,
    }
});

export default LoadingScreen;