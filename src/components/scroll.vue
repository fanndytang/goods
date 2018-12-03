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
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      },
      loading: {
        type: Boolean,
        default: true
      },
      nodatatext: {
        type: String,
        default: '没有更多数据啦'
      },
      notip: Boolean,
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
      this.getData()
      window.addEventListener('scroll', () => {
        this.onScroll()
      }, true);
    },
    methods: {
      getData () {
        if(this.list.data.length > 0 && this.list.data.length >= this.list.totals)   {
          this.infiniteLoading = false
          return false
        }

        this.infiniteLoading = true

        this.$emit('update:loading', true)

        ++ this.list.current
        /*   this.$http.get(this.url, {
         params: {
         rows: this.list.rows,
         current: this.list.current
         }
         }).then(res => {*/

        setTimeout(() => {
          //  测试数据
          let data = []
          if(this.$route.path == '/orderlist') {
            data = [
              {id: 1, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 2, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 3, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 4, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 5, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 6, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 7, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 8, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 9, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 10, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},

            ]
          }
          let res = {
            data: {
              data : data,
              page: {
                totals: 35
              }
            }
          }
          this.list.data = this.list.data.concat(res.data.data)
          this.list.totals = res.data.page.totals

          this.onInfinite()

          this.infiniteLoading = false
          this.$emit('update:loading', false)
        }, 200)
        /*   }).catch(err => {
         this.$emit('update:loading', false)

         this.infiniteLoading = false
         })*/
      },
      onScroll(e) {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0,
          scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight || 0,
          clientHeight = document.documentElement.clientHeight || document.body.clientHeight || 0,
          footHeight = this.$el.querySelector('.load-more').clientHeight

        if(!this.infiniteLoading && scrollTop + clientHeight >= scrollHeight - footHeight) {
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
    line-height: .5rem;
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
