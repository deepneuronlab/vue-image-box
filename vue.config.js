// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;
const middleware = require("./middleware");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  configureWebpack: {
    devServer: {
      setup: middleware.SERVER_SETUP,
    },
  },
};
