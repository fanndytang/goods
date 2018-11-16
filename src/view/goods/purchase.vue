<!-- 商品定购 -->
<template>
  <div>
    <head-bar title="商品定购">
      <span class="fa fa-search"></span>
    </head-bar>

    <div class="list">
      <router-link class="item" v-for="item,i in list" :key="i" :to="{name: 'design', query: {id: item.id}}">
        <div class="content">
          <div class="img"><img :src="item.imgUrl"></div>
          <div class="tag" v-if="item.category && item.category.length">
            <span class="new" v-if="item.category.includes('new')">新品爆款</span>
            <span class="hot" v-if="item.category.includes('hot')">特价热卖</span>
          </div>
          <p>{{item.title}}</p>
        </div>
      </router-link>
    </div>

    <div class="more">上拉显示更多</div>

    <span class="fa fa-arrow-circle-up top"></span>

  </div>
</template>

<script>
  export default {
      data () {
          return {
            list: [
              {id: '1', imgUrl: '../../../static/imgs/goods.png', category: ['hot', 'new'], title: '宝宝生辰定制牌'},
              {id: '2', imgUrl: '../../../static/imgs/goods.png', category: ['new'], title: '宝宝生辰定制牌'},
              {id: '3', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '4', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '5', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '6', imgUrl: '../../../static/imgs/goods.png', category: ['new'], title: '宝宝生辰定制牌'},
            ],
          }
      }
  }

</script>

<style lang="less" scoped>
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
