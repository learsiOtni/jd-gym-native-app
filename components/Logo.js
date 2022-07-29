import { Image, StyleSheet, Animated } from 'react-native';

const Logo = props => {

    const {
        animated,
    } = props;

    const source = require('../assets/images/jd-gyms-logo.png');
    const style = {...styles.image, ...props.style};

    if (animated) {
        return <Animated.Image {...props} source = {source} style={style} />
    }

    return (
        <Image 
            {...props}
            source = {source} 
            style={style} 
        />
    )
};

const styles = StyleSheet.create({
    image: {
    }
});

export default Logo;