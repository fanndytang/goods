<template>
  <div class="section" v-show="type != 0">
    <div class="title flex" @click="show = !show">
      沟通记录
      <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
    </div>
    <div class="chat" v-show="show">
      <div class="item">
        <div class="label">客服<span class="date">2018.11.15 09:31:50</span></div>
        <div class="text">
          <p>最新设计效果图，请确认是否可以进行生产</p>
          <img width="100px" src="../../../../static/img/goods.png" alt="">
          <img width="100px" src="../../../../static/img/goods.png" alt="">
        </div>
      </div>
      <div class="item">
        <div class="label">我<span class="date">2018.11.15 09:31:50</span></div>
        <div class="text">
          <p>谢谢，收到！</p>
        </div>
      </div>
    </div>
    <div class="form-sub">
      <div class="item">
        <span class="label">回复：</span>
        <textarea cols="30" rows="3" placeholder="请输入您的问题"></textarea>
      </div>
      <div class="item">
        <upload-img-1></upload-img-1>
      </div>

      <div class="sub"> <span class="text-primary">提交</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chat: Object
    },
    data () {
      return {
        type: this.$route.query.type,
        show: true
      }
    }
  }
</script>

<style lang="less" scoped>
  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .section, .head-info {
    margin-top: 10px;
    background: #fff;
  }


  .form-sub {
    // margin: 20px 15px 13px 15px;
    font-size: 15px;
    textarea {
      vertical-align: top;
      flex: 1;
      border: none;
    }
    .item {
      display: flex;
      padding: 20px 15px 13px 15px;
    }
    .label {
      color: #5c95a8;

    }
    //background: #fff;
    /*.item {
      display: flex;

    }*/

    .sub {
      //   height: 48px;
      border-top: 1px solid rgba(230, 230, 230, 1);
      margin: 0 15px;
      text-align: center;
      line-height: 48px;
    }

    /* .btn {
       padding: 15px;
       text-align: center;
       button {
         width: 40vw;
         border: none;
         background: red;
         color: #fff;
         line-height: 30px;
       }
     }*/
  }
  .section {
    //  margin-top: 10px;
    //  background: #fff;
    .title {
      font-size: 14px;
      color: #0c0c0c;
      /* h3 {
         font-size: 14px;
       }*/
      padding: 0 15px 0 18px;
      height: 45px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }
    /*.gray {
      color: #999;
    }*/
    /*  .content {
        padding: 10px;
        line-height: 30px;
      }
      .list-item {
        display: flex;
        align-items: flex-start;
        label {
          font-weight: bold;
          margin-right: 20px;
          white-space: nowrap;
        }
      }
      .sec-box {
        background: #ccc;
        margin: 0 -10px;
        padding: 0 10px;
        line-height: 40px;
        color: #333;
        font-weight: bold;
      }*/

  }
  .chat {
    background: #fdf8eb;
    //margin-top: -1px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    //   border-top: 1px solid rgba(230, 230, 230, 1);
    .item {

      margin: 0 15px 0 15px;
      padding: 20px 0 13px 0;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }

      .label {
        //   color: #0c0c0c;
        font-size: 16px;
        line-height: 20px;
        .date {
          margin-left: 5px;
          color: #ccc;
          font-size: 14px;
        }
      }

      font-size: 14px;
      color: #0c0c0c;
      .text {
        margin-top: 10px;
        img {
          max-width: 100%;
          margin: 10px;
        }
      }

      // display: flex;
      //  align-items: flex-start;
      // padding: 10px;
      /* textarea {
         flex: 1;
       }*/
      /*&.bottom {
        border-bottom: 1px dotted #ccc;
      }
      &.center {
        align-items: center;
      }*/
      /* .label {
         font-weight: bold;
       }*/
    }
  }
</style>
