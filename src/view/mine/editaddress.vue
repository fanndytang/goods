<template>
  <div>
    <head-bar :back="true" title="添加收货地址">
      <span class="text-primary f14" @click="$router.go(-1)">保存</span>
    </head-bar>

    <div class="box">
      <div class="input-field">
        <div class="label">收货人 <span>*</span></div>
        <input type="text" placeholder="请输入收货人姓名">
      </div>

      <div class="input-field">
        <div class="label">联系电话 <span>*</span></div>
        <input type="text" placeholder="请输入手机号码">
      </div>

      <div class="input-field">
        <div class="label">所在地区 <span>*</span></div>
        <div class="between">
          <input type="text" placeholder="省、市、区">
          <img height="22px" :src="require('@/assets/icons/icon_qianjin.png')" alt="">
        </div>
      </div>

      <div class="input-field">
        <div class="label">详细地址 <span>*</span></div>
        <input type="text" placeholder="例：道路、小区、楼栋号、单元室等">
      </div>

      <div class="input-field">
        <div class="between checkbox">
          <div class="label">设为默认地址</div>
          <span class="check-box"><input type="checkbox" :checked="detail.isDefault"><span class="icon"></span></span>
        </div>
       </div>

      <div class="input-field del">  <!-- 编辑时显示-->
        删除地址
      </div>


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
  .box {
    padding: 0 0 0 15px;
    border-top: 5px solid #f7f7f7;
  }
  .checkbox {
    padding-right: 10px;
    height: 73px;
  }

  .del {
    color: #f20246;
    height: 50px;
    line-height: 50px;
  }

</style>
