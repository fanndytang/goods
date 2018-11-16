<template>
  <div class="full-white">
    <head-bar :back="true" title="添加收货地址">
      <span @click="$router.go(-1)">保存</span>
    </head-bar>

    <div class="input-field">
      <div class="label">收货人 <span>*</span></div>
      <input type="text" placeholder="请输入收货人姓名">
    </div>

    <div class="input-field">
      <div class="label">联系电话 <span>*</span></div>
      <input type="text" placeholder="请输入联系电话">
    </div>

    <div class="input-field">
      <div class="label">所在地区 <span>*</span></div>
      <input type="text" placeholder="省、市、区">
    </div>

    <div class="input-field">
      <div class="label">详细地址 <span>*</span></div>
      <input type="text" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等">
    </div>

    <div class="checkbox">
      <input type="checkbox" :checked="detail.isDefault">设为默认
    </div>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              detail: {
                  isDefault: false
              }
          }
      }
  }
</script>


<style lang="less" scoped>
  .body {
    min-height: 100vh;
    background: #fff;
  }

  .checkbox {
  //  height: 40px;
    background: #ccc;
    line-height: 40px;
    margin-top: 10px;
    padding: 0 10px;
  }

</style>
