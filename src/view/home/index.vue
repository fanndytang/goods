<template>
  <div>
    <div class="logo"><img src="../../../static/imgs/timg.jpg" alt=""></div>

    <div class="head">
      <div class="search">
        <span class="icon fa fa-search"></span>
        <input type="text" @focus="$router.push('/search')" placeholder="搜索商品关键字">
      </div>
      <head-menu></head-menu>
    </div>

    <div class="ads">
      <swiper :options="swiperOption">
        <swiper-slide v-for="item,i in ads" :key="i">
          <router-link :to="item.link"><img width="100%" :src="item.imgUrl"></router-link>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>

    <div class="tools">
      <div class="item"><span class="fa fa-check-circle-o"></span> 照片定制</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 一件起订</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 免模具费</div>
      <div class="item"><span class="fa fa-check-circle-o"></span> 免设计稿</div>
    </div>


    <div class="section">
      <h2 class="sec-title">新品专区/NEW ARRIVAL</h2>
      <div class="list">
        <router-link v-for="item,i in newGoods" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
            <div class="img"><img :src="item.imgUrl"></div>
            <p>{{item.title || ''}}</p>
          </div>
        </router-link>
      </div>
    </div>

    <div class="section">
      <h2 class="sec-title">热卖专区/NEW ARRIVAL</h2>
      <div class="list">
        <router-link v-for="item,i in hotGoods" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
            <div class="img"><img :src="item.imgUrl"></div>
            <p>{{item.title || ''}}</p>
          </div>
        </router-link>
      </div>
    </div>

    <foot-bar></foot-bar>
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
            ads: [   //  广告位
              {id: '1', link: '', imgUrl: '../../../static/imgs/ad2.jpg'},
              {id: '2', link: '', imgUrl: '../../../static/imgs/ad1.jpg'},
            ],
            newGoods: [  //  新品专区
              {id: '1', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '2', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '3', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '4', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
            ],
            hotGoods: [  //  热卖专区
              {id: '1', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '2', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '3', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '4', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '5', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '6', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
            ]
          }
      },
    components: {
      swiper,
      swiperSlide
    }
  }
</script>


<style lang="less" scoped>
  .logo {
    background: #ddd;
    height: 1.5rem;
    text-align: center;
    img {
      max-height: 100%;
    }
  }

  .head {
    display: flex;
    padding: 5px 10px;
    background: #ddd;
    .search {
      position: relative;
      flex: 1;
      padding-right: 20px;
      input {
        height: 26px;
        text-align: center;
        border: 1px solid #ccc;
        border-radius: 2px;
        width: 100%;
      }
      .icon {
        position: absolute;
        top: 4px;
        left: 4px;
        color: #bbb;
      }
    }
  }

  .tools {
    display: flex;
    padding: 0 10px;
    background: #fff;
    height: 2rem;
    line-height: 2rem;
    .item {
      flex: 1;
    }
  }

  .section {
    background: #fff;
    .sec-title {
      background: #ddd;
      margin: 5px 0 0 0;
      font-size: 14px;
      text-align: center;
      line-height: 30px;
    }

    .list {
      display: flex;
      flex-wrap: wrap;
      list-style: none;
      padding: 0;
      .item {
        width: 50%;
        padding: 10px;
        text-align: center;
        .img {
          border: 1px solid #ccc;
          img {
            max-width: 80%;
          }
        }
        p {
          margin: 0;
        }
      }
    }
  }
</style>
