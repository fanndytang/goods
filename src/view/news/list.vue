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
        list: {
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data:[]
        }
      }
    },
    mounted () {
      this.getData()

    },
    methods: {
      getData(done) {
        if(this.list.data.length > 0 && this.list.data.length >= this.list.totals) return false
        this.loading = true
        ++ this.list.current
        this.$http.get('/api/news/list', {
          params: {
            rows: this.list.rows,
            current: this.list.current
          }
        }).then(res => {
          //  this.loading = false
          this.list.data = this.list.data.concat(res.data)
        this.list.totals = res.page.totals

        if(done) done()
      }).catch(err => {
          // this.loading = false
          // if(done) done()
        })

        // 测试数据
        setTimeout(() => {
          let res = {
            data : [
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
            ],
            page: {
              totals: 35
            }
          }

        this.list.data = this.list.data.concat(res.data)
        this.list.totals = res.page.totals
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
