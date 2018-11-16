<template>
  <div class="menu">
    <router-link class="item" to="/">首页</router-link>
    <router-link class="item" to="/purchase">商品定购</router-link>
    <router-link class="item" to="/customized">个性定制</router-link>
    <router-link class="item" to="/mine">商家中心</router-link>
  </div>
</template>

<style>
  body {
    padding-bottom: 2.6rem;
  }
</style>
<style lang="less" scoped>
  .menu {
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 100;
    display: flex;
    background: #ccc;
    height: 2.5rem;
    line-height: 2.5rem;
    text-align: center;
    .item {
      flex: 1;
      color: #666;
      font-weight: bold;
      &:not(:last-child) {
        border-right: 1px solid #bbb;
      }
    }
  }
</style>
