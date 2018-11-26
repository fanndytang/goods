<!-- 商品定购 -->
<template>
  <div>
    <head-bar title="商品订购" :menu="true">
      <span slot="menu-left" class="search-top">
        <input type="text" @focus="$router.push('/search')">
        <img style="margin-right:11px;" height="22px" :src="require('@/assets/icons/search2.png')">
      </span>
    </head-bar>

    <img src="../../../static/img/banner.jpg" alt="" class="banner">

    <div class="nav-bar">
      <span class="item"
            v-for="item,i in nav" :key="i"
            @click="type = item.type; getData()"
            :class="{'active': item.type == type}">
        <span>{{item.title}}</span>
      </span>
    </div>

    <div class="wrap" style="height: 80vh;">
      <div class="goods-list">
        <router-link v-for="item,i in current" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
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

    <scroll-top></scroll-top>
    <foot-bar></foot-bar>

  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
      data () {
          return {
              type: 1,
              nav: [],
            dataAll: {},   //  总数据列表
            current: []   // 当前显示的数据列表
          }
      },
    mounted () {
          this.getNav()
      this.getData()
      this.scrollInit()
    },
    methods: {
          getNav() {
              this.nav = [
                {title: '新品上牌', type: 1},
                {title: '节日限定', type: 2},
                {title: '情侣定制', type: 3},
                {title: '宝宝定制', type: 4},
                {title: '父母父母', type: 5},
              ]
            for(let k in this.nav) {
                  this.dataAll[this.nav[k].type] = {
                      data: []
                  }
            }
          },
          getData() {
            let data = [
              {id: '1', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}]},
              {id: '2', imgUrl: '../../../static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'},]},
              {id: '3', imgUrl: '../../../static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'}, {id: 1, title: '限时折扣', backColor: '#00bc0d'},]},
              {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: 'orange'}]},
              {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
            ]
            this.dataAll[this.type].data = this.dataAll[this.type].data.concat(data)
            this.current = this.dataAll[this.type].data
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
          this.getData()

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
    }
  }

</script>

<style lang="less" scoped>
  .search-top {
    position: relative;
    input {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      z-index: 1;
    }
  }
  .banner {
    width: 100%;
    display: block;
  }
  .nav-bar {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #000;
    overflow: auto;
    .item {
      flex-shrink: 0;
      text-align: center;
      width: 22vw;
      > span {
        display: inline-block;
        line-height: 14px + 28px;
        border-bottom: 2px solid transparent;
      }
      &.active > span {
        color: #cc6666;
        border-color: #cc6666;
      }
    }
  }




  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
      padding: 10px 20px;
      text-align: center;
      .img {
        padding: 10px;
        background: #fff;
        margin-bottom: 10px;
      }
      img {
        max-width: 80%;
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
    }
  }

  .more {
    text-align: center;
    padding-bottom: 20px;
  }
  .top {
    position: fixed;
    right: 10px;
    bottom: 10px;
    font-size: 26px;
  }
</style>
