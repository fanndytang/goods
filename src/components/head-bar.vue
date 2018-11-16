<template>
  <header class="head-bar">
    <span v-if="back" class="fa fa-chevron-left back" @click="$router.go(-1)"></span>
    <span v-if="title" class="title">{{title}}</span>
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
    height: 2.5rem;
    line-height: 2.5rem;
    padding: 0 10px;
    text-align: center;
    background: #fff;
    display: flex;
    align-items: center;
    .title {
      flex: 1;
      font-weight: bold;
    }
    .back {
      font-size: 20px;
      color: #999;
    }
  }
</style>

