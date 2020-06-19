# learn webpack
一步一步学习webpack,以此作为学习记录。一次小功能配置提交一次git。  
动手敲一遍，过一遍文档印象会更加深刻。
[仓库地址](https://github.com/Harry-qi/learn-webpack)
***
1. 解析.vue文件  
1.1 解析.vue文件需要 vue-loader (vue-loader V15版本之后需要vue-template-compiler)  
备注: 1.html-webpack-plugin会在webpack打包结束后,自动帮我们生成一个HTML文件,并把打包生成的js自动引入到这个HTML文件中  
2.使用clean-webpack-plugin插件，可以在每次打包时候清理dist目录。  

2. 解析css文件  
  需要css-loader以及style-loader  
``` javascript
rules: [
  {
    test: /\.css$/,
    use: [
      { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          modules: true
        }
      }
    ]
  },
]
```
3. 解析less文件
  需要css-loader、style-loader 、less-loader 
``` javascript
rules: [
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  }
]
``` 
4. 解析scss文件  
  需要安装node-sass以及sass-loader安装到devDependencies中，webpack中使用style-loader、css-loader、sass-loader
``` javascript
rules: [
  {
    test: /\.scss$/,
    use: ['style-loader', 'css-loader', 'sass-loader']
  }
]
``` 
5. webpack配置import的时候忽略文件后缀名  
[配置extensions即可](https://www.webpackjs.com/configuration/resolve/#resolve-extensions)  
``` javascript
resolve: {
  extensions: ['.js', '.vue']
},
```
使用示例：
``` javascript
import App from './App'
```
6. webpack配置别名  
使用别名引入文件可以更简短，例如可以直接
 ``` javascript
import Testcss from 'components/Testcss'
```
配置方法：  
[参考官方文档](https://www.webpackjs.com/configuration/resolve/#resolve-alias)
``` javascript
resolve: {
  alias: {
    'components': resolvePath('src/components')
  }
},
```
7. 控制打印信息的输出  
[官方文档](https://webpack.docschina.org/configuration/stats/)
``` javascript
stats: {
    assets: false,
    builtAt: false,
    modules: false,
    entrypoints: false
  },
```
8. 配置PostCSS  
PostCSS是一种插件系统。使用PostCSS 可以写未来的css语法，能够自动补全浏览器前缀(Autoprefixer)。  
在webpack中编译PostCSS 需要使用postcss-loader。
``` javascript
rules:[
  {
    test: /\.css$/,
    use:[
      'style-loader', 'css-loader', 'postcss-loader'
    ]
  }
]
```
需要再根目录下创建postcss.config.js文件(或者.postcssrc 或者.postcssrc.js或者package.json创建postcss进行配置，[参考文档](https://github.com/michael-ciniawsky/postcss-load-config))来进行配置  
plugins可以是数组或者对象，语法如下
``` javascript
// 对象语法
module.exports = {
  'plugins': {
    'autoprefixer': {}
  }
}
// 数组语法
module.exports = {
  plugins:[
    require('autoprefixer')
  ]
}
```
备注： 使用autoprefixer需要 npm install autoprefixer -D  
9、 配置Babel(参考文章: [不容错过的 Babel7 知识](https://juejin.im/post/5ddff3abe51d4502d56bd143))  
介绍：Babel是一个 JS 编译器，功能如下：
- 语法转换
- 通过 Polyfill 方式在目标环境中添加缺失的特性(@babel/polyfill模块)
- 源码转换(codemods)  

了解下Babel的核心概念：
- 核心库 @babel/core   

- plugins(插件)能够让Babel解析特定语法(注意：不是转换)。 
我们使用箭头函数的时候，需要用@babel/plugin-transform-arrow-functions插件。  
要是使用其他语法，又要配置其他插件，那这样会很累，所以Babel有一个preset(配置)来简化插件配置。  

- preset  预设就是插件的集合，使用一个预设就是使用一组插件。  
官方preset有
- @babel/preset-env
- @babel/preset-flow
- @babel/preset-react
- @babel/preset-typescript  
语法转换只是将高版本的语法转换成低版本的，但是新的内置函数、实例方法无法转换。所以这时候需要polyfill。  

- polyfill(垫片) 能够让新的内置函数、实例方法等在低版本浏览器中也可以使用。  
@babel/preset-env 提供了一个 useBuiltIns 参数，设置值为 usage 时，就只会包含代码需要的 polyfill

在webpack里面配置Babel  
``` javascript
rules:[
  {
    test: /\.js$/, // 匹配JS文件
    use: 'babel-loader',
    exclude: /node_modules/ // 排除node_modules目录
  }
]
```
在根目录创建.babelrc
``` javascript
{
  "presets": ["@babel/env"]
}
```
babel-loader会应用到普通的 `.js` 文件以及 `.vue` 文件中的 `<script>` 块
注意: 
- babel-loader版本要高于@babel/core一个版本不然报错(也就是说babel-loader是^8.1.0，@babel/core就得是^7.0.0)。
- 解决方案：先下载babel-loader(npm i babel-loader -D)，然后会提示安装@babel/core的版本(npm i @babel/core@^7.0.0 -D)。