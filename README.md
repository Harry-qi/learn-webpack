# learn webpack
一步一步学习webpack,以此作为学习记录。一次小功能配置提交一次git。

1. 解析.vue文件
   1.1 解析.vue文件需要 vue-loader (vue-loader V15版本之后需要vue-template-compiler)
备注: 1.html-webpack-plugin会在webpack打包结束后,自动帮我们生成一个HTML文件,并把打包生成的js自动引入到这个HTML文件中
   2.使用clean-webpack-plugin插件，可以在每次打包时候清理dist目录。