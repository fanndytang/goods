<template>
  <div>
    <div class="upload">
      <div class="up-trigger">
        <input type="file">
        <img height="76px" :src="require('@/assets/icons/icon_up.png')" alt="">
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .up-trigger {
    position: relative;
    input[type=file] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      opacity: 0;
    }
  }
</style>
