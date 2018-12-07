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


        let params = {
          rows: this.list.rows,
          current: this.list.current
        }
        if(this.params) {
          for(let k in this.params) {
            params[k] = this.params[k]
          }
        }

        this.$http({
          url: this.url,
          method: 'get',
          data: params,
          success: (data) => {
            //  测试数据
            let d = []
            if(this.$route.path == '/orderlist') {
              d = [
                {id: 1, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 2, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 3, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 4, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 5, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 6, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 7, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 8, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 9, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
                {id: 10, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', number: '100', fineness: 'Au999', weight: '20g', format: '20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},

              ]
            }else if(this.$route.path == '/address') {
              d = [
                {id: '1', name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: true},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
                {id: '2', name: '李四', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金广东省深圳市罗湖区田贝路金利1102室利1102室', isDefault: false},
              ]
            }else if(this.$route.path == '/goodlist') {
              d = [
                {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}]},
                {id: '2', imgUrl: './static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'},]},
                {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'}, {id: 1, name: '限时折扣', value: '#00bc0d'},]},
                {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: 'orange'}]},
                {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
              ]
            }else if(this.$route.path == '/') {
              d = [
                {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}]},
                {id: '2', imgUrl: './static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'},]},
                {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: '#ff9933'}, {id: 1, name: '特价热卖', value: '#cc6666'}, {id: 1, name: '限时折扣', value: '#00bc0d'},]},
                {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, name: '新品爆款', value: 'orange'}]},
                {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
              ]
            }else if(this.$route.path == '/newslist') {
              d = [
                {id: '1', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '2', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '3', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '4', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '5', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '6', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '7', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '8', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '9', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '10', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
              ]
            }


            data = {
              data : d,
              page: {
                totals: 35
              }
            }
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
