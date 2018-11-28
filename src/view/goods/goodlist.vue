<!-- 商品定购 -->
<template>
  <div>
    <my-scroll :on-infinite="getData"
               :loading="loading"
               :nodata="showData.data.length >= showData.totals"
               nodatatext="没有更多商品啦"
               class="goodlist-scroll">

      <head-bar title="&emsp;&emsp;&emsp;商品订购" :menu="true">
      <span slot="menu-left" class="search-top">
        <input type="text" @focus="$router.push('/search')">
        <img style="margin-right:11px;" height="22px" :src="require('@/assets/icons/search2.png')">
      </span>
      </head-bar>

      <img src="../../../static/img/banner.jpg" alt="" class="banner">

      <div class="nav-bar">
      <span class="item"
            v-for="item,i in nav" :key="i"
            @click="clickNav(item)"
            :class="{'active': item.type == type}">
        <span>{{item.title}}</span>
      </span>
      </div>

      <div class="goods-list">
        <router-link v-for="item,i in showData.data" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
          <div class="content">
          <div class="img"><img :src="item.imgUrl || require('@/assets/icons/good_default.png')"></div>
          <div class="tag">
            <span v-for="el,k in item.tag" :key="k" :style="'background:'+el.backColor">{{el.title}}</span>
          </div>
          <div class="text">{{item.title || ''}}</div>
        </div>
        </router-link>

       <!-- <div class="tip" v-show="!loading"> ——<span>{{showData.data.length >= showData.totals ? '没有更多商品啦' : '上拉显示更多'}}</span>——  </div>-->
      </div>

      <scroll-top el=".goodlist-scroll"></scroll-top>
      <foot-bar></foot-bar>
    </my-scroll>

  </div>
</template>

<script>

  export default {
    data () {
      return {
        type: 1,
        nav: [],
        keyword: this.$route.query.keyword || '',  //  搜索关键词
        loading: false,
        dataAll: {},   //  总数据列表
        showData: {      // 当前显示的数据列表
          rows: 10,   // 一次显示多少条
          current: 0,  // 当前显示的页数
          totals: 0,   // 总共有多少条
          data: []
        }
      }
    },
    mounted () {
      this.getNav()
      this.getData()
    },
    methods: {
      // 点击商品类别
      clickNav(item) {
        this.type = item.type
        this.showData = this.dataAll[this.type]
        let len = this.showData.data.length
        if(len <= 0) {
          this.getData()
        }else if(len > 0 && len < this.showData.totals) {
          this.loading = true
          setTimeout(() => {this.loading = false}, 50)
        }
      },
      // 获取商品类别
      getNav() {
        this.$http.get('/api/good/category').then(res => {

        }).catch(err => {

        })

        //  测试数据
        setTimeout(() => {
          this.nav = [
            {title: '新品上牌', type: 1},
            {title: '节日限定', type: 2},
            {title: '情侣定制', type: 3},
            {title: '宝宝定制', type: 4},
            {title: '父母父母', type: 5},
          ]
          for(let k in this.nav) {
            this.dataAll[this.nav[k].type] = {
              rows: 10,   // 一次显示多少条
              current: 0,  // 当前显示的页数
              totals: 0,   // 总共有多少条
              data: []
            }
          }
        }, 50)
      },
      //  获取商品数据
      getData(done) {
        if(this.showData.data.length > 0 && this.showData.data.length >= this.showData.totals)   return false

        this.loading = true
        ++ this.showData.current
        this.$http.get('/api/get/hot', {
          params: {
            rows: this.showData.rows,
            current: this.showData.current,
            keyword: this.keyword
          }
        }).then(res => {
          //  this.loading = false
          this.showData.data = this.showData.concat(res.data)
          this.showData.totals = res.page.totals

          this.dataAll[this.type] = this.showData

          if(done) done()
        }).catch(err => {
          // this.loading = false
          //   if(done) done()
        })

        // 测试数据
        setTimeout(() => {
          let res = {
            data : [
              {id: '1', imgUrl: '../../../static/img/goods.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}]},
              {id: '2', imgUrl: '../../../static/img/g1.png', title: '定制牌制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'},]},
              {id: '3', imgUrl: '../../../static/img/g2.png', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: '#ff9933'}, {id: 1, title: '特价热卖', backColor: '#cc6666'}, {id: 1, title: '限时折扣', backColor: '#00bc0d'},]},
              {id: '4', imgUrl: '', title: '宝宝生辰定制牌', tag: [{id: 1, title: '新品爆款', backColor: 'orange'}]},
              {id: '5', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '6', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '7', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '8', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '9', imgUrl: '', title: '宝宝生辰定制牌'},
              {id: '10', imgUrl: '', title: '宝宝生辰定制牌'},
            ],
            page: {
              totals: 35
            }
          }

          this.showData.data = this.showData.data.concat(res.data)
          this.showData.totals = res.page.totals

          this.dataAll[this.type] = this.showData

          this.loading = false
          if(done)done();
        }, 200)

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
