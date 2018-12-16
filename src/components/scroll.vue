<template>
  <div class="scroll-loadmore">
    <slot></slot>

    <footer class="load-more">
      <div class="loading" v-show="loading"></div>
      <slot name="loadmore">
        <div class="tip" v-show="!loading && !notip"> ——<span>{{list.data.length >= list.totals ? nodatatext : '上拉显示更多'}}</span>——  </div>
      </slot>
    </footer>
  </div>
</template>

<script>
  export default {
    props: {
      url: String,   // 请求数据地址
      initnodata: Boolean,  //  进入页面不请求数据
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      },
      loading: {
        type: Boolean,
        default: false
      },
      nodatatext: {
        type: String,
        default: '没有更多数据啦'
      },
      notip: Boolean,
      params: Object,
      list: {
        type: Object,
        default: {
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data: []
        }
      }
    },
    data () {
      return {
        infiniteLoading: false
      }
    },
    mounted () {
      if(!this.initnodata) this.getData()
      window.addEventListener('scroll', () => {
        this.onScroll()
      }, true);
    },
    methods: {
      getData () {
              console.log(this.list.notInitHttp)
        if(( this.list.notInitHttp && this.list.data.length <= 0 || this.list.data.length > 0 ) && this.list.data.length >= this.list.totals)   {
          this.infiniteLoading = false
          return false
        }

        this.list.notInitHttp = true

        this.infiniteLoading = true

        this.$emit('update:loading', true)

        ++ this.list.current


        let params = {
          rows: this.list.rows,
          current: this.list.current
        }
        if(this.params) {
          for(let k in this.params) {
            params[k] = this.params[k]
          }
        }
      //  console.log(this.params)

        this.$http({
          url: this.url,
          method: 'get',
          data: params,
          success: (data) => {

            this.list.data = this.list.data.concat(data.data)
            this.list.totals = data.page.totals

            if(this.onInfinite) {
              this.onInfinite()
            }

            this.infiniteLoading = false
            this.$emit('update:loading', false)

          },
          error: (data) => {
            this.$emit('update:loading', false)
            this.infiniteLoading = false
          }

        })

      },
      onScroll(e) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
          scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0,
          clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0,
          footHeight = this.$el.querySelector('.load-more').clientHeight

        if(!this.infiniteLoading && scrollTop + clientHeight >= scrollHeight - footHeight - 50) {
          this.getData()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .scroll-loadmore {
    position: relative;
  }
  .tip {
    color: #ccc;
    font-size: 14px;
    text-align: center;
    width: 100vw;
    line-height: .45rem;
    background: #eaeaea;
    span {
      margin: 0 4px;
    }
  }
  .loading {
    text-align: center;
    display: block;
    width: 30px;
    height: 30px;
    margin: 10px auto;
    border: 2px solid #9d9d9d;
    border-top-color: transparent;
    border-radius: 50%;
    animation: circle 1s infinite;
  }

  @keyframes circle {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}
  }
</style>
