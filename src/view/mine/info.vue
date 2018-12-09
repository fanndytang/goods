<template>
  <div>
    <head-bar :back="true" title="修改资料">
      <span class="text-primary f14" @click="confirm()">保存</span>
    </head-bar>

    <div class="avatar">
      <img class="full-img" :src="'./static/img/minecenter.jpg'" alt="">

      <cropper-img v-model="params.avatar" source="info">
        <div slot="up-trigger" slot-scope="p" class="upload">
          <input type="file" @change="p.upload($event)">
          <img id="image" class="useimg" :src="params.avatar || require('@/assets/icons/img_moren.png')" alt="">
          <img class="icon-plus" :src="require('@/assets/icons/icon_add.png')" alt="">
        </div>
      </cropper-img>

    </div>

    <div class="form-box2">
      <div class="input-field">
        <div class="label">公司名称 <span>*</span></div>
        <input type="text" placeholder="请输入公司名称" v-model="params.companyname">
      </div>

      <div class="input-field">
        <div class="label">店铺品牌 <span>*</span></div>
        <input type="text" placeholder="请输入店铺品牌" v-model="params.brand">
      </div>

      <div class="input-field">
        <div class="label">店铺位置 <span>*</span></div>
        <select-country class="between" v-model="params.position" :text.sync="positiontext">
          <span style="line-height:30px;" :style="positiontext ? '' : 'color:#ccc;'">{{positiontext || '省、市、区'}}</span>
        <!--  <input readonly type="text" placeholder="省、市、区" v-model="positiontext">-->
          <img height="22px" :src="require('@/assets/icons/icon_qianjin.png')" alt="" style="margin-right: 5px;">
        </select-country>
      </div>

      <div class="input-field">
        <div class="label">详细地址 <span>*</span></div>
        <input type="text" placeholder="例：道路、小区、楼栋号、单元室等" v-model="params.address">
      </div>

      <div class="input-field">
        <div class="label">联系人员 <span>*</span></div>
        <input type="text" placeholder="请输入联系人员" v-model="params.username">
      </div>

      <div class="input-field">
        <div class="label">联系电话 <span>*</span></div>
        <input type="text" placeholder="请输入联系电话" v-model="params.usertel">
      </div>

    </div>


  </div>
</template>

<script>
  export default {
    data () {
      return {
              loading: new this.Loading('提交中'),
        isLogin: true,
        positiontext: '',
        params: {
          avatar: '',  // 用户头像
          companyname: '',  // 公司名称
          brand: '',  //  店铺品牌
          position: '',  //  店铺位置
          address: '',  // 详细地址
          username: '',  // 联系人员
          usertel: '',   //  联系电话
        }
      }
    },
    mounted () {
            this.getInfo()
    },
    methods: {
            getInfo() {
              this.loading.show('加载中')
              this.$http({
                url: '/api/user/info',
                method: 'get',
                data: {
                  uid: this.$root.uid || ''
                },
                success: (data) => {


                  let d = data.data || {}
                  this.params = {
                    avatar: d.avatar || '',  // 用户头像
                    companyname: d.companyname || '',  // 公司名称
                    brand: d.brand || '',  //  店铺品牌
                    position: d.position || '',  //  店铺位置
                    address: d.address || '',  // 详细地址
                    username: d.username || '',  // 联系人员
                    usertel: d.usertel || '',   //  联系电话
                  }
                  this.loading.hide()
                },
                error: (data) => {
                  this.loading.hide()
                }
              })
            },
      // 提交
      confirm() {
        if(!this.params.companyname) {
          this.$message.error('请输入公司名称')
        }else if(!this.params.brand) {
          this.$message.error('请输入店铺品牌')
        }else if(!this.params.position) {
          this.$message.error('请选择店铺位置')
        }else if(!this.params.address) {
          this.$message.error('请输入详细地址')
        }else if(!this.params.username) {
          this.$message.error('请输入联系人员')
        }else if(!this.params.usertel) {
          this.$message.error('请输入联系电话')
        }else {
          this.loading.show()

          this.$http({
            url: '',
            method: 'get',
            data: this.params,
            success: (data) => {
              this.loading.hide()
              this.$message.success('修改成功')
              this.$router.push('/mine')
            },
            error: (data) => {
              this.loading.hide()
              this.$message.error('修改失败，请重试')
            }


          })


        }
      },
    }
  }
</script>
<style lang="less" scoped>

  .avatar {
    position: relative;
    .upload {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: -40px 0 0 -40px;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .icon-plus, input[type=file] {
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 9;
    }
    input[type=file] {
      opacity: 0;
      z-index: 10;
    }
  }

  .form-box2 {
    padding: 0 0 0 12px;
    border-top: 10px solid #f1f0f0;
  }
</style>
