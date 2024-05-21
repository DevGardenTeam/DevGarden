const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Custom configuration adjustments
const customConfig = {
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs', 'svg'], // Add 'svg' to the list of source extensions
    assetExts: ['glb', 'gltf', 'png', 'jpg', 'gif'], // Keep your existing asset extensions
  },
};

// Conditionally include the SVG transformer for mobile platforms only
if (process.env.EXPO_PLATFORM !== 'web') {
  customConfig.transformer = {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  };
  customConfig.resolver.sourceExts.push('svg');
}

// Get the default configuration from @react-native/metro-config
const defaultConfig = getDefaultConfig(__dirname);

// Merge the default configuration with your custom adjustments
module.exports = mergeConfig(defaultConfig, customConfig);