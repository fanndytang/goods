import footBar from './foot-bar.vue'
import headMenu from './head-menu.vue'
import headBar from './head-bar.vue'
import scrollTop from './scroll-top.vue'
import select from './select.vue'
import uploadImg1 from './upload-img-1.vue'
import uploadImg2 from './upload-img-2.vue'
import formNumber from './number.vue'
import selectCountry from './select-country.vue'
import myScroll from './scroll.vue'
import cropperImg from './cropper.vue'
import inputSpan from './input-span.vue'
import imgPreview from './preview.vue'
import modalLogin from './modal-login.vue'

export default {
  install: function(Vue){
    Vue.component('foot-bar', footBar)
    Vue.component('head-menu', headMenu)
    Vue.component('head-bar', headBar)
    Vue.component('scroll-top', scrollTop)
    Vue.component('form-select', select)
    Vue.component('upload-img-1', uploadImg1)
    Vue.component('upload-img-2', uploadImg2)
    Vue.component('form-number', formNumber)
    Vue.component('select-country', selectCountry)
    Vue.component('my-scroll', myScroll)
    Vue.component('cropper-img', cropperImg)
    Vue.component('input-span', inputSpan)
    Vue.component('img-preview', imgPreview)
    Vue.component('modal-login', modalLogin)
  }
}
