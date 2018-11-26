<template>
  <div>
    <header class="top">
      <div class="logo"><img src="../../../static/img/logo.jpg" alt=""></div>
      <head-menu></head-menu>
    </header>

    <div class="good-search">
      <img :src="require('@/assets/icons/search1.png')" height="20px">
      <span class="text">搜索品牌或关键词</span>
      <input type="search" class="input-search" @focus="$router.push('/search')" />
    </div>

    <swiper :options="swiperOption">
      <swiper-slide v-for="item,i in ads" :key="i">
        <router-link :to="item.link"><img width="100%" :src="item.imgUrl"></router-link>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>

    <div class="tools">
      <div class="item"><span class="fa fa-check-circle-o"></span> 照片定制</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 一件起订</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 免模具费</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 免设计稿</div>
    </div>

    <h2 class="sec-title">新品专区 <small>好货持续上新</small></h2>
    <img class="list-img" src="../../../static/img/ad2.png" alt="">
    <div class="new-list">
      <router-link v-for="item,i in newGoods" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
        <div class="content">
          <img class="mark" height="20px" :src="require('@/assets/icons/sign_hot.png')" alt="">
          <div class="img"><img :src="item.imgUrl || require('@/assets/icons/good_default.png')"></div>
          <span class="text">{{item.title || ''}}</span>
        </div>
      </router-link>
    </div>

    <h2 class="sec-title">热卖专区 <small>双11年购物节，疯狂优惠享不断</small></h2>
    <img class="list-img"  id="test" src="../../../static/img/ad3.jpg" alt="">

    <div class="wrap" style="height: 80vh;">
      <div class="goods-list">
        <router-link v-for="item,i in hotGoods" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
            <div class="img"><img :src="item.imgUrl || require('@/assets/icons/good_default.png')"></div>
            <div class="tag">
              <span v-for="el,k in item.tag" :key="k" :style="'background:'+el.backColor">{{el.title}}</span>
            </div>
            <div class="text">{{item.title || ''}}</div>
          </div>
        </router-link>

        <div class="tip"> ——<span>没有更多商品啦</span>——  </div>
      </div>
    </div>

    <foot-bar></foot-bar>
    <scroll-top></scroll-top>
  </div>
</template>

<script>
  import 'swiper/dist/css/swiper.css'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  import BScroll from 'better-scroll'

  export default {
      data () {
          return {
            swiperOption: {
              pagination: {
                el: '.swiper-pagination'
              }
            },
            ads: [], //  广告位
            newGoods: [], //  新品专区
            hotGoods: []  // 热卖专区
          }
      },
    mounted () {
      this.getAds()
      this.getMewData()
      this.getHotData()
      this.scrollInit()
    },
    methods: {
      getAds() { //  广告位
        this.ads = [
          {id: '1', link: '', imgUrl: '../../../static/img/ad1.jpg'},
          {id: '2', link: '', imgUrl: '../../../static/img/ad1.jpg'},
        ]
      },
      getMewData() {  //  新品专区
        let data = [
          {id: '1', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌'},
          {id: '2', imgUrl: '../../../static/img/g1.png', title: '宝宝定制牌制牌定制牌制牌制牌'},
          {id: '3', imgUrl: '../../../static/img/g2.png', title: '宝宝生辰定制牌'},
          {id: '3', imgUrl: '', title: '宝宝生辰定制牌'},
        ]
        this.newGoods = this.newGoods.concat(data)
      },
      getHotData() {  //  热卖专区  获取下一页数据
        let data = [
          {id: '1', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}]},
          {id: '2', imgUrl: '../../../static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'},]},
          {id: '3', imgUrl: '../../../static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'}, {id: 1, title: '限时折扣', backColor: '#00bc0d'},]},
          {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: 'orange'}]},
          {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
          {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
        ]
        this.hotGoods = this.hotGoods.concat(data)
      },
      scrollInit() {
          let scroll = new BScroll(".wrap", {
          click: true,
          taps: true,
          probeType: 2,
          pullUpLoad: {  //上拉加载
            threshold: 10
          },
          mouseWheel: {    // pc端同样能滑动
            speed: 20,
            invert: false
          },
          useTransition:false  // 防止iphone微信滑动卡顿
        });

        //  上拉加载
        scroll.on("pullingUp",() =>{
          //alert('已到最底部');
          console.log('加载ajax数据');
          this.getHotData()

          scroll.finishPullUp();//可以多次执行上拉刷新
        });

        // 下拉时辅助一段上移距离
        scroll.on('touchEnd', function(obj) {
          if(obj.y > 0) {
            let scrollTop = document.documentElement.scrollTop ||
                window.pageYOffset || document.body.scrollTop || 0,
              ch = 500, a = 0

            function play () {
              if(a < ch){
                a+=20
                window.scrollTo(0, scrollTop - a)
                requestAnimFrame (() => {play()})
              }
            }
            play()
          }
        })
        scroll.refresh();
      }
    },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>


<style lang="less" scoped>
  img {
    max-width: 100%;
  }
  .top {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 30px;
    .logo {
      flex: 1;
      text-align: center;
      img {
        height: 25px;
      }
    }
  }

  .tools {
    display: flex;
    height: .4rem;
    line-height: .4rem;
    color: #733138;
    border-bottom: 1px solid #979495;
    .item {
      flex: 1;
      text-align: center;
    }
  }
  .sec-title {
    margin: .2rem 0 .1rem .12rem;
    padding-left: .12rem;
    border-left: 2px solid #333;
    line-height: .15rem;
    font-size: .15rem;
    small {
      color: #dcdcdc;
      font-size: .12rem;
      margin-left: .1rem;
    }
  }

  .list-img {
    width: 100vw;
  }
  .new-list {
    margin-top: -0.75rem;
    overflow-x: auto;
    padding: 0 10px;
    text-align: center;
    display: flex;
    align-items: stretch;
    .item {
      padding-bottom: .15rem;
      width: 33%;
      flex-shrink: 0;
    }
    .content {
      background: #fff;
      border-radius: 4px;
      margin: 0 2px;
      padding: 4px 2px;
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
</style>
