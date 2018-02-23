// const path = require('path');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');

// module.exports = {
//   // JavaScript 执行入口文件
//   entry: ['./main.js','./index.html'],
//   output: {
//     // 把所有依赖的模块合并输出到一个 bundle.js 文件
//     filename: 'bundle.js',
//     // 把输出文件都放到 dist 目录下
//     path: path.resolve(__dirname, './dist'),
//   },
//   module: {
//     // rules: [
//     //   {
//     //     // 用正则去匹配要用该 loader 转换的 CSS 文件
//     //     test: /\.css$/,
//     //     use: ExtractTextPlugin.extract({
//     //       // 转换 .css 文件需要使用的 Loader
//     //       use: ['css-loader'],
//     //     }),
//     //   }
//     // ]
//     rules: [
//       {
//         // 命中 SCSS 文件
//         test: /\.scss$/,
//         // 使用一组 Loader 去处理 SCSS 文件。
//         // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
//         use: ['style-loader', 'css-loader', 'sass-loader'],
//         // 排除 node_modules 目录下的文件
//         exclude: path.resolve(__dirname, 'node_modules'),
//       },
//       {
//         // 对非文本文件采用 file-loader 加载
//         test: /\.(gif|png|jpe?g|eot|woff|ttf|svg|pdf)$/,
//         use: ['file-loader'],
//       },
//     ]
//   },
//   // plugins: [
//   //   new ExtractTextPlugin({
//   //     // 从 .js 文件中提取出来的 .css 文件的名称_[contenthash:8]
//   //     filename: `[name].css`,
//   //   }),
//   // ],



//   // 只有在开启监听模式时，watchOptions 才有意义
//   // 默认为 false，也就是不开启
//   watch: true,
//   // 监听模式运行时的参数
//   // 在开启监听模式时，才有意义
//   watchOptions: {
//     // 不监听的文件或文件夹，支持正则匹配
//     // 默认为空
//     ignored: /node_modules/,
//     // 监听到变化发生后会等300ms再去执行动作，防止文件更新太快导致重新编译频率太高
//     // 默认为 300ms  
//     aggregateTimeout: 300,
//     // 判断文件是否发生变化是通过不停的去询问系统指定文件有没有变化实现的
//     // 默认每秒问 1000 次
//     poll: 1000
//   }

// };


var path = require('path'),
HtmlWebpackPlugin = require('html-webpack-plugin'),
webpack = require('webpack'); //这里引入webpack是为了使用webpack的热更新功能以及其他自带插件，见 module.exports.plugins
module.exports = {
  entry: [
    // 给webpack-dev-server启动一个本地服务，并连接到8080端口
    'webpack-dev-server/client?http://localhost:8080',

    // 给上面启动的本地服务开启自动刷新功能，'only-dev-server'的'only-'意思是只有当模块允许被热更新之后才有热加载，否则就是整页刷新
    'webpack/hot/only-dev-server',

    // webpack的入口文件，注意这个声明必须写在上面两个后面，webpack-dev-server才有效
    './webpack.entry.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './build'),
    publicPath: ''
  },
  context: __dirname,
  module: {
    rules: [{
        // 命中 SCSS 文件
        test: /\.scss$/,
        // 使用一组 Loader 去处理 SCSS 文件。
        // 处理顺序为从后到前，即先交给 sass-loader 处理，再把结果交给 css-loader 最后再给 style-loader。
        use: ['style-loader', 'css-loader', 'sass-loader'],
        // 排除 node_modules 目录下的文件
        exclude: path.resolve(__dirname, 'node_modules'),
      },
    {
      test: /\.(jpg|png)$/,
      use: ['url-loader?limit=10000&name=img/[name].[ext]']
    },
    {
      test: /\.html$/,
      use: ['html-loader']
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      filename: 'index.html'
    }),
    // 开启webpack全局热更新
    new webpack.HotModuleReplacementPlugin(),

    // 当接收到热更新信号时，在浏览器console控制台打印更多可读性高的模块名称等信息
    new webpack.NamedModulesPlugin()
  ],
  
  // 定义webpack-dev-server
  devServer: {
    host:'0.0.0.0',
    contentBase: path.resolve(__dirname, 'src'),
    // 静态文件目录位置，只有当你需要在webpack-dev-server本地服务器查看或引用静态文件时用到。类型：boolean | string | array, 建议使用绝对路径
    hot: true,
    // 模块热更新。依赖于HotModuleReplacementPlugin
    noInfo: false,
    // 在命令行窗口显示打包信息
  }
};