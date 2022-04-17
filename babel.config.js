module.exports = function load(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src',
          },
        },
      ],
    ],
  };
};
