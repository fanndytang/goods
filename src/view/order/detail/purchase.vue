<template>
  <div>
    <div class="box">
      <div class="title flex-between flex-xcenter" @click="show1 = !show1">
        <span>定制信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="" :style="setStyle(show1)">
      </div>
      <div v-show="show1">
        <div class="list-item">
          <label class="label">定制字体：</label>
          <span>{{purchase.fontFamily || '无'}}</span>
        </div>
        <div class="list-item" v-if="custom">
          <label class="label">定制照片：</label>
          <img-preview v-if="purchase.imgs" :list="purchase.imgs" ref="preview">
            <img v-for="el,k in purchase.imgs" :key="k" :src="el" alt="" @click="$refs[`preview`].active=k;$refs[`preview`].visible=true">
          </img-preview>
        </div>
        <div class="list-item">
          <label class="label">定制备注：</label>
          <span>{{purchase.remark || '无'}}</span>
        </div>
      </div>

    </div>

    <div class="box" v-if="!custom">
      <div class="title  flex-between flex-xcenter" @click="show2 = !show2">
        <span>正面信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="" :style="setStyle(show2)">
      </div>

      <div v-if="show2 && purchase.front && purchase.front.params">
        <div class="list-item" v-for="item,i in purchase.front.params" :key="i">
          <label class="label">{{item.title}}：</label>
          <span v-if="item.type == 1 || item.type == 2">{{item.text}}</span>
          <img v-if="item.type == 3 || item.type == 4" :src="item.url" alt="">
        </div>
      </div>


    </div>

    <div class="box" v-if="!custom">
      <div class="title  flex-between flex-xcenter" @click="show3 = !show3">
        <span>背面信息</span>
        <img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="" :style="setStyle(show3)">
      </div>

      <div v-if="show3 && purchase.back && purchase.back.params">
        <div class="list-item" v-for="item,i in purchase.back.params" :key="i">
          <label class="label">{{item.title}}：</label>
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
      purchase: Object,
      type: [Number, String]
    },
    data () {
      return {
        show1: true,
        show2: true,
        show3: true,
        custom: this.$route.query.customid, // 是否是个性定制页面
      //  type: this.$route.query.type
      }
    },
    methods: {
            setStyle(val) {
                    if(val) {
                            return ''

                    }else {
                            return '-webkit-transform:rotate(180deg);' +
                              '-moz-transform: rotate(180deg);' +
                              '-ms-transform: rotate(180deg);' +
                              '-o-transform: rotate(180deg);' +
                              'transform: rotate(180deg);'
                    }
            }
    }
  }
</script>

<style lang="less" scoped>
  .title {
    font-size: 14px;
    color: #333;
    margin-bottom: 3px;
    height: 40px;
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
    line-height: 28px;
  //  margin-bottom: 2px;
    display: flex;
    align-items: flex-start;
    color: #333;
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
