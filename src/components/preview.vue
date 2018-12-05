<template>
  <div>
    <slot></slot>

    <div class="modal modal-box" v-show="visible" @click="closeModal($event)">
      <div class="box">
        <div class="item" v-for="item,i in list" :key="i" :style="`transform:translateX(${(i-active)*100}%);`">
          <img :src="item" alt="" ref="previewimg" style="margin:0;">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: Array
    },
    watch: {
      visible(val) {
        document.body.style.overflow = val ? 'hidden' : 'auto'
      }
    },
    data () {
      return {
        active: 0,
        visible: false,
        scaleList: []
      }
    },
    mounted() {
      this.initImg()
    },
    methods: {
      // 缩放、拖动、滑动方法
      init() {
        let that = this
        function MyScale(options) {
          options = options || {}
          this.img = options.img || {}
          this.scale = 1     //   缩放
          this.ratio = 0.1   //   缩放比例
          this.hammer = new Hammer(this.img)

          this.scaleImg()
          this.dragImg()
          this.swiper()
        }
        // 恢复图片位置
        MyScale.prototype.reset = function() {
          this.scale = 1
          this.img.style.transform = `scale(${this.scale})`
          this.img.style.left = '0px'
          this.img.style.top = '0px'
        }
        // 缩放图片
        MyScale.prototype.scaleImg = function() {
          this.hammer.get('pinch').set({enable: true})
          this.hammer.on('pinchin', (ev) => {setCss(-1)})
          this.hammer.on('pinchout', (ev) => {setCss(1)})

          let setCss = (dir) => {
            this.scale = Math.max(this.scale + dir*this.ratio, 1)   //  保证最小不缩放为0
            this.img.style.transform = `scale(${this.scale})`
          }
        }
        // 拖动图片
        MyScale.prototype.dragImg = function() {
          let getCss = (o, key) => {
            return o.currentStyle? o.currentStyle[key] : document.defaultView.getComputedStyle(o,false)[key];
          }
          this.img.style.top = getCss(this.img,"top")
          this.img.style.left = getCss(this.img,"left")

          let x = 0, y = 0, w = window.innerWidth, h = window.innerHeight
          this.hammer.on('panstart',(event) =>{
            x = parseInt(this.img.style.left)
            y = parseInt(this.img.style.top)

            x = isNaN(x) ? 0 : x
            y = isNaN(y) ? 0 : y
          })
          this.hammer.on('panmove',(event) => {
            this.img.style.top = Math.min(Math.max((-1*this.img.height + 120)*this.scale, y + event.deltaY), (h-120)*this.scale) + "px"
            this.img.style.left = Math.min(Math.max((-1*this.img.width + 120)*this.scale, x + event.deltaX), (w-120)*this.scale) + "px"
          })
          this.hammer.on('panend',function(event){
          })
        }
        // 滑动
        MyScale.prototype.swiper = function() {
          let hammerParent = new Hammer($(this.img).parent()[0])

          hammerParent.on('swipeleft', (event) => {
            let active = Math.min(that.active + 1, that.list.length - 1)
            if(active != that.active) this.reset()
            that.active = active
          })
          hammerParent.on('swiperight', (event) => {
            let active = Math.max(that.active - 1, 0)
            if(active != that.active) this.reset()
            that.active = active
          })
        }

        return MyScale
      },
      // 关闭弹窗
      closeModal(e) {
        if(e.target.className.match('modal-box') !== null) {
          this.visible = false
          this.active = 0
          for(let k in this.scaleList) {
            let scaleEle = this.scaleList[k]
            scaleEle.reset()
          }
        }
      },
      // 初始化图片事件
      initImg() {
        this.$nextTick(() => {
          let imgs = this.$refs.previewimg, MyScale = this.init()
          for(let k in imgs) {
            this.scaleList.push(new MyScale({img: imgs[k]}))
          }
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 100;

    .box {
      background: #fff;
      position: absolute;
      width: 100%;
      height: 50%;
      top: 50%;
      left: 0;
      -webkit-transform: translateY(-50%);
      -moz-transform: translateY(-50%);
      -ms-transform: translateY(-50%);
      -o-transform: translateY(-50%);
      transform: translateY(-50%);

      overflow: hidden;

      .item {
        width: 100%;
        text-align: center;

        position: absolute;
        height: 100%;
        transition: all .4s ease-in-out;
        overflow: hidden;

        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    img {
      max-width: 100%;
      max-height: 100%;
      position: relative;

    }
  }
</style>
