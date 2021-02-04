// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//     .BundleAnalyzerPlugin;

const configureAPI = require('./server')

module.exports = {
    publicPath: '/',
    devServer: {
        before: configureAPI
        }
    // configureWebpack: {
    //     plugins: [new BundleAnalyzerPlugin()]
    // }
}
