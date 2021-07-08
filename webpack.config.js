const path = require('path')
const resolvePath = (dir) => {
  return path.resolve(__dirname, dir)
}

const VueLoadPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  mode: 'development', // mode有 development和production
  entry: './src/main.js', // 入口文件
  output: { // 出口文件
    filename: 'bundle-[hash].js', // 配置hash后，打包的文件会带上哈希值
    path: resolvePath('dist')
  },
  devtool: 'eval-cheap-module-source-map',
  stats: 'errors-only',
  resolve: {
    extensions: ['.js', '.vue'],
    alias: { // 配置别名
      '@': resolvePath('src'),
      'components': resolvePath('src/components')
    }
  },
  module: {
    rules: [
      // 解析.vue文件需要用到 vue-loader
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          'postcss-loader'
        ]
      },
      // loader 调用顺序是从右到左
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader']
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      // babel-loader会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/, // 匹配JS文件
        use: 'babel-loader',
        exclude: /node_modules/ // 排除node_modules目录
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: resolvePath('./public/index.html')
    }), // htmlWebpackPlugin插件会在webpack打包结束后,自动帮我们生成一个HTML文件,并把打包生成的js自动引入到这个HTML文件中
    new CleanWebpackPlugin(), // 清理dist目录
    new VueLoadPlugin()
  ]
}
