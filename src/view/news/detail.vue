<template>
  <div>
    <head-bar :back="true" title="公告通知"></head-bar>

    <div class="date"><span>{{data.date}}</span></div>
    <h3 class="title">{{data.title || ''}}</h3>
    <div class="desc">
      {{data.describe || ''}}
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        data:  {
          id: '1',
          date: '2018.11.15 12:00',
          title: '关于商家加盟最新条款事宜',
          describe: '关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'
        },
      }
    }
  }
</script>
