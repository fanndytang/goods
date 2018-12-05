// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/less/main.less'
import axios from 'axios'

/** 自定义全局组件 */
import myComponent from '@/components/index'
Vue.use(myComponent)

import message from '@/plugin/message'
Vue.use(message)

import loading from '@/plugin/loading'
Vue.use(loading)

Vue.prototype.$http = axios

Vue.config.productionTip = false

router.afterEach((to,from,next) => {  // 每个页面滚动条回滚到顶部
  window.scrollTo(0,0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  data () {
    return {
      eventHub: new Vue()
    }
  }
})
