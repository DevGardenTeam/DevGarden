const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

// Custom configuration adjustments
const customConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    sourceExts: ['js', 'jsx', 'json', 'ts', 'tsx', 'cjs', 'mjs', 'svg'], // Add 'svg' to the list of source extensions
    assetExts: ['glb', 'gltf', 'png', 'jpg', 'gif'], // Keep your existing asset extensions
  },
};

// Get the default configuration from @react-native/metro-config
const defaultConfig = getDefaultConfig(__dirname);

// Merge the default configuration with your custom adjustments
module.exports = mergeConfig(defaultConfig, customConfig);