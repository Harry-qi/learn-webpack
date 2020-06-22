// 基础组件比较常用，所有全局注册

import Vue from 'vue'

// https://webpack.js.org/guides/dependency-management/#require-context
const requireComponent = require.context(
  // 寻找当前文件的common文件夹里面的组件
  './common',
  // 是否查询其子目录
  false,
  // 只匹配Base前缀的.vue文件
  /Base[A-Z]\w+\.(vue|js)$/
)

// 匹配每个文件名字
requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  // 获取每个组件名字的首字母大写命名
  // console.log(fileName) // './BaseButton.vue'

  const componentName = fileName
    // 移除 "./"
    .replace(/^\.\//, '')
    // 移除后缀名(.vue)
    .replace(/\.\w+$/, '')
  // console.log(componentName)

  Vue.component(
    componentName,
    // 全局注册组件
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    componentConfig.default || componentConfig
  )
})
