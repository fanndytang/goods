<!-- 我的 首页 -->
<template>
  <div>
    <head-bar title="商家中心" :menu="true"></head-bar>

    <div class="userinfo">
      <img class="full-img" :src="'./static/img/minecenter.jpg'" alt="">
      <div class="content flex-xcenter full-absolute">
        <img class="avatar" :src="userinfo.avatar || require('@/assets/icons/img_moren.png')" alt="">

        <div class="text">
          <div class="tel">{{isLogin ? userinfo.tel : '您还未登陆？请先登录'}}</div>
          <router-link v-if="isLogin" to="/mineinfo" class="link">修改资料> </router-link>
          <router-link v-if="!isLogin" :to="{name: 'login', query:{path: '/mine'}}" class="link">去登陆</router-link>
        </div>
      </div>
    </div>

    <div class="section flex-between flex-xcenter top border-bottom">
      <span class="title">我的订单</span>
      <router-link class="link" to="/orderlist">全部订单 <img height="14px" :src="require('@/assets/icons/icon_right.png')" alt=""></router-link>
    </div>
    <div class="order">
      <router-link v-for="item,i in order" :key="i" :to="{name: 'orderlist', query: {type: item.type}}" class="item">
        <img :src="item.icon" alt=""><div>{{item.label}}</div>
      </router-link>
    </div>

    <div class="section info">
      <div class="title">我的信息</div>
      <div class="other">
        <router-link to="/address" class="item flex-between flex-xcenter">
          收货地址<img height="13px" :src="require('@/assets/icons/icon_right.png')" alt="">
        </router-link>
        <router-link to="/password" class="item flex-between flex-xcenter">
          修改密码<img height="13px" :src="require('@/assets/icons/icon_right.png')" alt="">
        </router-link>
      </div>
    </div>

    <div class="section form-box">
      <button type="button" class="btn btn-primary btn-block btn-sub" :disabled="!isLogin" @click="loginOut()">退出登陆</button>
    </div>

    <foot-bar></foot-bar>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        loading: new this.Loading(),       //  loading 显示隐藏
        isLogin: false,    //  是否登录
        userinfo: {},        //  用户信息
        order: [
          {label: '待确认', type: 1, icon: require('@/assets/icons/icon_daiqueren.png')},
          {label: '生产中', type: 2, icon: require('@/assets/icons/icon_scz.png')},
          {label: '已发货', type: 3, icon: require('@/assets/icons/icon_yifahuo.png')},
          {label: '已取消', type: 4, icon: require('@/assets/icons/icon_yiquxiao.png')}
        ]
      }
    },
    mounted () {
      this.getUserInfo()
    },
    methods: {
      // 获取用户信息
      getUserInfo() {
        this.isLogin = sessionStorage.getItem('Authorization') || false   //  登陆标志

        if(!this.isLogin) return false
        this.loading.show()
        this.$http.get('/api/user/info').then((res) => {
          this.userinfo = res.data.data
          this.loading.hide()
        }).catch((err) => {
          this.userinfo = {}
          this.loading.hide()
        })

        //  测试数据
        setTimeout(() => {
          this.userinfo = {
            avatar: './static/img/g1.png',
            tel: '13800138000',
          }
        }, 500)
      },
      // 退出登录
      loginOut() {
        this.$http.get('/api/user/out').then((res) => {
          sessionStorage.removeItem('Authorization')
          this.$router.push('/')
        }).catch(err => {
          sessionStorage.removeItem('Authorization')
          this.$router.push('/')
        })
      }

    }
  }
</script>

<style lang="less" scoped>
  .userinfo {
    position: relative;
    .content {
      color: #fff;
      font-size: 16px;
    }
    .avatar {
      height: 81px;
      width: 80px;
      max-height: 80%;
      margin: 0 20px;
      border-radius: 50%;
    }
    .link {
      line-height: 20px;
      font-size: 12px;
      text-align: center;
      border-radius: 10px;
      display: inline-block;
      margin: 8px 0;
      padding: 0 15px;
      background: #28738c;
      color: #fff;
    }
  }
  .section {
    border-top: 10px solid #eaeaea;
    font-size: 16px;
    padding: 0 20px;
    &.top {
      height: 48px;
    }
    .link {
      color: #666;
      font-size: 12px;
      display: block;
      img {
        vertical-align: middle;
        margin-top: -3px;
      }
    }
  }

  .order {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 70px;
    color: #666;
    .item {
      flex: 1;
      text-align: center;
      img {
        height: 25px;
      }
    }
  }

  .info {
    padding: 8px 20px;
    .title {
      line-height: 36px;
    }
  }

  .other {
    .item {
      padding: 8px 0;
      font-size: 14px;
      color: #666;
    }

    .btn-box {
      padding: 30px 40px;
      button {
        width: 100%;
        border: transparent;
        background: #000;
        color: #fff;
        line-height: 40px;
      }
    }
  }
</style>
