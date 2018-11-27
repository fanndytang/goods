<template>
  <div class="head-info">
    <div class="top" v-if="type == 1">
      订单编号：{{detail.sn}}
      <!-- <span>{{detail.date}}</span>-->
    </div>
    <div class="content">
      <div class="img"><div class="img-bg"><img :src="detail.imgUrl" alt=""></div></div>
      <div class="text">
        <div class="title">
          {{detail.title}}
          <br>
          {{detail.size}}
        </div>
        <div class="number">定购数量：{{detail.number}}件</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      //type: [String, Number],
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

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section, .head-info {
    margin-top: 10px;
    background: #fff;
  }
  .head-info {
    //  border-top: 1px solid #f3f3f3;
    // display: flex;
    // align-items: center;
    padding: 0 10px 0 15px;

    .top {
      color: #ccc;
      font-size: 12px;
      line-height: 40px;
      //padding: 0 10px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }

    .img {
      // border: 1px solid #ccc;
      width: 75px;
      height: 75px;
      text-align: center;
      border-radius: 5px;
      padding: 10px;
      background: #333;

      .img-bg {
        border: 1px solid #4e4e4e;
        width: 100%;
        height: 100%;
        padding: 2px;
      }

      img {
        //   width: 30vw;
        max-width: 100%;
        max-height: 100%;
      }
    }

    .content {
      //   padding: 20px 10px;
      padding: 15px 15px 15px 0;
      // flex: 1;
      display: flex;
      // align-items: center;
      // flex-direction: column;

      .text {
        padding-left: 10px;
        // padding-left: 20px;
        // font-size: 16px;
        // color: #999;
        // font-weight: bold;
        //    line-height: 30px;
        display: flex;
        flex-direction: column;
        line-height: 20px;

      }
      .title {
        flex: 1;
        color: #0c0c0c;
      }
      .number {
        //  margin-top: 20px;
        // color: #333;
        color: #c66;
      }
    }
  }
</style>
