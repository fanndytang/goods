<template>
  <div class="box">
    <div class="title flex-between flex-xcenter">
      <span>收货地址</span>
      <router-link class="text-primary" :to="{name:'address', query: {orderid: orderid}}" v-if="type == 0 || type == 1">选择新地址</router-link>
    </div>
    <span class="name">{{data.name || address.name}}</span>
    <span class="tel">{{data.tel || address.tel}}</span>
    <div class="address">{{data.address || address.address}}</div>
  </div>
</template>


<script>
  export default {
    props: {
      address: Object
    },
    data () {
      return {
        type: this.$route.query.type,
        orderid: this.$route.query.orderid,
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
   font-size: 14px;
   color: #0c0c0c;
   height: 45px;
   margin-bottom: 9px;
   border-bottom: 1px solid rgba(230, 230, 230, 1);
 }
  .box {
    padding: 0 10px 14px 15px;
    font-size: 14px;
    line-height: 18px;
  }

 .name, .tel {
   display: inline-block;
   margin-right: 20px;
   line-height: 22px;
   font-weight: 600;
 }
 .address {
   line-height: 18px;
   width: 80%;
   margin-top: 3px;
 }
</style>
