const path = require('path');
const common = require("./webpack.common")
const {merge} = require("webpack-merge");
const MiniCssExtractPlugin =  require("mini-css-extract-plugin")
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = merge(common, {
  mode:"production",
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][hash][ext]'
  },
  module:{
    rules:[
      {
        test: /\.css/,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      },
      {
        test: /\.(glb)$/,
        type: 'asset/resource'
      }
    ]
  },
  optimization:
  {
    minimizer:[new CssMinimizerPlugin(), new TerserPlugin(),
    new HtmlWebpackPlugin({
      template :"./src/index.html",
      minify:{
          removeAttributeQuotes:true,
          collapseWhitespace:true,
          removeComments: true
        }
      }
    )]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:"[name].[contenthash].css"
    })]
});