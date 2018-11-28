<template>
  <div class="full-gray">
    <my-scroll :on-infinite="getData"
               :loading="loading"
               :nodata="list.data.length >= list.totals"
               class="news-index-scroll">
      <head-bar :back="true" title="公告通知"></head-bar>

      <div class="list" v-for="item,i in list.data" :key="i">
        <div class="date"><span>{{item.date}}</span></div>
        <router-link class="content" :to="{name: 'newsdetail', query: {id: item.id}}">
          <h3 class="title">{{item.title || ''}}</h3>
          <div class="desc">{{item.describe || ''}}</div>
          <div class="more"><img :src="require('@/assets/icons/icon_qianjin.png')" height="22px"></div>
        </router-link>
      </div>


    </my-scroll>

    <scroll-top el=".news-index-scroll"></scroll-top>
  </div>
</template>

<script>
  export default {
      data () {
          return {
                  loading: false,
            /*page: {
              current: 1,  // 当前页
              pages: 0,  //  总共多少页
            },*/

              list: {
                rows: 10,   // 一次显示多少条
                current: 0,  // 当前显示的页数
                totals: 0,   // 总共有多少条
                          data:[
                            {id: '1', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                            {id: '2', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                          ]
              }
          }
      },
    mounted () {
        this.getData()

    },
    methods: {
        getData(done) {
          this.$http.get('/api/news/list').then(res => {
            this.list.push(res.data)

          }).catch(err => {

          })

          if(this.hotGoods.data.length > 0 && this.hotGoods.data.length >= this.hotGoods.totals) return false
          this.loading = true
          ++ this.hotGoods.current
          this.$http.get('/api/get/hot', {
            params: {
              rows: this.hotGoods.rows,
              current: this.hotGoods.current
            }
          }).then(res => {
            //  this.loading = false
            this.hotGoods.data = this.hotGoods.concat(res.data)
            this.hotGoods.totals = res.page.totals

            if(done) done()
          }).catch(err => {
            // this.loading = false
            // if(done) done()
          })

          // 测试数据
          setTimeout(() => {
            let res = {
              data : [
                {id: '1', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}]},
                {id: '2', imgUrl: '../../../static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'},]},
                {id: '3', imgUrl: '../../../static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'}, {id: 1, title: '限时折扣', backColor: '#00bc0d'},]},
                {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: 'orange'}]},
                {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
                {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
              ],
              page: {
                totals: 35
              }
            }

            this.hotGoods.data = this.hotGoods.data.concat(res.data)
            this.hotGoods.totals = res.page.totals
            this.loading = false
            if(done)done();
          }, 200)


        }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    padding: 20px 15px 0 15px;
    .date {
      text-align: center;
      margin-bottom: 10px;
      span {
        background: #ccc;
        line-height: 24px;
        display: inline-block;
        padding: 0 8px;
        color: #fff;
        border-radius: 10px;
      }
    }
    .content {
      background: #fff;
      padding: 10px 15px 10px 10px;
      display: block;
      border-radius: 10px;
      .title {
        color: #1d1d1d;
        font-weight: normal;
        margin: 0;
        font-size: 15px;
        line-height: 26px;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
      }
      .desc {
        padding: 5px 0;
        font-size: 12px;
        line-height: 18px;
        color: #ccc;
      }
      .more {
        text-align: right;
      }
    }
  }
</style>
