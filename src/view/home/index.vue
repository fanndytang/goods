<template>
  <div>
    <my-scroll :list.sync="hotGoods"
               url=""
               nodatatext="没有更多商品啦">

      <head-bar :title="`<img height=23px src=${$root.webinfo.logo}>`" :menu="true" style="padding-right:30px;padding-left:30px;"></head-bar>

      <div class="good-search">
        <div class="input-bg">
          <img :src="require('@/assets/icons/search1.png')" height="17px">
          <span>搜索品牌或关键词</span>
        </div>
        <input type="search" class="input-search" placeholder="搜索品牌或关键词" @focus="$router.push('/search')" />
      </div>

      <swiper :options="swiperOption" ref="mySwiper">
        <swiper-slide v-for="item,i in $root.webinfo.home_banner" :key="i">
          <a :href="item.link" v-if="item.type == 1"><img class="full-img" :src="item.url"></a>

          <div v-if="item.type == 2" class="full-img" style="position:relative;">
            <img height="45px" v-show="!hidePlay" @click="$refs[`video${i}`][0].play();hidePlay=true" class="video-play" :src="require('@/assets/icons/icon_play.png')" alt="">

             <video :ref="`video${i}`" class="ad-video" width="100%" v-if="item.type == '2'"
                    :src="item.videoUrl" :poster="item.url"
                    @play="$refs.mySwiper.swiper.autoplay.stop()" @pause="$refs.mySwiper.swiper.autoplay.start();hidePlay=false;"></video>
          </div>
        </swiper-slide>
        <div class="swiper-pagination home" slot="pagination"></div>
      </swiper>

      <div class="tools">
        <div class="item"><img :src="require('@/assets/icons/icon_sign.png')" /> 照片定制</div>
        <div class="item"><img :src="require('@/assets/icons/icon_sign.png')" /> 一件起订</div>
        <div class="item"><img :src="require('@/assets/icons/icon_sign.png')" /> 免模具费</div>
        <div class="item"><img :src="require('@/assets/icons/icon_sign.png')" /> 免设计稿</div>
      </div>

      <h2 class="sec-title">新品专区 <small>好货持续上新</small></h2>
      <a :href="$root.webinfo.new_arrival.link || 'javascript:void(0);'"><img class="full-img" :src="$root.webinfo.new_arrival.url" alt=""></a>

      <div class="new-list">
        <router-link v-for="item,i in newGoods" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
            <img class="mark" height="20px" :src="require('@/assets/icons/sign_hot.png')" alt="">
            <div class="img"><img :src="item.imgUrl || require('@/assets/icons/good_default.png')"></div>
            <span class="text">{{item.title || ''}}</span>
          </div>
        </router-link>
      </div>

      <h2 class="sec-title" style="margin-bottom:.2rem;">热卖专区 <small style="color:#c0c0c0;">双11年购物节，疯狂优惠享不断</small></h2>
      <a :href="$root.webinfo.hot_sale.link || 'javascript:void(0);'"><img class="full-img" :src="$root.webinfo.hot_sale.url" alt=""></a>

      <div class="goods-list">
        <router-link v-for="item,i in hotGoods.data" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
            <div class="img" :class="{'default-img': !item.imgUrl}"><img :src="item.imgUrl || require('@/assets/icons/good_default.png')"></div>
            <div class="tag">
              <span v-for="el,k in item.tag" :key="k" :style="'background:'+el.value">{{el.name}}</span>
            </div>
            <div class="text">{{item.title || ''}}</div>
          </div>
        </router-link>

      </div>

    </my-scroll>


    <foot-bar></foot-bar>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'

  export default {
    data () {
      return {
              hidePlay: false,
        swiperOption: {
          autoplay: {
            disableOnInteraction: false
          },
          pagination: {
            el: '.swiper-pagination'
          }
        },
        newGoods: [], //  新品专区
        hotGoods: {  // 热卖专区
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data: []
        },
        showVideo: false,
        videoUrl: '',
        loading: new this.Loading()
      }
    },
    mounted () {
      this.getMewData()
    },
    methods: {
      //  新品专区
      getMewData() {
              this.loading.show()

        this.$http({
          url: '',
          method: 'get',
          success: (data) => {
                  data.data = [
                    {id: '1', imgUrl: './static/img/goods.png', title: '宝宝生辰定制牌'},
                    {id: '2', imgUrl: './static/img/g1.png', title: '宝宝定制牌制牌定制牌制牌制牌'},
                    {id: '3', imgUrl: './static/img/g2.png', title: '宝宝生辰定制牌'},
                    {id: '3', imgUrl: '', title: '宝宝生辰定制牌'},
                  ]
            this.newGoods = data.data
            this.loading.hide()
          },
          error: (data)=>{
            this.loading.hide()
          }
        })

      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>

<style lang="less">
  .swiper-pagination.home .swiper-pagination-bullet{
    background: rgba(248, 248, 248, 1);
    opacity: .5;
    &.swiper-pagination-bullet-active {
      opacity: 1;
      background:rgba(199, 56, 52, 1);
    }
  }
</style>

<style lang="less" scoped>
  img {
    max-width: 100%;
  }

  .ad-video {
    width: 100%;
    height: auto;
    display: block;
   /* ::-webkit-media-controls-fullscreen-button{
      display: none;
    }*/
  }
  .tools {
    display: flex;
    height: .4rem;
    line-height: .4rem;
    color: #733138;
    border-bottom: 1px solid rgba(7, 0, 2, .42);
    background: #fcfcfc;
    .item {
      flex: 1;
      text-align: center;
      img {
        vertical-align: middle;
        margin-top: -4px;
        height: 13px;
      }
    }
  }
  .sec-title {
    margin: .2rem 0 .1rem .12rem;
    padding-left: .12rem;
    border-left: 2px solid #333;
    line-height: .15rem;
    font-size: .15rem;
    color: #333;
    font-weight: normal;
    small {
      color: #dcdcdc;
      font-size: .12rem;
      margin-left: .07rem;
    }
  }

  .new-list {
    margin-top: -0.75rem;
    overflow-x: auto;
    padding: 0 9px;
    text-align: center;
    display: flex;
    align-items: stretch;
    .item {
      padding: 0 3px .15rem 3px;
      //   padding-bottom: .15rem;
      width: 33.3%;
      flex-shrink: 0;
    }
    .content {
      background: #fff;
      border-radius: 4px;
      //  margin: 0 2px;
      padding: 2px;
      min-height: 1.45rem;
      height: 100%;
      position: relative;
      -webkit-box-shadow: 0 1px 14.2px 0.3px rgba(17, 17, 17, 0.23);
      -moz-box-shadow: 0 1px 14.2px 0.3px rgba(17, 17, 17, 0.23);
      box-shadow: 0 1px 14.2px 0.3px rgba(17, 17, 17, 0.23);
    }
    .mark {
      position: absolute;
      left: 6px;
      top: 5px;
    }
    .img {
      height: calc(1.4rem - 30px);
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    img {
      max-width: 60%;
      max-height: 60%;
    }
    .text {
      min-height: 30px;
      display: block;
      white-space: normal;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }

  .video-play {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -moz-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    -o-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    z-index: 10;
  }
</style>
