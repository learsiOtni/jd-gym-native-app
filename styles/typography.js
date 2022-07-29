import { scaleFont } from './mixins';
//import * as Font from 'expo-font';


//FONT FAMILY
export const FONT_FAMILY_REGULAR = 'montserrat';
export const FONT_FAMILY_BOLD = 'montserrat-bold';
export const FONT_FAMILY_SEMIBOLD = 'montserrat-semibold';
export const FONT_FAMILY_ITALIC = 'montserrat-italic';

// FONT WEIGHT
export const FONT_WEIGHT_REGULAR = '400';
export const FONT_WEIGHT_BOLD = '700';

// FONT SIZE
export const FONT_SIZE_18 = scaleFont(18);
export const FONT_SIZE_16 = scaleFont(16);
export const FONT_SIZE_14 = scaleFont(14);
export const FONT_SIZE_12 = scaleFont(12);

// LINE HEIGHT
export const LINE_HEIGHT_24 = scaleFont(24);
export const LINE_HEIGHT_20 = scaleFont(20);
export const LINE_HEIGHT_16 = scaleFont(16);

// FONT STYLE
export const BODY = {
    fontFamily: FONT_FAMILY_REGULAR,
    fontSize: FONT_SIZE_14,
};

export const TITLE = {
    fontFamily: FONT_FAMILY_BOLD,
    fontSize: FONT_SIZE_16,
};

export const SUBTITLE = {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: FONT_SIZE_14,
};

export const SMALL = {
    fontFamily: FONT_FAMILY_SEMIBOLD,
    fontSize: FONT_SIZE_12,
}
