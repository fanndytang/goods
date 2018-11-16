<template>
  <div>
    <div class="bar">
      <input type="search" v-model="key" placeholder="搜索商品关键字" v-focus @change="search()" @focus="showResult = false">
      <span @click="$router.go(-1)">取消</span>
    </div>

    <div class="history" v-if="history.length && !showResult">
      <div class="item">
        <div class="title">历史记录</div>
        <span class="fa fa-trash"></span>
      </div>
      <div class="item" v-for="item,i in history" :key="i">{{item}}</div>
    </div>

    <div class="list" v-show="showResult">
      <router-link v-for="item,i in list" :key="i" class="item" :to="{name: 'goodsdetail', query: {id: item.id}}">
        <div class="content">
          <div class="img"><img :src="item.imgUrl"></div>
          <p>{{item.title || ''}}</p>
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
              showResult: false,
              history: [
                '宝宝生辰', '公司节日定制'
              ],
            list: [
              {id: '1', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '2', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '3', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
              {id: '4', imgUrl: '../../../static/imgs/goods.png', title: '宝宝生辰定制牌'},
            ],
            key: '',
          }
      },
    methods: {
          // 搜索
          search() {
              this.showResult = true

          }
    },
    directives: {
      focus: {
        // 指令的定义
        inserted: function (el) {
          el.focus()
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .bar {
    background: #fff;
    padding: 5px 10px;
    display: flex;
    line-height: 30px;
    input {
      flex: 1;
      margin-right: 10px;
      text-align: center;
    }
  }

  .history {
    padding: 0 10px;
    .item {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      align-items: center;
      &:not(:first-child) {
        border-top: 1px solid #ccc;
      }
    }
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
      //  border: 1px solid #ccc;
        background: #fff;
        img {
          max-width: 80%;
        }
      }
      p {
        margin: 0;
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
