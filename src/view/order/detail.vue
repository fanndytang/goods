<template>
  <div class="full-gray">
    <head-bar :back="true" title="订单信息" :menu="detail.type != 1">
      <span class="text-primary f14" v-if="detail.type == 1">取消订单</span>
    </head-bar>

    <div v-show="!showResult">
      <div class="head-info">
        <div class="top" v-if="detail.type == 1">
          订单编号：{{detail.sn}}
         <!-- <span>{{detail.date}}</span>-->
        </div>
        <div class="content">
          <div class="img"><div class="img-bg"><img :src="detail.imgUrl" alt=""></div></div>
          <div class="text">
            <div class="title">
              {{detail.title}}
              <br>
              {{detail.size}}
            </div>
            <div class="number">定购数量：{{detail.number}}件</div>
          </div>
        </div>
      </div>

      <div class="section" v-show="detail.type == 1">
        <div class="title flex" @click="showChat = !showChat">
          沟通记录
          <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
        </div>
        <div class="chat" v-show="showChat">
          <div class="item">
            <div class="label">客服<span class="date">2018.11.15 09:31:50</span></div>
            <div class="text">
              <p>最新设计效果图，请确认是否可以进行生产</p>
              <img width="100px" src="../../../static/img/goods.png" alt="">
              <img width="100px" src="../../../static/img/goods.png" alt="">
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

      <div class="design-list-box">
        <div class="section purchase">
          <div class="title flex">
            <span>定制信息</span>
            <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
          </div>


          <div class="list-item">
            <label class="label">定制字体</label>
            <span>宋体</span>
          </div>
          <div class="list-item">
            <label class="label">定制备注</label>
            <span>备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息</span>
          </div>

        </div>

        <div class="section purchase">
          <div class="title flex">
            <span>正面信息</span>
            <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
          </div>


          <div class="list-item">
            <label class="label">宝宝身高</label>
            <span>50CM</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝姓名</label>
            <span>张北海</span>
          </div>
          <div class="list-item">
            <label class="label">出生日期</label>
            <span>2018.07.14</span>
          </div>
          <div class="list-item">
            <label class="label">下午下午</label>
            <span>PM</span>
          </div>
          <div class="list-item">
            <label class="label">出生时间</label>
            <span>09：30</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝重量</label>
            <span>3700g</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝星座</label>
            <span>白羊座</span>
          </div>

        </div>

        <div class="section purchase">
          <div class="title flex">
            <span>背面信息</span>
            <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
          </div>


          <div class="list-item">
            <label class="label">宝宝身高</label>
            <span>50CM</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝姓名</label>
            <span>张北海</span>
          </div>
          <div class="list-item">
            <label class="label">出生日期</label>
            <span>2018.07.14</span>
          </div>
          <div class="list-item">
            <label class="label">下午下午</label>
            <span>PM</span>
          </div>
          <div class="list-item">
            <label class="label">出生时间</label>
            <span>09：30</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝重量</label>
            <span>3700g</span>
          </div>
          <div class="list-item">
            <label class="label">宝宝星座</label>
            <span>白羊座</span>
          </div>

        </div>
      </div>

      <div class="section">
        <div class="title flex">
          <span>收货地址</span>
          <router-link to="/address">选择新地址</router-link>
        </div>
        <div class="address-box">
          <span class="name">{{detail.address.name}}</span>
          <span class="tel">{{detail.address.tel}}</span>
          <div class="address">{{detail.address.address}}</div>
        </div>
      </div>

    </div>

    <div class="result" v-show="showResult">
      <div class="desc">
        <span class="fa fa-check-circle-o"></span>
        订单成功提交，请至商家中心查看实时进度
      </div>
      <button type="button">查看订单</button>
    </div>

  </div>
</template>

<script>
  export default {
      data () {
          return {
              showFront: true,
              showBack: true,
              showChat: true,
              showResult: false,
              detail: {
                id: 1,
                sn: '20181115093150001',
                date: '2018.11.15 09:31:50',
                imgUrl: '../../../static/img/goods.png',
                title: '宝宝生辰定制牌',
                number: '100',
                size: 'Au999 20g 20*23.8mm',
                answer: '请提供客服的详细资料和上传照片，具体内容请查看详情页',
                address: {
                  name: '张三', tel: '13800018000', address: '广东省深圳市罗湖区田贝路金利1102室'
                },
                type: '1',  // 订单类型  1：待确认  2：生产中  3： 已发货  4： 已取消
              }
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
  .head-info {
  //  border-top: 1px solid #f3f3f3;
   // display: flex;
   // align-items: center;
    padding: 0 10px 0 15px;

    .top {
      color: #ccc;
      font-size: 12px;
      line-height: 40px;
      //padding: 0 10px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }

    .img {
     // border: 1px solid #ccc;
      width: 75px;
      height: 75px;
      text-align: center;
      border-radius: 5px;
      padding: 10px;
      background: #333;

      .img-bg {
        border: 1px solid #4e4e4e;
        width: 100%;
        height: 100%;
        padding: 2px;
      }

      img {
     //   width: 30vw;
        max-width: 100%;
        max-height: 100%;
      }
    }

    .content {
   //   padding: 20px 10px;
      padding: 15px 15px 15px 0;
     // flex: 1;
      display: flex;
     // align-items: center;
     // flex-direction: column;

      .text {
        padding-left: 10px;
       // padding-left: 20px;
       // font-size: 16px;
       // color: #999;
       // font-weight: bold;
    //    line-height: 30px;
        display: flex;
        flex-direction: column;
        line-height: 20px;

      }
      .title {
        flex: 1;
        color: #0c0c0c;
      }
      .number {
      //  margin-top: 20px;
       // color: #333;
        color: #c66;
      }
    }
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
/*
  .btn-foot {
    height: 3rem;
    width: 100vw;
    margin-top: 10px;
    color: #fff;
    border: none;
    background: red;
  }

  .result {
    color: #333;
    text-align: center;
    .desc {
      margin: 30px 0;
    }
    .fa {
      font-size: 30px;
    }
    button {
      width: 70vw;
      display: block;
      border: none;
      background: red;
      color: #fff;
      margin: 20px auto;
      line-height: 30px;
    }
  }*/

  .purchase .title {
    padding-left: 0;
  }

  .address-box {
   // border-top: 10px solid #eaeaea;
  //  font-size: 14px;
   // color: #333;
   // padding: 15px 0 0 10px;
  /*  &:last-child {
      border-bottom: 10px solid #eaeaea;
    }*/
    .name, .tel {
      display: inline-block;
      margin-right: 20px;
      line-height: 22px;
      font-weight: 600;
    }
    .address {
      line-height: 18px;
      width: 80%;
    }
   /* .bar {
      margin-top: 13px;
      border-top: 1px solid rgba(230, 230, 230, 1);
      padding-top: 4px;
      height: 45px;
      display: flex;
      align-items: center;
      .flex {
        flex: 1;
      }
      .edit, .del {
        margin-right: 15px;
      }
    }*/
  }
</style>
