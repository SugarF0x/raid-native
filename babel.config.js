module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@screens/': './screens/*',
            '@screens': './screens/',
            '@components/': './components/*',
            '@components': './components/',
            '@definitions/': './definitions/*',
            '@definitions': './definitions/',
            '@utils/': './utils/*',
            '@utils': './utils/',
            '@consts/': './consts/*',
            '@consts': './consts/',
            '@classes/': './classes/*',
            '@classes': './classes/',
            '@assets/': './assets/*',
            '@assets': './assets/',
          }
        }
      ],
      'react-native-reanimated/plugin'
    ]
  };
};
