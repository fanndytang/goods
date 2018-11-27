<template>
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
</template>

<script>
  export default {
    props: {
      purchase: Object
    },
    data () {
      return {
        type: this.$route.query.type
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
</style>
