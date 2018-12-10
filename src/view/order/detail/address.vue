<template>
  <div class="box">
    <div class="title flex-between flex-xcenter">
      <span>收货地址</span>
      <router-link :to="{name:'address', query: {orderid: orderid, customid: customid, designid: designid}}" v-if="type == 0 || type == 1" style="color:#5c95a8;">选择新地址</router-link>
    </div>
    <span class="name">{{data.name || address.name}}</span>
    <span class="tel">{{data.tel || address.tel}}</span>
    <div class="address">{{data.address || address.address}}</div>
  </div>
</template>


<script>
  export default {
    props: {
      address: Object,
      type: [Number, String]
    },
    data () {
      return {
        orderid: this.$route.query.orderid,
        customid: this.$route.query.customid,
        designid: this.$route.query.designid,
        data: {}
      }
    },
    mounted () {
            if(sessionStorage.getItem('siyj-orderaddressid'+this.orderid)) {
                    this.data = {
                            id: sessionStorage.getItem('siyj-orderaddressid'+this.orderid),
                            name: sessionStorage.getItem('siyj-orderaddressname'+this.orderid),
                            tel: sessionStorage.getItem('siyj-orderaddresstel'+this.orderid),
                            address: sessionStorage.getItem('siyj-orderaddressaddress'+this.orderid),
                    }
            }

    }
  }
</script>

<style lang="less" scoped>
 .title {
   height: 40px;
   margin-bottom: 9px;
   border-bottom: 1px solid rgba(230, 230, 230, 1);
 }
  .box {
    padding: 0 10px 17px 15px;
    line-height: 20px;
    font-size: 14px;
    color: #333;
  }

 .name, .tel {
   display: inline-block;
   margin-right: 20px;
   font-weight: 600;
 }
 .address {
   width: 80%;
 }
</style>
