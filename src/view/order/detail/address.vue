<template>
  <div class="section">

    <div class="title flex">
      <span>收货地址</span>
      <router-link to="/address" v-if="type == 0 || type == 1">选择新地址</router-link>
    </div>
    <div class="address-box">
      <span class="name">{{address.name}}</span>
      <span class="tel">{{address.tel}}</span>
      <div class="address">{{address.address}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      address: Object
    },
    data () {
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
  .section {
    //  margin-top: 10px;
    //  background: #fff;
    .title {
      font-size: 14px;
      color: #0c0c0c;
      /* h3 {
         font-size: 14px;
       }*/
      padding: 0 15px 0 18px;
      height: 45px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }
    /*.gray {
      color: #999;
    }*/
    /*  .content {
        padding: 10px;
        line-height: 30px;
      }
      .list-item {
        display: flex;
        align-items: flex-start;
        label {
          font-weight: bold;
          margin-right: 20px;
          white-space: nowrap;
        }
      }
      .sec-box {
        background: #ccc;
        margin: 0 -10px;
        padding: 0 10px;
        line-height: 40px;
        color: #333;
        font-weight: bold;
      }*/

  }
  .address-box {
    // border-top: 10px solid #eaeaea;
    //  font-size: 14px;
    // color: #333;
    // padding: 15px 0 0 10px;
    /*  &:last-child {
        border-bottom: 10px solid #eaeaea;
      }*/
    .name, .tel {
      display: inline-block;
      margin-right: 20px;
      line-height: 22px;
      font-weight: 600;
    }
    .address {
      line-height: 18px;
      width: 80%;
    }
    /* .bar {
       margin-top: 13px;
       border-top: 1px solid rgba(230, 230, 230, 1);
       padding-top: 4px;
       height: 45px;
       display: flex;
       align-items: center;
       .flex {
         flex: 1;
       }
       .edit, .del {
         margin-right: 15px;
       }
     }*/
  }
</style>
