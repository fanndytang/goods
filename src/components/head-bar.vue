<template>
  <header class="head-bar">
    <img v-if="back" :src="require('@/assets/icons/icon_fanhui.png')" height="22px" @click="backTo()">
    <span v-if="title" class="title" v-html="title"></span>
    <slot name="menu-left"></slot>
    <head-menu v-if="menu"></head-menu>
    <slot></slot>
  </header>
</template>

<script>
  export default {
    props: {
      back: Boolean,
      menu: Boolean,
      title: String,
      backpath: String, // 返回的路径
      backstep: Number   // 返回的步数
    },
    methods: {
      backTo() {
        if(this.backstep) {
          this.$router.go(this.backstep)
        }else if(this.backpath) {
          this.$router.push(backpath)
        }else {
          this.$router.go(-1)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .head-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    z-index: 10;
    height: .5rem;
    //  line-height: .5rem;
    padding: 0 15px 0 10px;
    text-align: center;
    background: #fff;
    display: flex;
    align-items: center;
    .title {
      flex: 1;
      color: #000;
      font-size: 18px;
    }
  }


</style>

