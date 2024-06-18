import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const islandscape = width > height;

// Définir les dimensions de base pour les smartphones
const smartphoneGuidelineBaseWidth = 375;
const smartphoneGuidelineBaseHeight = 812;

// Définir les dimensions de base pour les ordinateurs
const computerGuidelineBaseWidth = 1440;
const computerGuidelineBaseHeight = 900;

const guidelineBaseWidth = !islandscape ? smartphoneGuidelineBaseWidth : computerGuidelineBaseWidth;
const guidelineBaseHeight = !islandscape ? smartphoneGuidelineBaseHeight : computerGuidelineBaseHeight;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor;

export { horizontalScale, verticalScale, moderateScale };