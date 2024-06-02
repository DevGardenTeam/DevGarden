module.exports = function(api) {
    api.cache(true);
    return {
      presets: ['babel-preset-expo'],
      plugins: [
        ...(process.env.BABEL_ENV !== 'web' ? ['react-native-reanimated/plugin'] : []),
      ],
    };
  };