<template>
  <div>
    <head-bar :back="true" title="修改密码"  class="gray-border-bottom">
      <span class="text-primary f14" @click="confirm()">保存</span>
    </head-bar>

    <div class="box">
      <div class="input-field">
        <div class="label">旧密码 <span>*</span></div>
        <input type="password" placeholder="请输入当前登录密码" v-model="params.oldpassword">
      </div>

      <div class="input-field">
        <div class="label">新密码 <span>*</span></div>
        <input type="password" placeholder="请输入新的密码" v-model="params.password" @blur="validPassword(params.password)">
      </div>

      <div class="input-field">
        <div class="label">确认密码 <span>*</span></div>
        <input type="password" placeholder="请再次输入新密码" v-model="confirmpassword" @blur="checkConfirm()">
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading('提交中'),
        confirmpassword: '',
        params: {
          oldpassword: '', // 旧密码
          password: ''   //  新密码
        }
      }
    },
    methods: {
      // 密码验证
      validPassword(val) {
        let reg = /^[a-zA-Z0-9]{6,16}$/
        if(!reg.test(val)) {
          this.$message.error('密码为6~16位字母与数字组合')
          return false
        }
        return true
      },
      //  检查两次密码输入是否一致
      checkConfirm() {
        if(this.params.password && (this.params.password !== this.confirmpassword)) {
          this.$message.error('两次密码输入不一致')
          return false
        }
        return true
      },
      // 注册
      confirm() {
        if(!this.params.oldpassword) {
          this.$message.error('请输入旧密码')
        }else if(!this.params.password) {
          this.$message.error('请输入新密码')
        }else if(!this.validPassword(this.params.password)) {
          // this.$message.error('密码格式不正确')
        }else if(!this.confirmpassword) {
          this.$message.error('请输入确认密码')
        }else if(!this.checkConfirm()) {
          //  this.$message.error('密码输入不一致')
        }else {
          this.loading.show()
          this.$http.post('/api/user/changepassword', this.params).then(res => {
            this.loading.hide()
          //  判断是否修改成功，给出相应提示及操作
          //  todo ...
          this.$message.success('修改成功')
          this.$router.push('/login')
        }).catch(err => {
            this.loading.hide()
          this.$message.error('修改失败，请重试')
        })
        }
      },
    }
  }
</script>

<style lang="less" scoped>
  .box {
    padding: 0 0 0 15px;
    border-top: 5px solid #f7f7f7;
  }
</style>
