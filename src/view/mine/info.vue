<template>
  <div class="full-white">
    <head-bar :back="true" title="修改资料">
      <span @click="$router.go(-1)">保存</span>
    </head-bar>

    <div class="avatar">
      <input type="file">
      <img src="../../../static/imgs/avatar.png" alt="">
    </div>

    <div class="input-field">
      <div class="label">公司名称 <span>*</span></div>
      <input type="text" placeholder="请输入公司名称">
    </div>

    <div class="input-field">
      <div class="label">店铺品牌 <span>*</span></div>
      <input type="text" placeholder="请输入店铺品牌">
    </div>

    <div class="input-field">
      <div class="label">店铺位置 <span>*</span></div>
      <input type="text" placeholder="省、市、区">
    </div>

    <div class="input-field">
      <div class="label">详细地址 <span>*</span></div>
      <input type="text" placeholder="详细地址：如道路、门牌号、小区、楼栋号、单元室等">
    </div>

    <div class="input-field">
      <div class="label">联系人员 <span>*</span></div>
      <input type="text" placeholder="请输入联系人员">
    </div>

    <div class="input-field">
      <div class="label">联系电话 <span>*</span></div>
      <input type="text" placeholder="请输入联系电话">
    </div>

  </div>
</template>

<style lang="less" scoped>
  .body {
    background: #fff;
    min-height: 100vh;
  }

  .avatar {
    background: #ccc;
    text-align: center;
    position: relative;
    input[type=file] {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 10;
    }
  }
</style>
