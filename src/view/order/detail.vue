<template>
  <div class="full-gray" style="padding-top:1px;">
    <head-bar :back="true" title="订单信息" :menu="type != 1">
      <span class="text-primary f14" @click="cancel()" v-if="type == 1">取消订单</span>
    </head-bar>

    <top class="section" :detail="detail" :type="type"></top>

    <chat class="section" :chat="detail.chat" :type="type"></chat>

    <purchase class="section" :purchase="detail.purchase" :type="type"></purchase>

    <address-box class="section" :address="detail.address" :type="type"></address-box>

    <div class="result" v-if="type == 0">
      <button class="btn btn-red btn-block btn-sub" type="button" @click="confirm()">确定提交</button>
    </div>

  </div>
</template>

<script>
  import top from './detail/top.vue'
  import chat from './detail/chat.vue'
  import purchase from './detail/purchase.vue'
  import addressBox from './detail/address.vue'

  export default {
    data () {
      return {
        type: this.$route.query.type,
        loading: new this.Loading('提交中'),
        detail: {
          chat: [],
          purchase: {},
          address: {}
        }
      }
    },
    mounted() {
      this.getOrderInfo()
    },
    methods: {
      // 获取订单信息
      getOrderInfo() {
        this.loading.show('加载中')

        this.$http({
          url: '/api/order/detail',
          method: 'get',
          data: {
            sn: this.$route.query.orderid
          },
          success: (data) => {

            this.detail = data.data
            this.loading.hide()

          },
          error: (data) => {
            this.loading.hide()
          }


        })



      },
      //  确认订单
      confirm() {
        this.loading.show()

        this.$http({
          url: '',
          method: 'post',
          data: {
            sn: this.$route.query.orderid
          },
          success: (data) => {

            this.loading.hide()
            this.$router.push({name: 'orderresult', query: {orderid: this.$route.query.orderid, status: data.status ? 1 : 2}})
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('提交失败，请重试')
          }


        })


      },
      // 取消订单
      cancel() {
        this.loading.show()

        this.$http({
          url: '',
          method: 'post',
          data: {
            sn: this.$route.query.orderid
          },
          success: (data) => {

            this.loading.hide()
            // this.$router.push({name: 'orderdetail', query: {orderid: this.$route.query.orderid, type: 4}})
            this.type = 4
            //  this.getOrderInfo()
            this.$message.success('订单取消成功')
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('提交失败，请重试')
          }


        })


      }
    },
    components: {
      top,
      chat,
      purchase,
      'address-box': addressBox
    }
  }
</script>

<style lang="less" scoped>
  .full-gray {
    padding-bottom: 45px;
  }
  .section {
    margin-top: 10px;
    background: #fff;
  }
  .result {
    margin-top: 45px;
  }
  .btn-sub {
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    z-index: 100;
    height: 45px;
    font-size: 16px;
  }
</style>
