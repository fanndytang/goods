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

      <button class="btn btn-primary btn-block btn-sub" type="button" @click="login()" :disabled="!(tel&&password&&telValid)">立即登陆</button>

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
            this.$root.uid = ''
      sessionStorage.removeItem('mysgyj_history_page')
    },
    computed: {
      // 验证手机号
      telValid() {
        return this.tel.length == 11 && /^[0-9]*$/.test(this.tel)
      },
    },
    methods: {
      //  登陆
      login() {
        if(!this.tel) {
          this.$message.error('请输入您的手机号码')
        }else if(!this.telValid) {
                this.$message.error('手机号码格式不正确')
        }else if(!this.password) {
          this.$message.error('请输入密码')
        }else {
          this.loading.show()

          this.$http({
            url: '/api/user/login',
            method: 'post',
            data: {
              tel: this.tel,
              password: this.password
            },
            success: (data) => {
              this.loading.hide()

              sessionStorage.setItem('Authorization', data.data.Authorization)
              this.$root.uid = data.data.uid || ''
             // console.log(data, this.$root.uid)
              this.$message.success('登陆成功')
              this.$router.push(this.$route.query.path || sessionStorage.getItem('mysgyj_history_page') || '/')
            },
            error: (data) => {
              this.loading.hide()
              this.$message.error('登陆失败')
            }
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
