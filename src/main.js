import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

//安装toast插件
Vue.use(toast)

Vue.config.productionTip = false
//vue实例作为事件总线
Vue.prototype.$bus=new Vue()
//解决移动端300ms的延迟
FastClick.attach(document.body)
//使用懒加载插件
Vue.use(VueLazyLoad,{
  loading:require('./assets/img/common/placeholder.png')
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
