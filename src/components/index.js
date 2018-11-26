import footBar from './foot-bar.vue'
import headMenu from './head-menu.vue'
import headBar from './head-bar.vue'
import scrollTop from './scroll-top.vue'
import select from './select.vue'
import uploadImg1 from './upload-img-1.vue'
import formNumber from './number.vue'

export default {
  install: function(Vue){
    Vue.component('foot-bar', footBar)
    Vue.component('head-menu', headMenu)
    Vue.component('head-bar', headBar)
    Vue.component('scroll-top', scrollTop)
    Vue.component('form-select', select)
    Vue.component('upload-img-1', uploadImg1)
    Vue.component('form-number', formNumber)
  }
}
