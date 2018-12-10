<template>
  <div class="main-content">
    <head-bar :back="true" title="商品详情" :menu="true"></head-bar>

    <swiper :options="swiperOption" style="position: relative;width:100vw;">
      <swiper-slide v-for="item,i in detail.imgs" :key="i" style="text-align: center;width:100vw;">
        <img width="100%" class="full-img" :src="item">
      </swiper-slide>
      <div class="swiper-pagination goods" slot="pagination"></div>
    </swiper>

    <div class="summary">
      <h1 class="title">{{detail.title}}</h1>
      <div class="tag">
        <span class="item" v-for="el,k in detail.tag" :key="k" :style="'background:'+el.value">{{el.name}}</span>
      </div>
    </div>


    <div class="section">
      <div class="sec-title">定制流程</div>
      <div class="content" v-html="detail.process"></div>
    </div>

    <div class="section">
      <div class="sec-title">规则说明</div>
      <div class="content" v-html="detail.rules"></div>
    </div>

    <div class="section">
      <div class="sec-title">详细介绍</div>
      <div class="content" v-html="detail.detail"></div>
    </div>

    <div class="foot">
      <div class="item"><img height="22px" :src="require('@/assets/icons/icon_kefu.png')" alt="">在线客服</div>
      <div class="item"  @click="$router.push({name: 'design', query: {id: detail.id, imgUrl:detail.imgs&&detail.imgs[0] ? detail.imgs[0]:'',title: detail.title}})"><img height="22px" :src="require('@/assets/icons/icon_cart.png')" alt="">定制购买</div>
    </div>

  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data () {
      return {
        swiperOption: {
          pagination: {
            type: 'fraction',
            el: '.swiper-pagination'
          }
        },
        loading: new this.Loading(),
        detail: {},
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      getDetail () {
        let id = this.$route.query.id
        if(id) {
          this.loading.show()
          this.$http({
            url: '/api/goods/detail',
            method: 'get',
            data: {
              id: id
            },
            success: (data) => {
              this.loading.hide()
              this.detail = data.data
            },
            error: (data) => {
              this.loading.hide()
            }
          })
        }
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less">
  img {
    max-width: 100%;
  }

  .swiper-pagination.goods {
    position: absolute;
    height: 15px;
    color: #fff;
    background: rgba(0, 0, 0, .5);
    border-radius: 4px;
    display: inline-block;
    width: auto;
    left: auto;
    right: 13px;
    bottom: 14px;
    padding: 0 5px;
    line-height: 15px;
    letter-spacing: -1px;
  }
</style>
<style lang="less" scoped>
  .main-content {
    padding-bottom: .52rem;
  }

  .summary {
    padding: 19px 20px 25px 15px;
    .title {
      margin: 0;
      line-height: 20px;
      font-size: 15px;
      color: #000;
      font-weight: normal;
    }
    .tag {
      margin-top: 10px;
      .item {
        margin-right: 4px;
        border-radius: 2px;
        color: #fff;
        font-size: 13px;
        padding: 0 4px;
        line-height: 20px;
        display: inline-block;
        white-space: nowrap;
      }
    }
  }

  .section {
    border-top: 5px solid #ededed;
    .sec-title {
      border-bottom: 1px solid rgba(237, 237, 237, 1);
      padding: 0 12px;
      line-height: 45px;
      font-size: 15px;
      color: #0d0d0d;
    }
    img {
      max-width: 100%;
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    height: .52rem;
    display: flex;
    width: 100vw;
    color: #000;
    font-size: 16px;
    background: #fff;
    .item {
      line-height: .52rem;
      text-align: center;
      img {
        margin-right: 8px;
        vertical-align: middle;
        margin-top: -3px;
      }
      &:first-child {
        width: 40vw;
      }
      &:last-child {
        background: #fa5858;
        width: 60vw;
        color: #fff;
      }
    }
  }
</style>
