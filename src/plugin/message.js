/** 提示小弹窗 */
export default {
  install: (Vue, options) => {
    Vue.prototype.$message = {
      success (msg) {
        let tpl = Vue.extend({
          template: '<div class="my-message success">'+msg+'</div>'
        })

        let node = new tpl().$mount().$el
        document.body.appendChild(node)
        setTimeout(function () {
          document.body.removeChild(node)
        }, 2500)
      },
      error (msg) {
        let tpl = Vue.extend({
          template: '<div class="my-message error">'+msg+'</div>'
        })
        let node = new tpl().$mount().$el
        document.body.appendChild(node)
        setTimeout(function () {
          document.body.removeChild(node)
        }, 2500)
      }
    }
  }
}
