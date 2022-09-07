module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'import',
      {libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true},
    ],
    '@babel/plugin-syntax-dynamic-import',
  ],
};
