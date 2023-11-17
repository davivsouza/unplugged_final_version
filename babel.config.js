module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    "plugins": [
      ["module-resolver", {
        "root": ["./src"],
        "alias": {
          "@assets": "./src/assets",
          "@screens": "./src/screens",
          "@components": "./src/components",
          "@routes": "./src/routes",
          "@utils": "./src/utils",
          "@contexts": './src/contexts',
          "@hooks": './src/hooks',
        }
      }],
      'react-native-reanimated/plugin',

    ]
  };
};
