import Vue from 'vue'
import Router from 'vue-router'

//  首页
import home from '@/view/home/index.vue'

// 公告页
import newsList from '@/view/news/list.vue'
import newsDetail from '@/view/news/detail.vue'
import join from '@/view/news/join.vue'
import concat from '@/view/news/concat.vue'

//  商品相关
import goodlist from '@/view/goods/goodlist.vue'
import goodsdetail from '@/view/goods/detail.vue'
import customized from '@/view/goods/customized.vue'
import design from '@/view/goods/design.vue'
import search from '@/view/goods/search.vue'

//  我的
import mine from '@/view/mine/index.vue'
import mineinfo from '@/view/mine/info.vue'
import address from '@/view/mine/address.vue'
import editaddress from '@/view/mine/editaddress.vue'
import password from '@/view/mine/password.vue'

//  订单
import orderlist from '@/view/order/list.vue'
import orderdetail from '@/view/order/detail.vue'

//  登录相关
import login from '@/view/login/login.vue'
import register from '@/view/login/register.vue'
import findpassword from '@/view/login/findpassword.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/newslist',
      name: 'newslist',
      component: newsList
    },
    {
      path: '/newsdetail',
      name: 'newsdetail',
      component: newsDetail
    },
    {
      path: '/join',
      name: 'join',
      component: join
    },
    {
      path: '/concat',
      name: 'concat',
      component: concat
    },
    {
      path: '/goodlist',
      name: 'goodlist',
      component: goodlist
    },
    {
      path: '/customized',
      name: 'customized',
      component: customized
    },
    {
      path: '/design',
      name: 'design',
      component: design
    },
    {
      path: '/goodsdetail',
      name: 'goodsdetail',
      component: goodsdetail
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/mine',
      name: 'mine',
      component: mine
    },
    {
      path: '/mineinfo',
      name: 'mineinfo',
      component: mineinfo
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/editaddress',
      name: 'editaddress',
      component: editaddress
    },
    {
      path: '/password',
      name: 'password',
      component: password
    },
    {
      path: '/orderlist',
      name: 'orderlist',
      component: orderlist
    },
    {
      path: '/orderdetail',
      name: 'orderdetail',
      component: orderdetail
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/findpassword',
      name: 'findpassword',
      component: findpassword
    }
  ]
})
