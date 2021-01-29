// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;

module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/'
        : '/',
    // configureWebpack: {
    //     plugins: [new BundleAnalyzerPlugin()]
    // }
}
