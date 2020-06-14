# learn webpack
一步一步学习webpack,以此作为学习记录。一次小功能配置提交一次git。
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
3.解析less文件
  需要css-loader、style-loader 、less-loader 
``` javascript
rules: [
  {
    test: /\.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
  }
]
``` 
4.解析scss文件  
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
[配置resolve即可](https://www.webpackjs.com/configuration/resolve/#resolve-extensions)  
``` javascript
resolve: {
  extensions: ['.js', '.vue']
},
```
使用示例：
``` javascript
import App from './App'
```
5.webpack配置别名  
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