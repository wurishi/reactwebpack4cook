const path = require('path');
const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.base.config.js');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(commonConfig, {
  mode: 'development',
  entry: ['react-hot-loader/patch'],
  devtool: 'cheap-module-eval-soure-map',
  output: {
    // 输出目录
    path: path.resolve(__dirname, '../dist'),
    // 文件名称
    filename: '[name].bundle.js',
    chunkFilename: '[name].js',
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
  plugins: [
    //开启HMR(热替换功能,替换更新部分,不重载页面！) 相当于在命令行加 --hot
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        BASE_URL: JSON.stringify('http://localhost:9000'),
      },
    }),
    // css单独提取
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  devServer: {
    // open: true,
    hot: true,
    contentBase: path.resolve(__dirname, '../dist'),
    host: 'localhost', // 可以使用手机访问
    port: 3000,
    historyApiFallback: true, //  该选项的作用所有的404都连接到index.html
    proxy: {
      // 代理到后端的服务地址
      '/api': 'http://localhost:3000',
    },
  },
});
