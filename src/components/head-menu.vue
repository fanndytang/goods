<template>
  <div class="menu">
    <span class="fa fa-bars" @click="show = !show"></span>
    <div class="select" v-show="show">
      <router-link class="item" to="">在线客服</router-link>
      <router-link class="item" to="/newslist">公告通知</router-link>
      <router-link class="item" to="">加盟合作</router-link>
      <router-link class="item" to="">联系我们</router-link>
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
      top: 100%;
      right: 0;
      z-index: 10;
      background: #fff;
      padding: 10px;

      .item {
        white-space: nowrap;
      }
    }

  }
</style>
