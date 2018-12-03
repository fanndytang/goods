<!-- 商品定购 -->
<template>
  <div style="padding-bottom:.5rem;padding-top:44px;" ref="mainbox">
    <my-scroll :on-infinite="getData"
               :loading.sync="loading"
               :list.sync="showData"
               :params="params"
               url=""
               nodatatext="没有更多商品啦"
               ref="scroll">

      <head-bar title="&emsp;&emsp;&emsp;商品订购" :menu="true">
      <span slot="menu-left" class="search-top">
        <input type="text" @focus="$router.push('/search')">
        <img style="margin-right:11px;" height="22px" :src="require('@/assets/icons/search2.png')">
      </span>
      </head-bar>

      <div class="top-fixed">
        <img :src="imgUrl" alt="" class="banner">

        <div class="nav-bar" ref="nav-box">
      <span class="item"
            v-for="item,i in nav" :key="i"
            @click="clickNav(item, $event)"
            :class="{'active': item.type == type}">
        <span>{{item.title}}</span>
      </span>
        </div>
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

      </div>

      <scroll-top></scroll-top>
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
        },
        params: {
          keyword: this.$route.query.keyword || '',
          type: ''
        },
        imgUrl: ''
      }
    },
    mounted () {
      this.getBanner()
      this.getNav()
   //   this.getData()
    },
    methods: {
      // 获取顶部图片
      getBanner() {
        let that = this
        this.$http.get('/').then(res => {

        }).catch(err => {

        })

        setTimeout(() => {
          this.imgUrl = './static/img/banner.jpg'

        let image = new Image()
        image.onload = function() {
        let w = image.width, h = image.height,
            box = that.$refs['mainbox'],
            width = document.documentElement.clientWidth || document.body.clientWidth || box.clientWidth,
          height = width * h / w

          console.log(width, height)

          box.style.paddingTop = (height + 44) + 'px'

         /* if(width > (box.clientWidth)) {
            width = box.clientWidth
            height = width * h /w
          }*/

          /*  callback(elFormat(data, width, height, w, h))*/
        }
        image.src =  this.imgUrl
       /*
        this.$nextTick(() => {
         // console.log('124325')
       // console.log(this.$refs.fixedbox)
          console.log($(this.$refs.fixedbox).html())
        })*/
        }, 50)
      },
      // 点击商品类别
      clickNav(item, e) {
        this.type = item.type

        let len = this.dataAll[this.type].data.length

        this.params.type = this.type


        for(let k in this.dataAll[this.type]) {
          this.$refs.scroll.list[k] = this.dataAll[this.type][k]
        }

        if(len <= 0) {
          this.$refs.scroll.getData()
        }else if(len > 0 && len < this.showData.totals) {
          this.loading = true
          setTimeout(() => {this.loading = false}, 50)
        }

        let parent = this.$refs['nav-box'],
          offsetLeft = e.target.offsetLeft,
          scrollLeft = parent.scrollLeft

        if(offsetLeft + e.target.clientWidth > parent.clientWidth + scrollLeft) {
          parent.scrollTo(scrollLeft + e.target.clientWidth + 50, 0)
        }else if(scrollLeft > offsetLeft - 50) {
          parent.scrollTo(scrollLeft-50, 0)
        }

      },
      // 获取商品类别
      getNav() {
        this.$http.get('/api/good/category').then(res => {
          this.nav = res.data.data

        this.params.type = this.nav[0] ? this.nav[0].type || '' : ''
          for(let k in this.nav) {
            this.dataAll[this.nav[k].type] = {
              rows: 10,   // 一次显示多少条
              current: 0,  // 当前显示的页数
              totals: 0,   // 总共有多少条
              data: []
            }
          }
        }).catch(err => {})

        //  测试数据
        setTimeout(() => {
          this.nav = [
            {title: '新品上牌', type: 1},
            {title: '节日限定', type: 2},
            {title: '情侣定制', type: 3},
            {title: '宝宝定制', type: 4},
            {title: '父母父母', type: 5},
          ]

        this.params.type = this.nav[0] ? this.nav[0].type || '' : ''
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

          this.dataAll[this.type] = this.showData

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
    background: #fff;
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
  .top-fixed {
    position: fixed;
    top: 0.5rem;
    left: 0;
    width: 100vw;
  }
</style>
