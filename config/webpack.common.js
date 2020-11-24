const paths = require('./paths')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [paths.src + '/index.ts'],

  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },


  resolve: {
    extensions: ['.js', '.ts']
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Snake game',
      template: paths.src + '/templates/index.html', // template file
      filename: 'index.html', // output file
    }),
  ],

  module: {
    rules: [
      {
        test: /\.ts$/,
        include: paths.src,
        use: 'ts-loader'
      }
    ],
  },
}
