const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'src/rxdb.ts'),
  devtool: "inline-source-map",
  mode: "development",
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },

  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    crypto: 'empty',
  },

  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            '@babel/env',
            '@babel/typescript',
          ],
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }],
            ["@babel/plugin-proposal-class-properties", { "loose": true }],
            [
              "@babel/plugin-transform-runtime",
              {
                "helpers": true,
                "regenerator": true
              }
            ]
          ],
        },
      },
      exclude: /node_modules/,
    }],
  },

  plugins: [
    // Re-generate index.html with injected script tag.
    // The injected script tag contains a src value of the
    // filename output defined above.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html',
    }),
    new ForkTsCheckerWebpackPlugin()
  ],

  devServer: {
    contentBase: './dist',
  },
};
