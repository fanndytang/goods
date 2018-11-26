<template>
  <div class="full-gray">
    <head-bar :back="true" title="公告通知"></head-bar>

    <div class="list" v-for="item,i in list" :key="i">
      <div class="date"><span>{{item.date}}</span></div>
      <router-link class="content" :to="{name: 'newsdetail', query: {id: item.id}}">
        <h3 class="title">{{item.title || ''}}</h3>
        <div class="desc">{{item.describe || ''}}</div>
        <div class="more"><img :src="require('@/assets/icons/icon_qianjin.png')" height="22px"></div>
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
