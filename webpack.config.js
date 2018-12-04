const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    'entry': './src/entry.js',
  },
  optimization: {
    splitChunks: {
      maxAsyncRequests: 5,
      maxInitialRequests: 1,
      name: true
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              cacheDirectory: true,
              presets: [
                ['es2015', { modules: false, loose: true }],
                'react',
                'stage-0',
              ],
            },
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html'
    }),
    new StylableWebpackPlugin(),
  ]
};