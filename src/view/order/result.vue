<template>
  <div class="full-gray desc" style="padding-top:1px;">
    <head-bar :back="true" :backstep="-2" title="订单信息" :menu="true"></head-bar>

    <img height="35px" :src="require('@/assets/icons/'+ (success ? 'icon_dui.png' : 'icon_cuo.png'))" alt="">
    <div>订单{{success ? '成功提交' : '提交失败'}}，请至商家中心查看实时进度</div>
    <button class="btn btn-red btn-block" type="button" @click="$router.push({name: 'orderdetail', query: {orderid: $route.query.orderid, type: 1}})">查看订单</button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        success: this.$route.query.status == 1  // 1 成功   2 失败
      }
    }
  }
</script>

<style lang="less" scoped>
  .desc {
    text-align: center;
    color: #a5a4a4;
    line-height: 20px;
  }
  img {
    margin: 35px auto 11px auto;
    display: block;
  }

  .btn {
    margin-top: 60px;
    width: 70vw;
    border-radius: 10px;
    font-size: 18px;
    height: 35px;
  }


</style>
