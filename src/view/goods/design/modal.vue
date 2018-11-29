<template>
  <div class="modal-box" v-show="showModal">
    <div class="modal-body">
      <div class="title">选择图标<img @click="$emit('update:showModal', false)" class="close" height="20px" :src="require('@/assets/icons/icon_guanbi.png')" alt=""></div>
      <div class="item" v-for="item,i in icons.list" :key="i">
        <div class="item-tit">{{item.title}}<img height="22px" :src="require('@/assets/icons/icon_xia1.png')" alt=""></div>
        <div class="content">
          <div class="item" v-for="el,k in item.list" :key="k" :class="{'active': icons.ele.params[icons.index].url == el.url}">
            <div class="img" @click="setIconUrl(icons.index, el.url, icons.ele)"><img :src="el.url" alt=""></div>{{el.text}}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      showModal: Boolean,
      icons: Object,
      setIconUrl: Function
    }
  }
</script>

<style lang="less" scoped>
  .modal-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
    color: #000;
    .modal-body {
      position: absolute;
      background: #fff;
      bottom: 0;
      max-height: 75%;
      width: 100%;
    }
    .title {
      line-height: 42px;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid rgba(234, 234, 234, 1);
      padding: 0 15px;
      .close {
        float: right;
        margin-top: 10px;
      }
    }
    .item {
      .item-tit {
        margin: 0 0 0 10px;
        font-size: 14px;
        padding-right: 15px;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(234, 234, 234, 1);
      }
      .content {
        padding: 3px 7px 20px 7px;
        border-bottom: 1px solid rgba(234, 234, 234, 1);
        .item {
          display: inline-block;
          width: 56px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          .img {
            height: 47px;
            width: 47px;
            border-radius: 50%;
            overflow: hidden;
            background: #e9e9e9;
            margin: 12px auto 5px auto;
            border: solid 1px transparent;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          &.active .img {
            border: solid 1px rgba(220, 182, 61, 1);
          }
        }
      }
    }
  }
</style>
