// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/less/main.less'
//import axios from 'axios'
import xhr from '@/plugin/xhr'

/** 自定义全局组件 */
import myComponent from '@/components/index'
Vue.use(myComponent)

import message from '@/plugin/message'
Vue.use(message)

import loading from '@/plugin/loading'
Vue.use(loading)

Vue.prototype.$http = xhr

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {  // 判断是否登陆，是否可进入相关页面
  if(!sessionStorage.getItem('uid') && ['/address', '/orderlist', '/orderdetail', '/password', '/mineinfo', '/editaddress'].includes(to.path)) {
     new Vue().$message.error('请登录')
     setTimeout(() => {
       next({
           path: '/login',
           query: {path: to.path}
       })
     }, 1000)
  }else {
     next()
  }
})

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
      eventHub: new Vue(),
      uid: sessionStorage.getItem('uid')||'',
      webinfo: {   // 网站相关配置信息
        isget: false,   // 是否已经获取过配置信息
        webname: '',
        logo: '',
        home_banner: [],
        new_arrival: {},
        hot_sale: {},
        goods_banner: {},
      }
    }
  }
})
