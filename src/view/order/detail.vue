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
        orderid: this.$route.query.orderid || '',
        customid: this.$route.query.customid || '',
        designid: this.$route.query.designid || '',
        detail: {
          num: '',
          title: '',
          imgUrl: '',
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
      // 获取地址
      getAddress() {
        let httpGetAddress = () => {
          this.$http({
            url: '/api/list/address',
            success: (data) => {
              if(data.data.length > 0)  this.detail.address = data.data[0]
            }
          })
        }
        let str = this.customid ? 'siyj-customid'+this.customid : this.designid ? 'siyj-designid'+this.designid : ''
        if(str) {
          if(sessionStorage.getItem(str)) {
            let d = JSON.parse(sessionStorage.getItem(str) || "{}")
            this.detail.address = d
          }else {
            httpGetAddress()
          }
        }
      },
      // 获取订单信息
      getOrderInfo() {
        if(this.orderid) {
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
        }
        else if(this.customid) {  //  个性定制
          this.getAddress()
          let d = JSON.parse(sessionStorage.getItem(this.customid) || {})
          let img = d.imgs ? d.imgs.split(',') : []
          this.detail.num = d.num
          this.detail.title = '个性定制'
          this.detail.imgUrl = img[0]||''
          this.detail.purchase = {
            fontFamily: d.fontFamily || '',
            remark: d.remark,
            imgs: img
          }
        }
        else if(this.designid) {
          this.getAddress()
          let d = JSON.parse(sessionStorage.getItem(this.designid) || "{}")

          this.detail.purchase = d.purchase || {}
          this.detail.dict = d.dict || []
          this.detail.imgUrl = d.imgUrl
          this.detail.title = d.title
          this.detail.num = d.num
          this.detail.goodid = d.id

          console.log(this.detail.purchase.frontavatar)
        }
      },
      //  确认订单
      confirm() {
        this.loading.show()
        let d = new FormData()
        let query = {}
        if(this.customid) {  // 个性定制
          query = {
            imgs: this.detail.purchase.imgs.join(','),
            fontFamily: this.detail.purchase.fontFamily,
            num: this.detail.num,
            remark: this.detail.purchase.remark,
            addressid: this.detail.address.id,
            orderType: 'custom'
          }
          d.append('query', JSON.stringify(query))
          sessionStorage.removeItem(this.customid)
        }else if(this.designid) {  // 商品定制
          query = this.detail
          query.orderType = 'custom'
          d.append('query', JSON.stringify(query))

          sessionStorage.removeItem(this.designid)
        }
        this.$http({
          url: '',
          method: 'post',
          data: d,
          success: (data) => {
            this.loading.hide()
            this.$router.push({name: 'orderresult', query: {orderid: data.data.orderid || '', status: 1}})
          },
          error: (data) => {
            this.loading.hide()
            this.$router.push({name: 'orderresult', query: {orderid: data.data.orderid || '', status: 2}})
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
            this.type = 4
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
