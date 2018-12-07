<template>
  <div class="full-gray">
    <my-scroll :list.sync="list" url="/api/list/news">
      <head-bar :back="true" title="公告通知"></head-bar>

      <div style="padding: 15px;">
        <div class="list" v-for="item,i in list.data" :key="i">
          <div class="date"><span>{{item.date}}</span></div>
          <router-link class="content" :to="{name: 'newsdetail', query: {id: item.id}}">
            <h3 class="title">{{item.title || ''}}</h3>
            <div class="desc">{{item.describe || ''}}</div>
            <div class="more"><img :src="require('@/assets/icons/icon_qianjin.png')" height="22px"></div>
          </router-link>
        </div>
      </div>


    </my-scroll>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        list: {
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data:[]
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .list {
    .date {
      text-align: center;
      span {
        background: #ccc;
        line-height: 26px;
        display: inline-block;
        padding: 0 5px;
        color: #fff;
        border-radius: 13px;
      }
    }
    .content {
      margin: 10px 0 20px 0;
      background: #fff;
      padding: 5px 15px 10px 10px;
      display: block;
      border-radius: 10px;
      .title {
        color: #1d1d1d;
        font-weight: normal;
        margin: 0;
        font-size: 15px;
        line-height: 30px;
        border-bottom: 1px solid rgba(237, 237, 237, 1);
      }
      .desc {
        padding: 5px 0 0 0;
        font-size: 12px;
        line-height: 20px;
        color: #ccc;
      }
      .more {
        text-align: right;
        margin-top: -3px;
      }
    }
  }
</style>
