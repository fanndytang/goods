<template>
  <div class="full-gray">
    <my-scroll :on-infinite="getData"
               :loading="loading"
               :nodata="showData.data.length >= showData.totals"
               nodatatext="没有更多商品啦"
               class="orderlist-scroll">

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
              <div class="title">{{item.size}}</div>
              <div class="answer">客服回复：{{item.answer}}</div>
            </div>
          </div>
        </router-link>

        <button class="btn btn-block btn-red" type="button" v-show="type===1" @click="cancel(item)">取消订单</button>
      </div>
    </my-scroll>

    <scroll-top el=".orderlist-scroll"></scroll-top>

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
              {title: '已取货', type: 4}
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
      this.getData()
    },
    methods: {
      // 点击类别
      clickNav(item) {
        this.type = item.type
        this.showData = this.dataAll[this.type]
        let len = this.showData.data.length
        if(len <= 0) {
          this.getData()
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
      getData(done) {
        if(this.showData.data.length > 0 && this.showData.data.length >= this.showData.totals)   return false

        this.loading = true
        ++ this.showData.current
        this.$http.get('/api/get/order', {
          params: {
            rows: this.showData.rows,
            current: this.showData.current
          }
        }).then(res => {
          //  this.loading = false
          this.showData.data = this.showData.data.concat(res.data.data)
        this.showData.totals = res.data.page.totals

        this.dataAll[this.type] = this.showData

        if(done) done()
      }).catch(err => {
          // this.loading = false
          //   if(done) done()
        })

        // 测试数据
        setTimeout(() => {
          let res = {
            data : [
              {id: 1, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 2, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 3, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 4, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 5, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 6, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 7, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 8, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 9, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},
              {id: 10, sn: '20181115093150001', date: '2018.11.15 09:31:50', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', number: '100', size: 'Au999 20g 20*23.8mm', answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'},

            ],
            page: {
              totals: 35
            }
          }

          this.showData.data = this.showData.data.concat(res.data)
        this.showData.totals = res.page.totals

        this.dataAll[this.type] = this.showData

        this.loading = false
        if(done)done();
      }, 200)

      },
      //  取消订单
      cancel(item) {
        this.$http.post('/api/order/cancel', {
          sn: item.sn
        }).then(res => {

        }).catch(err => {

        })
      }
    }
  }
</script>

<style lang="less" scoped>
  .nav {
    display: flex;
    text-align: center;
    align-items: center;
    background: #fff;
    border-top: 1px solid rgba(230, 230, 230, 1);
    font-size: 14px;

    .item {
      flex: 1;
      > span {
        margin-bottom: -1px;
        padding: 13px 0;
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
    padding: 0 0 13px 10px;
    .top {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      color: #ccc;
  //    line-height: 40px;

    /*  .date {
        font-size: 12px;
        color: #999;
      }*/
    }

    .content {
      display: flex;
      align-items: center;
      padding: 12px 18px 20px 20px;
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
        line-height: 20px;
        margin-top: 5px;
      }
    }
  }
  .btn-red {
    font-size: 15px;
    width: 53vw;
    margin: 10px auto 0 auto;
    border-radius: 30px;
  }
</style>
