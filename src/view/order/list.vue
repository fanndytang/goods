<template>
  <div class="full-gray">
    <my-scroll :on-infinite="getData"
               :loading.sync="loading"
               :list.sync="showData"
               :params="{'type': type}"
               url="/api/list/orderlist"
               nodatatext="没有更多商品啦"
               ref="scroll">

      <head-bar :back="true" title="订单列表"></head-bar>

      <div class="nav">
        <div class="item" v-for="item,i in nav" :key="i"
             @click="clickNav(item)" :class="{'active': type==item.type}">
          <span>{{item.title}}</span>
        </div>
      </div>

      <div class="list" v-for="item,i in showData.data" :key="i">
        <router-link :to="{name: 'orderdetail', query: {orderid: item.sn, type: type}}">
          <div class="top">
            <span>订单编号：{{item.sn}}</span>
            <span>{{item.date}}</span>
          </div>

          <div class="content">
            <div class="img"><img :src="item.imgUrl" alt=""></div>
            <div class="desc">
              <div class="title">{{item.title}} <span class="num">{{item.number}}件</span></div>
              <div class="title">{{item.fineness}}&nbsp;{{item.weight}}&nbsp;{{item.format}}</div>
              <div class="answer">客服回复：{{item.answer}}</div>
            </div>
          </div>
        </router-link>

        <button class="btn btn-block btn-red" type="button" v-show="type===1" @click="cancel(item, i)">取消订单</button>
      </div>
    </my-scroll>

    <scroll-top></scroll-top>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              type: this.$route.query.type || 1,
            nav: [
              {title: '待确认', type: 1},
              {title: '生产中', type: 2},
              {title: '已发货', type: 3},
              {title: '已取消', type: 4}
            ],
            loading: false,
            dataAll: {},   //  总数据列表
            showData: {      // 当前显示的数据列表
              rows: 10,   // 一次显示多少条
              current: 0,  // 当前显示的页数
              totals: 0,   // 总共有多少条
              data: []
            },
          }
      },
    mounted () {
        this.setNav()
    },
    methods: {
      // 点击类别
      clickNav(item) {
        this.type = item.type
       // this.showData = this.dataAll[this.type]
        let len = this.dataAll[this.type].data.length
     //   let len = this.showData.data.length

        for(let k in this.dataAll[this.type]) {
          this.$refs.scroll.list[k] = this.dataAll[this.type][k]
        }

        if(len <= 0) {
          this.$refs.scroll.getData()
        }else if(len > 0 && len < this.showData.totals) {
          this.loading = true
          setTimeout(() => {this.loading = false}, 50)
        }
      },
      // 类别处理
      setNav() {
        for(let k in this.nav) {
          this.dataAll[this.nav[k].type] = {
            rows: 10,   // 一次显示多少条
            current: 0,  // 当前显示的页数
            totals: 0,   // 总共有多少条
            data: []
          }
        }
      },
      //  获取数据
      getData() {
        this.dataAll[this.type] = this.showData
      },
      //  取消订单
      cancel(item, index) {
              let load = new this.Loading('正在取消')
        load.show()

        this.$http({
          url: '',
          method: 'get',
          data: {
            sn: item.sn
          },
          success: (data) => {
            this.showData.data.splice(index, 1)

                  load.hide()
            this.$message.success('订单取消成功')
          },
          error: (data) => {
            load.hide()
            this.$message.error('订单取消失败，请重试')
          }


        })

      }
    }
  }
</script>

<style lang="less" scoped>
  .full-gray {
    padding-top: 48px;
  }
  .nav {
    position: fixed;
    width: 100vw;
   // height: 45px;
    top: 0.5rem;
    left: 0;
    display: flex;
    text-align: center;
    align-items: center;
    background: #fff;
    border-top: 1px solid rgba(230, 230, 230, 1);
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    font-size: 14px;

    .item {
      flex: 1;
      color: #333;
      > span {
        margin-bottom: -1px;
        padding: 12px 0;
        display: inline-block;
        border-bottom: 2px solid transparent;
      }
      &.active {
        color: #cc6666;
        span {
          border-bottom: 2px solid rgba(204, 102, 102, 1);
        }
      }
    }
  }

  .list {
    margin-top: 10px;
    background: #fff;
    padding: 0 0 12px 8px;
    .top {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      color: #ccc;
      padding-right: 18px;
    }

    .content {
      display: flex;
      align-items: center;
      padding: 12px 20px 24px 21px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      .img {
        border: 1px solid #f6f6f6;
        width: 55px;
        text-align: center;
        padding: 5px;
        margin-right: 20px;
        img {
          max-width: 100%;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        line-height: 22px;
        .num {
          color: #c66;
        }
      }
      .answer {
        color: #5c95a8;
        line-height: 18px;
        margin-top: 3px;
      }
    }
  }
  .btn-red {
    font-size: 15px;
    width: 53vw;
    margin: 12px auto 0 auto;
    border-radius: 30px;
  }
</style>
