const webpack = require("webpack");
// import webpack from "webpack";

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    fs: false,
    async_hooks: false,
    vm: require.resolve("vm-browserify"),
    zlib: require.resolve("browserify-zlib"),
    http: require.resolve("stream-http"),
    crypto: require.resolve("crypto-browserify"),
    buffer: require.resolve("buffer/"),
    assert: require.resolve("assert/"),
    url: require.resolve("url/"),
  });
  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.ProvidePlugin({
      process: "process",
    }),
  ]);
  return config;
};
