<template>
  <div>
    <head-bar :back="true" title="订单信息" :menu="detail.type != 1">
      <span v-if="detail.type == 1">取消订单</span>
    </head-bar>

    <div v-show="!showResult">
      <div class="head-info">
        <div class="flex top" v-if="detail.type == 1">
          <strong>订单编号：{{detail.sn}}</strong>
          <span>{{detail.date}}</span>
        </div>
        <div class="content">
          <div class="img"><img :src="detail.imgUrl" alt=""></div>
          <div class="text">
            <div class="title">{{detail.title}}</div>
            <div class="title">{{detail.size}}</div>
            <div class="number">定购数量：{{detail.number}}件</div>
          </div>
        </div>
      </div>

      <div class="section" v-show="detail.type == 1">
        <div class="title flex" @click="showChat = !showChat">
          <h3>沟通记录</h3>
          <span class="fa fa-chevron-down"></span>
        </div>
        <div class="chat" v-show="showChat">
          <div class="item bottom">
            <span class="label">客服：</span>
            <div>
              <span class="date">2018.11.15 09:31:50</span>
              <p>最新设计效果图，请确认是否可以进行生产</p>
              <img width="100px" src="../../../static/imgs/goods.png" alt="">
              <img width="100px" src="../../../static/imgs/goods.png" alt="">
            </div>
          </div>
          <div class="item bottom">
            <span class="label">我：&emsp;</span>
            <div>
              <span class="date">2018.11.15 09:31:50</span>
              <p>最新设计效果图，请确认是否可以进行生产</p>
              <img width="100px" src="../../../static/imgs/goods.png" alt="">
              <img width="100px" src="../../../static/imgs/goods.png" alt="">
            </div>
          </div>
          <div class="item center">
            <span class="label">回复：</span>
            <textarea cols="30" rows="3" placeholder="请输入您的问题"></textarea>
          </div>
          <div class="item">
            <span class="label">图片：</span>
            <input type="file">
          </div>

          <div class="btn"> <button type="button">提交</button></div>
        </div>
      </div>

      <div class="section">
        <div class="title flex">
          <h3>定制信息</h3>
        </div>
        <div class="content">
          <div class="list-item">
            <label>定制字体</label>
            <span>宋体</span>
          </div>
          <div class="list-item">
            <label>定制备注</label>
            <span>备注信息备注信息备注信息备注信息备注信息备注信息备注信息备注信息</span>
          </div>

          <div class="sec-box flex" @click="showFront = !showFront">
            <span>正面信息</span>
            <span class="fa" :class="{'fa-chevron-down': showFront, 'fa-chevron-up': !showFront}"></span>
          </div>
          <div v-show="showFront">
            <div class="list-item">
              <label>宝宝身高</label>
              <span>50CM</span>
            </div>
            <div class="list-item">
              <label>宝宝姓名</label>
              <span>张北海</span>
            </div>
            <div class="list-item">
              <label>出生日期</label>
              <span>2018.07.14</span>
            </div>
            <div class="list-item">
              <label>下午下午</label>
              <span>PM</span>
            </div>
            <div class="list-item">
              <label>出生时间</label>
              <span>09：30</span>
            </div>
            <div class="list-item">
              <label>宝宝重量</label>
              <span>3700g</span>
            </div>
            <div class="list-item">
              <label>宝宝星座</label>
              <span>白羊座</span>
            </div>
          </div>

          <div class="sec-box flex" @click="showBack = !showBack">
            <span>背面信息</span>
            <span class="fa" :class="{'fa-chevron-down': showBack, 'fa-chevron-up': !showBack}"></span>
          </div>
          <div v-show="showBack">
            <div class="list-item">
              <label>祝愿祝愿</label>
              <span>平安</span>
            </div>
            <div class="list-item">
              <label>宝宝照片</label>
              <span><img src="" alt=""></span>
            </div>
          </div>

        </div>
      </div>

      <div class="section">
        <div class="title flex">
          <h3>收货地址</h3>
          <router-link to="/address" class="gray">选择新地址</router-link>
        </div>
        <div class="content">
          <span>{{detail.address.name}}</span>
          <span style="margin-left: 20px;">{{detail.address.tel}}</span>
          <div>{{detail.address.address}}</div>
        </div>
      </div>

      <button type="button" class="btn-foot" v-if="detail.type != 1" @click="showResult=true">确定提交</button>

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
                imgUrl: '../../../static/imgs/goods.png',
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
  .head-info {
    background: #fff;
    border-top: 1px solid #f3f3f3;

    .top {
      line-height: 40px;
      padding: 0 10px;
      border-bottom: 1px solid #f3f3f3;
    }

    .img {
      border: 1px solid #ccc;
      img {
        width: 30vw;
      }
    }

    .content {
      padding: 20px 10px;
      display: flex;
      .text {
        padding-left: 20px;
        font-size: 16px;
        color: #999;
        font-weight: bold;
        line-height: 30px;
      }
      .number {
        margin-top: 20px;
        color: #333;
      }
    }
  }

  .section {
    margin-top: 10px;
    background: #fff;
    .title {
      h3 {
        font-size: 14px;
      }
      padding: 0 10px;
      height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .gray {
      color: #999;
    }
    .content {
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
    }
    .chat {
      .item {

        display: flex;
        align-items: flex-start;
        padding: 10px;
        textarea {
          flex: 1;
        }
        &.bottom {
          border-bottom: 1px dotted #ccc;
        }
        &.center {
          align-items: center;
        }
        .label {
          font-weight: bold;
        }
      }
      .btn {
        padding: 15px;
        text-align: center;
        button {
          width: 40vw;
          border: none;
          background: red;
          color: #fff;
          line-height: 30px;
        }
      }
    }
  }

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
  }
</style>
