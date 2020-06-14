const path = require('path')
const resolve = (str) => {
  return path.resolve(__dirname, str)
}

const VueLoadPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development', // mode有 development和production
  entry: './src/main.js', // 入口文件
  output: { // 出口文件
    filename: 'bundle-[hash].js', // 配置hash后，打包的文件会带上哈希值
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // 解析.vue文件需要用到 vue-loader
      {
        test: /\.vue$/,
        use: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolve('./public/index.html')
    }), // htmlWebpackPlugin插件会在webpack打包结束后,自动帮我们生成一个HTML文件,并把打包生成的js自动引入到这个HTML文件中
    new CleanWebpackPlugin(),
    new VueLoadPlugin()
  ]
}
