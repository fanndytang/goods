<template>
  <div>
    <head-bar :back="true" title="公告通知"></head-bar>

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
        data:  {},
      }
    },
    mounted() {
      this.loading.show()

      this.$http({
        url: '/api/news/detail',
        method: 'get',
        data: {
          id: this.$route.query.id || ''
        },
        success: (data) => {

          this.data = data.data
          this.loading.hide()
        },
        error: (data) => {
          this.loading.hide()
        }
      })

    }
  }
</script>

<style>
  .gonggao-desc img {
    width: 100%;
    margin: 6px 0;
  }
</style>

<style lang="less" scoped>
  .title {
    padding: 7px 0 0 0;
    margin: 0;
    color: #1d1d1d;
    font-size: 16px;
    text-align: center;
    line-height: 26px;
    border-top: 10px solid #eaeaea;
    font-weight: normal;
  }
  .date {
    color: #ccc;
    text-align: center;
    line-height: 22px;
    margin: 0 0 7px 0;
  }
  .gonggao-desc {
    border-top: 1px solid rgba(234, 234, 234, 1);
    padding: 9px 12px;
    color: #0c0c0c;
    font-size: 13px;
    line-height: 19px;
  }
</style>
