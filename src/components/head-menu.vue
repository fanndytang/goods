<template>
  <div class="menu">
    <img height="22px" :src="require('@/assets/icons/top_menu.png')" @click="show = !show">

    <div class="select" v-show="show">
      <router-link class="item" to=""><img :src="require('@/assets/icons/icon_kefu.png')" />在线客服</router-link>
      <router-link class="item" to="/newslist"><img :src="require('@/assets/icons/icon_gonggao.png')" />公告通知</router-link>
      <router-link class="item" to="/join"><img :src="require('@/assets/icons/icon_jiam.png')" />加盟合作</router-link>
      <router-link class="item" to="/concat"><img :src="require('@/assets/icons/tel.png')" />联系我们</router-link>
    </div>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              show: false
          }
      }
  }

</script>

<style lang="less" scoped>
  .menu {
    position: relative;

    .select {
      position: absolute;
      min-width: 135px;
      top: 100%;
      right: -10px;
      z-index: 10;
      margin-top: 10px;
      background: #fff;
      -webkit-box-shadow: 0 2px 38px 0 rgba(7, 0, 2, 0.37);
      -moz-box-shadow: 0 2px 38px 0 rgba(7, 0, 2, 0.37);
      box-shadow: 0 2px 38px 0 rgba(7, 0, 2, 0.37);
      text-align: center;
      color: #000000;
      font-size: 13px;
      line-height: .4rem;
      border-radius: 4px;
      &:before {
        content: '';
        position: absolute;
        border-width: 0 10px 17px 10px;
        border-style: solid;
        border-color: transparent transparent #fff;
        top: -11px;
        right: 10px;
      }

      .item {
        white-space: nowrap;
        border-bottom: 1px solid rgba(235, 235, 235, 1);
        padding: 0 .25rem;
        display: block;

        img {
          height: 22px;
          vertical-align: middle;
          margin: -5px 10px 0 0;
        }
      }
    }

  }
</style>
