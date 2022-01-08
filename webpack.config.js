const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

/**
 * DEVELOPMENT ONLY 
 */

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            issuer: /\.[jt]sx?$/,
            resourceQuery: /react/, // *.svg?react
            use: ['@svgr/webpack']
          },
          {
            type: 'asset/resource',
          }
        ]
      },
    ]
  },
  plugins:[
    new CopyPlugin({
      patterns: [
        { from: "./public"},
      ],
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    static: './dist',
    port: 3000,
  }
};