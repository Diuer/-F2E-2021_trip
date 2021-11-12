// webpack.config.prod.js
var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  // resolve: {
  //   extensions: ['.js'],
  //   modules: ['node_modules'],
  // },
  devtool: "cheap-eval-source-map",
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "[hash:8].[name].js",
    publicPath: "",
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: "./index-template.html",
      filename: "index.html",
    }),
    new webpack.DefinePlugin({
      "process.env": {
        isProd: true,
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(svg|png|jpg|gif|eot|ttf|woff|woff2)$/,
        exclude: /node_modules/,
        use: "url-loader?limit=8192&name=[path]/[hash:8].[name].[ext]",
      },
      {
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
};
