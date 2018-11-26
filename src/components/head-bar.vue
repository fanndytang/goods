<template>
  <header class="head-bar">
    <img v-if="back" :src="require('@/assets/icons/icon_fanhui.png')" height="22px" @click="$router.go(-1)">
    <span v-if="title" class="title">{{title}}</span>
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
      title: String
    }
  }
</script>

<style lang="less" scoped>
  .head-bar {
    height: .5rem;
  //  line-height: .5rem;
    padding: 0 10px;
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

