/* eslint-env node */

const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = env => {
  return {
    entry: './src/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new CleanWebpackPlugin(),
      new VueLoaderPlugin(),
      new HtmlWebpackPlugin({
        title: 'PalmID SaaS DemonIAM',
        template: 'src/index.html',
      }),
    ],
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'SaaS-JS': './../externals/SaaS-JS/src',
        'oidc-client$': 'oidc-client/lib/oidc-client.js',
      },
    },
    devServer: {
      contentBase: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
    },
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader',
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
          ],
        },
        {
          test: /\.(?:png|jpg|svg)$/,
          loader: 'file-loader',
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader',
        },
      ],
    },
    devtool: 'source-map',
  };
};
