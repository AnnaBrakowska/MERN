const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./app/index.js",
  output: {
    path: path.resolve(__dirname, "app"),
    publicPath: "/",
    filename: "bundle.js"
  },
  devServer: {
    inline: true,
    contentBase: "./app",
    port: 8080,
    historyApiFallback: true,
    proxy: {
      "/auth/google": { target: "http://localhost:3000", secure: false },
      "/api/*": { target: "http://localhost:3000", secure: false },
      "/api/logout": { target: "http://localhost:3000", secure: false }
    }
  },
  watch: true,
  module: {
    rules: [
      { test: /\.js$/, use: "babel-loader" },
      { test: /\.jsx$/, use: "babel-loader" },
      { test: /\.css$/, use: ["style-loader", "css-loader"] }
    ]
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/app/index.html"
    })
  ]
};
