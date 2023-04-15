const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const webpack = require('webpack');
const {CleanWebpackPlugin} = require("clean-webpack-plugin")

module.exports = {
  entry: {
    main:'./src/index.js',
  },
  resolve: {
    extensions: ['.js', '.json', '.png','.jpg','mp4'],
  },
  module:{
    rules:[
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(png|jpg|gif|hdr)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
       },
       {
        test: /\.(mp4|webm)$/,
        type: 'asset/resource',
       },
       {
        test: /\.svg$/,
        use: [{loader:'@svgr/webpack',
        options: {
          svgo: false,
        }}],
      },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true,
    static: path.resolve(__dirname, './dist'),
    open: {
      target: ['http://localhost:8090/home'],
      app: {
        name: 'google-chrome',
        arguments: [],
      },
    },
    hot: true,
    port: 8090,
  },
  plugins:[
    new CleanWebpackPlugin()
    ,new CopyPlugin({
      patterns: [
          { from: "src/assets/model",to:"assets/model" }
      ]}),
    new webpack.HotModuleReplacementPlugin(),
  ]
};