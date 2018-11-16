<!-- 我的 首页 -->
<template>
  <div>
    <head-bar title="商家中心" :menu="true"></head-bar>

    <div class="userinfo">
      <div class="img"><img :src="userinfo.avatar" alt=""></div>
      <div class="text">
        <div class="tel">{{userinfo.tel}}</div>
        <router-link to="/mineinfo" class="link">修改资料  <span class="fa fa-chevron-right"></span></router-link>
      </div>
    </div>

    <div class="order">
      <div class="top">
        <span class="title">订单列表</span>
        <router-link class="link" to="/orderlist">全部订单 <span class="fa fa-chevron-right"></span></router-link>
      </div>

      <div class="status">
        <router-link :to="{name: 'orderlist', query: {type: 1}}" class="item">
          <img src="../../../static/imgs/ii.png" alt="">
          <div>待确认</div>
        </router-link>
        <router-link :to="{name: 'orderlist', query: {type: 2}}" class="item">
          <img src="../../../static/imgs/ii.png" alt="">
          <div>生产中</div>
        </router-link>
        <router-link :to="{name: 'orderlist', query: {type: 3}}" class="item">
          <img src="../../../static/imgs/ii.png" alt="">
          <div>已发货</div>
        </router-link>
        <router-link :to="{name: 'orderlist', query: {type: 4}}" class="item">
          <img src="../../../static/imgs/ii.png" alt="">
          <div>已取消</div>
        </router-link>
      </div>
    </div>

    <div class="other">
      <router-link to="/address" class="item">
        <span class="label">收货地址</span>
        <span class="fa fa-chevron-right"></span>
      </router-link>
      <router-link to="/password" class="item">
        <span class="label">修改密码</span>
        <span class="fa fa-chevron-right"></span>
      </router-link>

      <div class="btn-box"><button type="button">退出登录</button></div>
    </div>




  </div>
</template>

<script>
  export default {
      data () {
          return {
              userinfo: {
                avatar: '../../../static/imgs/avatar.png',
                tel: '13800138000'
              }
          }
      }
  }
</script>

<style lang="less" scoped>
  .userinfo {
    background: #ccc;
    padding: 10px;
    display: flex;
    align-items: center;
    .tel {
      color: #fff;
    }
  }

  .order {
    margin-top: 10px;
    background: #fff;
    .top {
      padding: 0 10px;
      height: 40px;
      display: flex;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .title {
        font-size: 16px;
        flex: 1;
      }
    }
  }

  .status {
    display: flex;
    text-align: center;
    .item {
      padding: 10px 0;
      flex: 1;
    }
  }

  .other {
    background: #fff;
    margin-top: 10px;
    .item {
      display: flex;
      border-bottom: 1px dotted #ccc;
      align-items: center;
      padding: 0 10px;
      line-height: 40px;
      .label {
        flex: 1;
      }
    }

    .btn-box {
      padding: 30px 40px;
      button {
        width: 100%;
        border: transparent;
        background: #000;
        color: #fff;
        line-height: 40px;
      }
    }
  }
</style>
