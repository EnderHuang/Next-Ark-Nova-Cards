module.exports = {
  locales: ['en', 'zh-CN', 'de', 'tr', 'pt'],
  output: 'public/locales/$LOCALE/$NAMESPACE.json',
  input: ['src/**/*.ts', 'src/**/*.tsx'],
  keySeparator: false,
  useKeysAsDefaultValue: true,
  verbose: false,
};
