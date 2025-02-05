const webpack = require("webpack");
module.exports = function override(config, env) {
  //do stuff with the webpack config...

  config.resolve.fallback = {
    crypto: false,
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    // url: require.resolve("url"),
    // http: require.resolve("stream-http"),
    // https: require.resolve("https-browserify"),
    // os: require.resolve("os-browserify/browser"),
    // constants: require.resolve("constants-browserify"),
    // stream: require.resolve("stream-browserify"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
