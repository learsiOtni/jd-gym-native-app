import { Dimensions, PixelRatio } from 'react-native';

export const WINDOW_WIDTH = Dimensions.get('window').width;
export const WINDOW_HEIGHT = Dimensions.get('window').height;
const guidelineBaseWidth = 375;

export const scaleSize = size => (WINDOW_WIDTH/guidelineBaseWidth) * size;

export const scaleFont = size => size * PixelRatio.getFontScale();


const dimensions = ( top, right = top, bottom = top, left = right, property) => {
    let styles = {};

    styles[`${property}Top`] = top;
    styles[`${property}Right`] = right;
    styles[`${property}Bottom`] = bottom;
    styles[`${property}Left`] = left;

    return styles;
}

export const margin = ( top, right, bottom, left) => 
    dimensions(top, right, bottom, left, 'margin')

export const padding = ( top, right, bottom, left) =>
    dimensions(top, right, bottom, left, 'padding')

export const boxShadow = 
    (color, offset = {height:2, width:2},
    radius = 8, opacity = 0.2) => (
        {
            shadowColor: color,
            shadowOffset: offset,
            shadowOpacity: opacity,
            shadowRadius: radius,
            elevation: radius,
        }
)