<template>
  <div>
    <head-bar :back="true" title="加盟合作"></head-bar>

    <h3 class="title">{{data.title || ''}}</h3>
    <div class="date">{{data.date}}</div>
    <div class="gonggao-desc" v-html="data.describe || ''"></div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading(),
        data:  {
          //id: '1',
          date: '2018.11.15 12:00',
          title: '关于商家加盟最新条款事宜',
          describe: '<img src="./static/img/new.jpg" />关于商家加盟最新条款事宜,关于商家加盟最新条款事宜,关于商家加盟最新条款事宜'
        },
      }
    },
    mounted() {
      this.loading.show()
      this.$http.get('/api/news/join').then(res => {
        this.data = res.data.data
      this.loading.hide()
    }).catch(err => {
        this.loading.hide()
      //   this.data = {}
    })
    }
  }
</script>

<style>
  .gonggao-desc img {
    width: 100%;
    margin: 10px 0;
  }
</style>

<style lang="less" scoped>
  .title {
    padding: 4px 0 0 0;
    margin: 0;
    color: #1d1d1d;
    font-size: 16px;
    text-align: center;
    line-height: 32px;
    border-top: 10px solid #eaeaea;
    font-weight: normal;
  }
  .date {
    color: #ccc;
    text-align: center;
    line-height: 16px;
    margin: 0 0 10px 0;
  }
  .gonggao-desc {
    border-top: 1px solid rgba(234, 234, 234, 1);
    padding: 5px 12px;
    color: #0c0c0c;
    font-size: 14px;
    line-height: 18px;
  }
</style>
