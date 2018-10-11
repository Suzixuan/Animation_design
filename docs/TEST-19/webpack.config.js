const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },

  module: {
     rules: [
       {
         test: /\.scss$/,
         use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          //如果需要，可以在 sass-loader 之前将 resolve-url-loader 链接进来
          use: ['css-loader', 'sass-loader']
        })
       },
       {
//         // 对非文本文件采用 file-loader 加载
         test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
          use: ['file-loader']
       },
       {
          test: /\.html$/,
          loader: "raw-loader" // loaders: ['raw-loader'] is also perfectly acceptable.
       }


     ]
   },

   plugins:[

      new ExtractTextPlugin('[name].css'),
      new HtmlWebpackPlugin({
        template: './dist/index.html'
      })

   ],
   devServer: {
     contentBase: './dist'
     // hot: true,   //用ExtractTextPlugin插件时用热更新会报错
   }
};


/*
scss 的常见写法
https://webpack.docschina.org/plugins/extract-text-webpack-plugin/
安装 npm install extract-text-webpack-plugin@next --save-dev


关于HTML热更新
https://github.com/AriaFallah/WebpackTutorial/tree/master/part1/html-reload
https://webpack.docschina.org/plugins/html-webpack-plugin/
https://segmentfault.com/q/1010000004707022（跳转）
*/
