/** loading */
export default {
  install: (Vue, options) => {
    let loading = function(msg) {
      this.msg = msg || '加载中'
      this.tpl = {}

      this.init()
    }
    loading.prototype.init = function() {
      let tpl = Vue.extend({
        template: '<div class="my-loading"> <span class="icon-load"></span><span class="text">'+this.msg+'</span></div>'
      })

      let node = new tpl().$mount().$el
      document.body.appendChild(node)

      this.tpl = node
    }
    loading.prototype.show = function(msg) {
      if(msg) this.tpl.querySelector('.text').innerText = msg
      this.tpl.style.display = 'flex'
    }
    loading.prototype.hide = function() {
      if(this.tpl.querySelector('.text').innerText !== this.msg) {
        this.tpl.querySelector('.text').innerText = this.msg
      }
      this.tpl.style.display = 'none'
    }

    Vue.prototype.Loading = loading
  }
}
