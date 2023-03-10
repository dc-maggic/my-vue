const path = require("path"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  { VueLoaderPlugin } = require("vue-loader"),
  isDebug = process.env.NODE_ENV !== "production";

let config = {
  mode: process.env.NODE_ENV,
  entry: path.join(__dirname, "src/index.js"),
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.(css|scss|sass)$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    // 生成html文件
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.join(__dirname, "public/index.html"),
      inject: true,
      minify: true,
    }),
  ],
};
if (isDebug) {
  // webpack5 的 devtool 参数不一样
  config.devtool = "eval-cheap-module-source-map";
  config.devServer = {
    static: {
      directory: path.join(__dirname, "public"),
    },
    open: true,
    hot: true,
  };
}
// console.log(config)
module.exports = () => {
  return config;
};
