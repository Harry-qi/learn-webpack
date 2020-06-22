import Vue from 'vue'
import App from './App'
import './style/testcss.css'
import './style/testscss.scss'
import 'components/globals' // 全局注册基础组件

new Vue({
  el: '#app',
  render: h => h(App)
})
