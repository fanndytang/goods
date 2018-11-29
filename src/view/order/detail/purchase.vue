<template>
  <div>
    <div class="box">
      <div class="title flex-between flex-xcenter">
        <span>定制信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
      </div>
      <div class="list-item">
        <label class="label">定制字体</label>
        <span>{{purchase.fontFamily || '无'}}</span>
      </div>
      <div class="list-item" v-if="custom">
        <label class="label">定制照片</label>
        <span>{{purchase.fontFamily || '无'}}</span>
      </div>
      <div class="list-item">
        <label class="label">定制备注</label>
        <span>{{purchase.remark || '无'}}</span>
      </div>

    </div>

    <div class="box" v-if="!custom">
      <div class="title  flex-between flex-xcenter">
        <span>正面信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
      </div>

      <div v-if="purchase.front && purchase.front.params">
        <div class="list-item" v-for="item,i in purchase.front.params" :key="i">
          <label class="label">{{item.title}}</label>
          <span v-if="item.type == 1 || item.type == 2">{{item.text}}</span>
          <img v-if="item.type == 3 || item.type == 4" :src="item.url" alt="">
        </div>
      </div>


    </div>

    <div class="box" v-if="!custom">
      <div class="title  flex-between flex-xcenter">
        <span>背面信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="">
      </div>

      <div v-if="purchase.back && purchase.back.params">
        <div class="list-item" v-for="item,i in purchase.back.params" :key="i">
          <label class="label">{{item.title}}</label>
          <span v-if="item.type == 1 || item.type == 2">{{item.text}}</span>
          <img v-if="item.type == 3 || item.type == 4" :src="item.url" alt="">
        </div>
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
              custom: this.$route.query.custom, // 是否是个性定制页面
        type: this.$route.query.type
      }
    }
  }
</script>

<style lang="less" scoped>
 .title {
   font-size: 14px;
   color: #0c0c0c;
   margin-bottom: 5px;
   height: 45px;
   border-bottom: 1px solid rgba(230, 230, 230, 1);
 }

  .box {
    &:not(:first-child) {
      border-top: 10px solid #eaeaea;
    }
    padding: 0 10px 7px 15px;
  }

  .list-item {
    font-size: 14px;
    line-height: 24px;
    margin-bottom: 2px;
    display: flex;
    align-items: flex-start;
    .label {
      color: #ccc;
      white-space: nowrap;
      padding-right: 48px;
    }
    img {
      max-height: 80px;
    }
  }
</style>
