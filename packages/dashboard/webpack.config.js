const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const { ProvidePlugin } = require("webpack");

module.exports = {
  entry: path.resolve(__dirname, "src/sixprism-root-config.ts"),
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    libraryTarget: 'umd',
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
            presets: ["@babel/env", "@babel/typescript"]
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
      template: "./src/index.ejs",
      templateParameters: {
        isLocal: true,
        orgName: 'sixprism',
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        configFile: "../../tsconfig.json",
      },
    })
  ],
  externals: ["single-spa", new RegExp(`^@sixprism/`)],
  devServer: {
    contentBase: "./dist",
  },
};
