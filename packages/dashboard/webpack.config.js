const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/env", "@babel/typescript"],
            plugins: [
              "@babel/proposal-class-properties",
              [
                "@babel/plugin-transform-react-jsx",
                {
                  pragma: "h",
                  pragmaFrag: "Fragment",
                },
              ],
            ],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: "./public/index.html",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: "../../tsconfig.json",
      },
    }),
    new ProvidePlugin({
      h: ["preact", "h"],
    }),
  ],

  devServer: {
    contentBase: "./dist",
  },
};
