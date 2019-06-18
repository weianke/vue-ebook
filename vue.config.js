const HtmlWebpackPlugin = require('html-webpack-plugin')
const { SkeletonPlugin } = require('page-skeleton-webpack-plugin')
const path = require('path')

module.exports = {
  //  设置打包后的css js引入路径  生产环境 为./  其他环境为/
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 9099,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  }
}