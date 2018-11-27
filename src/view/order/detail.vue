<template>
  <div class="full-gray">
    <head-bar :back="true" title="订单信息" :menu="detail.type != 1">
      <span class="text-primary f14" v-if="detail.type == 1">取消订单</span>
    </head-bar>

   <!-- <div v-show="!showResult">-->
      <top :detail="detail"></top>

      <chat :chat="detail.chat"></chat>


    <purchase :purchase="detail.purchase"></purchase>



      <address-box :address="detail.address"></address-box>

  <!--  </div>-->

   <result></result>

  </div>
</template>

<script>
  import top from './detail/top.vue'
  import chat from './detail/chat.vue'
  import purchase from './detail/purchase.vue'
  import addressBox from './detail/address.vue'
  import result from './detail/result.vue'

  export default {
      data () {
          return {
            type: this.$route.query.type,


             // showFront: true,
            //  showBack: true,
           //   showChat: true,
           //   showResult: false,
              detail: {
                id: 1,
                sn: '20181115093150001',
                date: '2018.11.15 09:31:50',
                imgUrl: '../../../static/img/goods.png',
                title: '宝宝生辰定制牌',
                number: '100',
                size: 'Au999 20g 20*23.8mm',
                answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页',
                address: {
                  name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室'
                },
                purchase: {},
                chat: {}
               // type: '1',  // 订单类型  1：待确认  2：生产中  3： 已发货  4： 已取消
              }
          }
      },
    components: {
        top,
      chat,
      purchase,
      'address-box': addressBox,
      result
    }
  }
</script>

<style lang="less" scoped>
/*  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }*/



</style>
