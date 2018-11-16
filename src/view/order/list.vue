<template>
  <div>
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
          <strong>订单编号：{{item.sn}}</strong>
          <span class="date">{{item.date}}</span>
        </div>

        <div class="content">
          <div class="img"><img :src="item.imgUrl" alt=""></div>
          <div class="desc">
            <div class="title">{{item.title}} <strong>{{item.number}}件</strong></div>
            <div class="title">{{item.size}}</div>
            <div class="answer">
              <strong>客服回复：</strong>
              {{item.answer}}
          </div>
          </div>
        </div>
      </router-link>

      <div class="btn">
        <button type="button" v-show="active===1">取消订单</button>
      </div>
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
                imgUrl: '../../../static/imgs/goods.png',
                title: '宝宝生辰定制牌',
                number: '100',
                size: 'Au999 20g 20*23.8mm',
                answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页'
              },
              {
                id: 2,
                sn: '20181115093150001',
                date: '2018.11.15 09:31:50',
                imgUrl: '../../../static/imgs/goods.png',
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
    padding: 0 10px;
    line-height: 40px;
    background: #fff;
    border-top: 1px solid #ccc;
    justify-content: space-between;
    .item {
      &.active {
        color: red;
        span {
          border-bottom: 1px solid red;
        }
      }
    }
  }

  .list {
    margin-top: 10px;
    background: #fff;
    padding: 10px;
    .top {
      border-bottom: 1px solid #ccc;
      line-height: 40px;
      display: flex;
      justify-content: space-between;
      .date {
        font-size: 12px;
        color: #999;
      }
    }

    .content {
      display: flex;
      padding: 10px 5px;
      .img {
        border: 1px solid #ccc;
        img {
          width: 30vw;
        }
      }
      .desc {
        padding-left: 20px;
      }
      .title {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        color: #999;
        line-height: 30px;
        strong {
          color: #333;
        }
      }
      .answer {
        color: #999;
        line-height: 20px;
        margin-top: 10px;
        strong {
          color: #333;
        }
      }
    }
  }

  .btn {
    padding: 15px;
    text-align: center;
    button {
      border: none;
      background: red;
      width: 50vw;
      line-height: 30px;
      color: #fff;
    }
  }
</style>
