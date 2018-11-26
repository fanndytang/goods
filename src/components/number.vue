<template>
  <div>
    <div class="form-number">
      <span class="item icon-minus">-</span>
      <span class="item num" contenteditable="true">1</span>
      <!--  <input class="item" type="number">-->
      <span class="item icon-plus">+</span>
    </div>
  </div>
</template>

<script>

</script>

<style lang="less" scoped>
  .form-number {
    .item {
      height: 22px;
      background: #e5e5e5;
      vertical-align: middle;
      margin-right: 5px;
      display: inline-block;
      text-align: center;
      border-radius: 2px;
      padding: 0 2px;
    }
    .icon-minus, .icon-plus {
      width: 22px;
      color: rgba(140, 140, 140, 1);
      font-size: 21px;
      line-height: 18px;
    }
    input[type="text"], input[type="number"], .num {
      min-width: 22px;
      border: none;
      line-height: 22px;
    }
  }
</style>
