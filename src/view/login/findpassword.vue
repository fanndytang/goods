<template>
  <div class="full-gray">
    <head-bar title="找回密码" :back="true"></head-bar>

    <div class="form-box">
      <div class="item">
        <img :src="require('@/assets/icons/icon_shouji.png')" alt="">
        <input type="text" placeholder="请输入手机号码" v-model="params.tel" @blur="checkTel(true)">
      </div>
      <div class="item m15">
        <img :src="require('@/assets/icons/icon_shouji.png')" alt="">
        <input type="text" placeholder="请输入验证码" v-model="params.code">
        <button class="btn btn-primary code" type="button" @click="getCode()" :disabled="time > 0">
          {{ time > 0 ? time+'S重获验证码' : '获取验证码' }}
        </button>
      </div>

      <div class="item">
        <img :src="require('@/assets/icons/icon_mima.png')" alt="">
        <input type="password" placeholder="密码为6~16位字母与数字组合" v-model="params.password" @blur="validPassword(params.password)">
      </div>
      <div class="item m15">
        <img :src="require('@/assets/icons/icon_mima.png')" alt="">
        <input type="password" placeholder="再次输入密码" v-model="confirmpassword" @blur="checkConfirm()">
      </div>

      <button class="btn btn-primary btn-sub btn-block" type="button"
              :disabled="disabled"
              @click="confirm()">确认</button>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading('提交中'),
        time: 0,
        confirmpassword: '', // 确认密码
        params: {
          tel: '',  //  手机号
          code: '', // 验证码
          password: '', // 密码
        }
      }
    },
    computed: {
      disabled() {
        return !(this.checkTel(true, true) && this.params.code && this.params.password && (this.checkConfirm(true) || this.params.password.length == this.confirmpassword.length))
      },
    },
    methods: {
      //  获取验证码
      getCode() {
        this.time = 60

        this.$http({
          url: '',
          method: 'get',
          data: {
            tel: this.params.tel
          },
          success: (data) => {
            let t = setInterval(() => {
              this.time --
              if(this.time <= 0) clearInterval(t)
            }, 1000)
          },
          error: (data) => {
            this.time = 0
            this.$message.error('验证码获取失败<br/>请稍后重试')
          }
        })

      },
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
      checkConfirm(notip) {
        if(this.params.password && (this.params.password !== this.confirmpassword)) {
          if(!notip) this.$message.error('两次密码输入不一致')
          return false
        }
        return true
      },
      checkTel(noempty, norule) {
        if(!this.params.tel) {
          if(!noempty) this.$message.error('请输入手机号码')
          return false
        }if(!(this.params.tel.length == 11 && /^[0-9]*$/.test(this.params.tel))) {
          if(!norule) this.$message.error('手机号码格式不正确')
          return false
        }
        return true
      },
      // 确认
      confirm() {
        if(!this.checkTel(false, false)) {

        }else if(!this.params.code) {
          this.$message.error('请输入验证码')
        }else if(!this.params.password) {
          this.$message.error('请输入密码')
        }else if(!this.validPassword(this.params.password)) {

        }else if(!this.confirmpassword) {
          this.$message.error('请输入确认密码')
        }else if(!this.checkConfirm()) {

        }else {
          this.loading.show()

          this.$http({
            url: '',
            method: 'post',
            data: this.params,
            success: (data) => {
              this.loading.hide()
              this.$message.success('修改成功')
              this.$router.push('/login')
            },
            error: (data) => {
              this.loading.hide()
              this.$message.error(data.msg ||'修改失败，请重试')
            }
          })

        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-box {
    padding: 5px 0;
  }
  .btn-sub {
    margin: .3rem auto;
  }
  .btn.code:disabled {
    background: rgba(108, 164, 182, 1);
  }
</style>
