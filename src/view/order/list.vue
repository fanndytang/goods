<template>
  <div class="full-gray">
    <head-bar :back="true" title="订单列表"></head-bar>

    <div class="nav">
      <div class="item" @click="active=1" :class="{'active': active===1}"><span>待确认</span></div>
      <div class="item" @click="active=2" :class="{'active': active===2}"><span>生产中</span></div>
      <div class="item" @click="active=3" :class="{'active': active===3}"><span>已发货</span></div>
      <div class="item" @click="active=4" :class="{'active': active===4}"><span>已取消</span></div>
    </div>

    <div class="list" v-for="item,i in list" :key="i">
      <router-link :to="{name: 'orderdetail', query: {id: item.id}}">
        <div class="top">
          <span>订单编号：{{item.sn}}</span>
          <span>{{item.date}}</span>
        </div>

        <div class="content">
          <div class="img"><img :src="item.imgUrl" alt=""></div>
          <div class="desc">
            <div class="title">{{item.title}} <span class="num">{{item.number}}件</span></div>
            <div class="title">{{item.size}}</div>
            <div class="answer">客服回复：{{item.answer}}</div>
          </div>
        </div>
      </router-link>

      <button class="btn btn-block btn-red" type="button" v-show="active===1">取消订单</button>
    </div>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              active: 1,
            list: [
              {
                id: 1,
                sn: '20181115093150001',
                date: '2018.11.15 09:31:50',
                imgUrl: '../../../static/img/goods.png',
                title: '宝宝生辰定制牌',
                number: '100',
                size: 'Au999 20g 20*23.8mm',
                answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'
              },
              {
                id: 2,
                sn: '20181115093150001',
                date: '2018.11.15 09:31:50',
                imgUrl: '../../../static/img/goods.png',
                title: '宝宝生辰定制牌',
                number: '100',
                size: 'Au999 20g 20*23.8mm',
                answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'
              }
            ]
          }
      }
  }
</script>

<style lang="less" scoped>
  .nav {
    display: flex;
    text-align: center;
    align-items: center;
    background: #fff;
    border-top: 1px solid rgba(230, 230, 230, 1);
    font-size: 14px;

    .item {
      flex: 1;
      > span {
        margin-bottom: -1px;
        padding: 13px 0;
        display: inline-block;
        border-bottom: 2px solid transparent;
      }
      &.active {
        color: #cc6666;
        span {
          border-bottom: 2px solid rgba(204, 102, 102, 1);
        }
      }
    }
  }

  .list {
    margin-top: 10px;
    background: #fff;
    padding: 0 0 13px 10px;
    .top {
      height: 40px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      color: #ccc;
  //    line-height: 40px;

    /*  .date {
        font-size: 12px;
        color: #999;
      }*/
    }

    .content {
      display: flex;
      align-items: center;
      padding: 12px 18px 20px 20px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
      .img {
        border: 1px solid #f6f6f6;
        width: 55px;
        text-align: center;
        padding: 5px;
        margin-right: 20px;
        img {
          max-width: 100%;
        }
      }
      .title {
        display: flex;
        justify-content: space-between;
        line-height: 22px;
        .num {
          color: #c66;
        }
      }
      .answer {
        color: #5c95a8;
        line-height: 20px;
        margin-top: 5px;
      }
    }
  }
  .btn-red {
    font-size: 15px;
    width: 53vw;
    margin: 10px auto 0 auto;
    border-radius: 30px;
  }
</style>
