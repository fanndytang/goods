<template>
  <div>
    <head-bar :back="true" title="公告通知"></head-bar>

    <div class="list" v-for="item,i in list" :key="i">
      <div class="date"><span>{{item.date}}</span></div>
      <router-link class="content" :to="{name: 'newsdetail', query: {id: item.id}}">
        <h3 class="title">{{item.title || ''}}</h3>
        <div class="desc">
          <p>{{item.describe || ''}}</p>
          <span class="fa fa-chevron-right"></span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              list: [
                {id: '1', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
                {id: '2', date: '2018.11.15 12:00', title: '关于商家加盟最新条款事宜', describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'},
              ]
          }
      }
  }
</script>

<style lang="less" scoped>
  .list {
    padding: 20px 10px 0 10px;
    .date {
      text-align: center;
      span {
        background: #ccc;
        line-height: 24px;
        display: inline-block;
        padding: 0 10px;
        color: #fff;
      }
    }
    .content {
      background: #fff;
      padding: 10px;
      margin-top: 10px;
      display: block;
      .title {
        margin: 0;
        font-size: 15px;
        line-height: 26px;
        border-bottom: 1px solid #ccc;
      }
      .desc {
        display: flex;
        align-items: center;
        padding: 5px 0;
        p {
          flex: 1;
          margin: 0;
        }
      }
    }
  }
</style>
