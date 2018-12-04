<template>
  <div class="box">
    <div class="top" v-if="type != 0">订单编号：{{detail.sn}}</div>
    <div class="content">
      <div class="img"><div class="img-bg"><img :src="detail.imgUrl" alt=""></div></div>
      <div class="text">
        <div class="title">
          <span style="font-size: 14px;margin-bottom:2px;display:inline-block;">{{detail.title}}</span><br>
          <span>{{detail.size}}</span>
        </div>
        <div class="number">定购数量：{{detail.number}}件</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      detail: Object
    },
    data() {
      return {
        type: this.$route.query.type
      }

    }
  }
</script>


<style lang="less" scoped>
  .box {
    padding: 0 15px;
    .top {
      color: #ccc;
      font-size: 12px;
      line-height: 40px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }
    .img {
      width: 76px;
      height: 76px;
      text-align: center;
      border-radius: 5px;
      padding: 6px 10px;
      background: #333;
      margin-right: 9px;
      .img-bg {
        border: 1px solid #4e4e4e;
        width: 100%;
        height: 100%;
        padding: 1px;
      }
      img {
        max-width: 100%;
        max-height: 100%;
      }
    }
    .content {
      padding: 15px 0;
      display: flex;
      .text {
        display: flex;
        flex-direction: column;
        line-height: 20px;
      }
      .title {
        flex: 1;
        color: #0c0c0c;
      }
      .number {
        color: #c66;
      }
    }
  }
</style>
