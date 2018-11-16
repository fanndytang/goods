import footBar from './foot-bar.vue'
import headMenu from './head-menu.vue'
import headBar from './head-bar.vue'

export default {
  install: function(Vue){
    Vue.component('foot-bar', footBar)
    Vue.component('head-menu', headMenu)
    Vue.component('head-bar', headBar)
  }
}
