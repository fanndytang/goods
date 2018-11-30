<template>
  <div class="full-gray">
    <head-bar :back="true" title="订单信息" :menu="type != 1">
      <span class="text-primary f14" @click="cancel()" v-if="type == 1">取消订单</span>
    </head-bar>

    <top class="section" :detail="detail"></top>

    <chat class="section" :chat="detail.chat"></chat>

    <purchase class="section" :purchase="detail.purchase"></purchase>

    <address-box class="section" :address="detail.address"></address-box>

    <div class="result" v-if="type == 0">
      <button class="btn btn-red btn-block btn-sub" type="button" @click="confirm()">确定提交</button>
    </div>

  </div>
</template>

<script>
  import top from './detail/top.vue'
  import chat from './detail/chat.vue'
  import purchase from './detail/purchase.vue'
  import addressBox from './detail/address.vue'

  export default {
    data () {
      return {
        type: this.$route.query.type,
        loading: new this.Loading('提交中'),
        detail: {
                chat: [],
          purchase: {},
          address: {}
        }
      }
    },
    mounted() {
            this.getOrderInfo()
    },
    methods: {
            // 获取订单信息
      getOrderInfo() {
              this.loading.show('加载中')
        this.$http.get('/api/order/info', {
                sn: this.$route.query.orderid
        }).then(res => {
          this.loading.hide()

          // to do ...

        }).catch(err => {
          this.loading.hide()
        })


        // 测试数据
        setTimeout(() => {
          this.detail = {
            id: 1,
            sn: '20181115093150001',
            date: '2018.11.15 09:31:50',
            imgUrl: '../../../static/img/goods.png',
            title: '宝宝生辰定制牌',
            number: '100',
            size: 'Au999 20g 20*23.8mm',
            answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页',
            address: {
              name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室'
            },
            purchase: {
              fontColor: 'blue',
              fontFamily: 'A',
              back: {
                backgroundImg: '',
                params: [
                  {
                    enable: true,
                    fontsize: '',
                    left: 150,
                    radio: '',
                    rotate: '',
                    text: '哈哈',
                    title: '祝福',
                    top: 92,
                    type: 1
                  }
                ]
              },
              front: {
                backgroundImg: '../../../static/img/goods.png',
                params: [
                  {
                    enable: true,
                    fontsize: '12px',
                    left: 150,
                    radio: '30',
                    rotate: '30',
                    text: '张北海',
                    title: '姓名',
                    top: 92,
                    type: 1
                  },
                  {
                    enable: true,
                    fontsize: '12px',
                    left: 150,
                    radio: '30',
                    rotate: '30',
                    text: '男，女',
                    title: '性别',
                    top: 92,
                    type: 2
                  },
                  {
                    enable: true,
                    left: 150,
                    rotate: '30',
                    url: '../../../static/img/g1.png',
                    height: '',
                    width: '',
                    title: '图片',
                    top: 92,
                    type: 3
                  },
                  {
                    enable: true,
                    left: 150,
                    rotate: '30',
                    title: '星座',
                    top: 92,
                    type: 4,
                    url: '../../../static/img/xz/baiyang.png',
                    iconsid: 1,
                    iconlist: [
                      {id: 1, text: '白羊座', url: "../../../static/img/xz/baiyang.png",},
                      {id: 2, text: '金牛座', url: "../../../static/img/xz/jinniu.png",},
                      {id: 3, text: '双子座', url: "../../../static/img/xz/shuangzi.png",},
                      {id: 4, text: '巨蟹座', url: "../../../static/img/xz/jujie.png",},
                      {id: 5, text: '狮子座', url: "../../../static/img/xz/shizi.png",},
                      {id: 6, text: '处女座', url: "../../../static/img/xz/chunv.png",},
                    ]
                  }
                ]
              }
            },
            chat: [
              {
                name: '客服',
                date: '2018.11.15 09:31:50',
                content: '<p>最新设计效果图，请确认是否可以进行生产</p><img width="100px" src="../../../../static/img/goods.png" alt=""> <img width="100px" src="../../../../static/img/goods.png" alt="">'
              },
              {
                name: '我',
                date: '2018.11.15 09:31:50',
                content: '<p>谢谢，收到！</p>'
              }

            ]
            // type: '1',  // 订单类型  1：待确认  2：生产中  3： 已发货  4： 已取消
          }
        }, 500)

      },
      //  确认订单
            confirm() {
                    this.loading.show()
              this.$http.post('/api/order/', {}).then(res => {
                      this.loading.hide()
                this.$router.push({name: 'orderresult', query: {status: res.data.status}})
              }).catch(err => {
                this.loading.hide()

                this.$message.error('提交失败，请重试')
              })


              // 测试数据
              setTimeout(() => {
                this.$router.push({name: 'orderresult', query: {orderid: this.$route.query.orderid, status: 2}})
              }, 500)
            },
      // 取消订单
      cancel() {
              this.loading.show()

        this.$http.post('/api/order/cancel', {
                sn: this.$route.query.orderid
        }).then(res => {
                this.laoding.hide()
        }).catch(err => {
                this.loading.hide()
        })

      }
    },
    components: {
      top,
      chat,
      purchase,
      'address-box': addressBox
    }
  }
</script>

<style lang="less" scoped>
  .full-gray {
    padding-bottom: 45px;
  }
  .section {
    margin-top: 10px;
    background: #fff;
  }
  .result {
    margin-top: 45px;
  }
  .btn-sub {
    position: fixed;
    width: 100vw;
    bottom: 0;
    left: 0;
    z-index: 100;
    height: 45px;
    font-size: 16px;
  }
</style>
