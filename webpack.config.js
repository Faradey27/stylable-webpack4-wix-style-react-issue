const StylableWebpackPlugin = require('@stylable/webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  entry: {
    entryWsr: './src/entry-wsr-sync.js',
    'entry': './src/entry.js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 1,
      maxAsyncRequests: 1,
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