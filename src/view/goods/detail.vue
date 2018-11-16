<template>
  <div class="body">
    <head-bar :back="true" title="商品详情" :menu="true"></head-bar>

    <swiper :options="swiperOption">
      <swiper-slide v-for="item,i in detail.imgs" :key="i" style="text-align: center;">
        <img height="200px" :src="item">
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="tag">
      <span class="new">新品爆款</span>
      <span class="title">{{detail.title||''}}</span>
    </div>

    <div class="section">
      <div class="sec-title">定制流程</div>
      <div class="content">
        <img :src="detail.process">
      </div>
    </div>

    <div class="section">
      <div class="sec-title">规则说明</div>
      <div class="content">
        <img :src="detail.rules">
      </div>
    </div>

    <div class="section">
      <div class="sec-title">详细介绍</div>
      <div class="content">
        <img :src="detail.detail">
      </div>
    </div>

    <div class="foot">
      <div class="item"><span class="fa fa-comment-o"></span>在线客服</div>
      <div class="item"><span class="fa fa-shopping-cart" @click="$router.push({name: 'design', query: {id: detail.id}})"></span>定制购买</div>
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
            el: '.swiper-pagination'
          }
        },
        detail: {
          id: 1,
          imgs: ['../../../static/imgs/goods.png',  '../../../static/imgs/ad1.jpg'],
          category: ['new'],
          title: '宝宝生辰定制牌',
          process: '../../../static/imgs/d1.png',
          rules: '../../../static/imgs/d2.png',
          detail: '../../../static/imgs/d3.png',
        },
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less" scoped>
  .body {
    padding-bottom: 3rem;
  }
  .tag {
    background: #fff;
    height: 3rem;
    line-height: 3rem;
    padding: 0 10px;
  }
  .new, .hot {
    color: #fff;
    padding: 2px 4px;
  }
  .new {
    background: orange;
  }
  .hot {
    background: red;
  }

  .section {
    background: #fff;
    margin-top: 10px;
    .sec-title {
      border-bottom: 1px solid #ccc;
      padding: 0 10px;
      line-height: 30px;
    }
    .content {
      text-align: center;
    }
    img {
      max-width: 100%;
    }
  }

  .foot {
    position: fixed;
    bottom: 0;
    left: 0;
    height: 3rem;
    display: flex;
    width: 100vw;
    text-align: center;
    color: #fff;
    font-size: 16px;
    .item {
      flex: 1;
      height: 100%;
      line-height: 3rem;
      span {
        margin-right: 5px;
      }
      &:first-child {
        background: #aaa;
      }
      &:last-child {
        background: red;
      }
    }
  }
</style>
