<template>
  <div class="full-white">
    <head-bar :back="true" title="修改密码">
      <span @click="$router.go(-1)">保存</span>
    </head-bar>

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
</template>
