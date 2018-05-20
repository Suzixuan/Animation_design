const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
     rules: [
       {
         test: /\.scss$/,
         use: [
           'style-loader',
           'css-loader',
           'sass-loader'
         ]
       }
     ]
   },
   devServer: {
     contentBase: './dist'
   }
};