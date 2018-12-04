<template>
  <div>
    <head-bar title="登陆" :back="true"></head-bar>
    <img :src="'./static/img/login.jpg'" alt="" class="full-img">

    <div class="form-box">
      <div class="item">
        <img height="20px" :src="require('@/assets/icons/icon_shouji.png')" alt="">
        <input type="text" placeholder="请输入您的手机号码" v-model="tel">
      </div>
      <div class="item">
        <img height="20px" :src="require('@/assets/icons/icon_mima.png')" alt="">
        <input type="password" placeholder="请输入密码" v-model="password">
      </div>

      <button class="btn btn-primary btn-block btn-sub" type="button" @click="login()" :disabled="!(tel&&password)">立即登陆</button>

      <div class="other flex-between">
        <router-link to="/findpassword">忘记密码</router-link>
        <router-link class="link" to="/register">注册账户</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tel: '',
        password: '',
        loading: new this.Loading('登陆中')
      }
    },
    mounted () {
      sessionStorage.removeItem('mysgyj_history_page')
    },
    methods: {
      //  登陆
      login() {
        if(!this.tel) {
          this.$message.error('请输入您的手机号码')
        }else if(!this.password) {
          this.$message.error('请输入密码')
        }else {
          // 测试
          sessionStorage.setItem('Authorization', true)
          this.$router.push(this.$route.query.path || sessionStorage.getItem('mysgyj_history_page') || '/')
          return
          // 测试 结束

          this.loading.show()

          this.$http.post('/api/user/login', {
            tel: this.tel,
            password: this.password
          }).then(res => {
            this.loading.hide()

            // 判断登陆成功与失败，给出相应提示及下一步
            this.$message.error('登陆成功')
            this.$router.push(this.$route.query.path || sessionStorage.getItem('mysgyj_history_page') || '/')

          }).catch(res => {
            this.loading.hide()
            this.$message.error('登陆失败')
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-box {
    border-top: 10px solid #f1f0f0;
    font-size: 16px;
    padding: 30px 40px;
    .other {
      width: 80%;
      margin: 0 auto;
      font-size: 12px;
      line-height: 14px;
      > * {
        &:nth-child(1) {
          color: #666666;
        }
      }
    }
    .item {
      padding: 4px 0 0 0;
      height: 50px;
    }
    .btn-sub {
      font-size: 16px;
      width: 90%;
    }
  }
</style>
