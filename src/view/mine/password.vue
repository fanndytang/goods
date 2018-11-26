<template>
  <div>
    <head-bar :back="true" title="修改密码">
      <span class="text-primary f14" @click="$router.go(-1)">保存</span>
    </head-bar>

    <div class="box">
      <div class="input-field">
        <div class="label">旧密码 <span>*</span></div>
        <input type="text" placeholder="请输入当前登录密码">
      </div>

      <div class="input-field">
        <div class="label">新密码 <span>*</span></div>
        <input type="text" placeholder="请输入新的密码">
      </div>

      <div class="input-field">
        <div class="label">确认密码 <span>*</span></div>
        <input type="text" placeholder="请再次输入新密码">
      </div>
    </div>

  </div>
</template>
<style lang="less" scoped>
  .box {
    padding: 0 0 0 15px;
    border-top: 5px solid #f7f7f7;
  }
</style>
