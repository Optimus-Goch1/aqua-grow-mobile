import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const guidelineBaseWidth = 390; // Reference width
const guidelineBaseHeight = 844; // Reference height

export const scaleWidth = (size) => (SCREEN_WIDTH / guidelineBaseWidth) * size;
export const scaleHeight = (size) => (SCREEN_HEIGHT / guidelineBaseHeight) * size;

