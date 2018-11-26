<template>
  <div class="full-gray">
    <head-bar title="注册" :back="true"></head-bar>

    <div class="form-box">
      <div class="item">
        <img :src="require('@/assets/icons/icon_shouji.png')" alt="">
        <input type="text" placeholder="请输入手机号码" v-model="params.tel">
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

      <div class="item">
        <img :src="require('@/assets/icons/icon_gongsi.png')" alt="">
        <input type="text" placeholder="请输入公司名称" v-model="params.companyname">
      </div>
      <div class="item">
        <img :src="require('@/assets/icons/brand.png')" alt="">
        <input type="text" placeholder="请输入店铺品牌" v-model="params.brand">
      </div>
      <div class="item" id="position">
        <img :src="require('@/assets/icons/icon_dizhi.png')" alt="">
        <input type="text" readonly placeholder="请输入店铺位置" v-model="positiontext">
        <img height="22px" :src="require('@/assets/icons/icon_qianjin.png')" alt="" style="margin-right: 0;">
      </div>
      <div class="item">
        <img :src="require('@/assets/icons/icon_dizhi.png')" alt="">
        <input type="text" placeholder="请输入详细地址" v-model="params.address">
      </div>
      <div class="item">
        <img :src="require('@/assets/icons/icon_xingming.png')" alt="">
        <input type="text" placeholder="请输入联系人员姓名" v-model="params.username">
      </div>
      <div class="item">
        <img :src="require('@/assets/icons/tel.png')" alt="">
        <input type="text" placeholder="请输入联系电话" v-model="params.usertel">
      </div>

      <button class="btn btn-primary btn-sub btn-block" type="button" @click="confirm()">立即注册</button>

      <router-link class="link" to="/login">已有账号登录</router-link>
    </div>
  </div>
</template>

<script>
  import MobileSelect from 'mobile-select'
  import country from '@/plugin/country'

  export default {
    data () {
      return {
        loading: new this.Loading('注册中'),
        time: 0,
        confirmpassword: '', //  确认密码
        positiontext: '',   //  店铺位置名称
        params: {
          tel: '',  // 手机号
          code: '',  // 验证码
          password: '', //  密码
          companyname: '',  //  公司名称
          brand: '',  //  店铺品牌
          position: '', //  店铺位置
          address: '',  //  详细地址
          username: '',  //  联系人员姓名
          usertel: '',   //  联系人员电话
        }
      }
    },
    mounted () {
      this.countrySel()
    },
    methods: {
      //  获取验证码
      getCode() {
        this.time = 60

        this.$http.get('/api/user/code', {
          tel: this.params.tel
        }).then(res => {

          let t = setInterval(() => {
            this.time --
            if(this.time <= 0) clearInterval(t)
          }, 1000)

        }).catch(err => {
          this.time = 0
          this.$message.error('验证码获取失败<br/>请稍后重试')
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
      checkConfirm() {
        if(this.params.password && (this.params.password !== this.confirmpassword)) {
          this.$message.error('两次密码输入不一致')
          return false
        }
        return true
      },
      // 注册
      confirm() {
        if(!this.params.tel) {
          this.$message.error('请输入手机号码')
        }else if(!this.params.code) {
          this.$message.error('请输入验证码')
        }else if(!this.params.password) {
          this.$message.error('请输入密码')
        }else if(!this.validPassword(this.params.password)) {
         // this.$message.error('密码格式不正确')
        }else if(!this.confirmpassword) {
          this.$message.error('请输入确认密码')
        }else if(!this.checkConfirm()) {
        //  this.$message.error('密码输入不一致')
        }else if(!this.params.companyname) {
          this.$message.error('请输入公司名称')
        }else {
          this.loading.show()
          this.$http.post('/api/user/register', this.params).then(res => {
            this.loading.hide()
            //  判断是否注册成功，给出相应提示及操作
            //  todo ...
            this.$message.success('注册成功')
            this.$router.push('/login')
          }).catch(err => {
            this.loading.hide()
            this.$message.error('注册失败，请重试')
          })
        }
      },
      //  地区选择
      countrySel() {
        let that = this
        let mobileSelect = new MobileSelect({
          trigger: '#position',
          title: '配送至',
          triggerDisplayData: false,
          wheels: [{data: [{id: 1, label: '', child: [{id: 11, label: ''}]}]}],
          keyMap: {id:'id', value: 'label', childs :'child'},
          callback:function(indexArr, data){
            let str = '', ids = ''
            for(let k in data) {
                    ids += (ids ? ',' : '') + (data[k].id || '')
                    str += (data[k].label || '')
            }
            that.params.position = ids
            that.positiontext = str
          }
        });

        this.$http.get('/api/country').then(res => {
          mobileSelect.updateWheels(res.data);
        }).catch(err => {})

        //测试： country 为测试数据
        setTimeout(() => {
          mobileSelect.updateWheels(country);
        }, 1000)
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-box {
    padding: 5px 0;
  }
  .btn-sub {
    margin: .3rem auto .5rem auto;
  }
  .link {
    text-align: center;
    margin-bottom: .3rem;
    display: block;
  }
  .btn.code:disabled {
    background: rgba(108, 164, 182, 1);
  }
</style>
