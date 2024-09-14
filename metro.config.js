const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer/expo"),
  minifierConfig: { compress: { drop_console: true } }
};
config.resolver = {
  ...resolver,
  assetExts: [...resolver.assetExts.filter((ext) => ext !== "svg")],
  sourceExts: [...resolver.sourceExts, "svg", "cjs"]
};

// config.resolver.sourceExts.push("cjs");

module.exports = withNativeWind(config, {
  input: "global.css",
  inlineRem: 16
});
