<template>
  <div v-show="type != 0" class="order-chat">
    <div class="title flex-between flex-xcenter" @click="show = !show">
      沟通记录<img height="20px" :src="require('@/assets/icons/icon_xia.png')" alt="" :style="setStyle(show)">
    </div>
    <div class="chat" v-show="show">
      <div class="item" v-for="item,i in chat" :key="i">
        <div class="label">{{item.name}}<span class="date">{{item.date}}</span></div>
        <div class="text" v-html="item.content"> </div>
      </div>
    </div>

    <div class="form-sub" v-show="show">
      <div class="item">
        <span class="label">回复：</span>
        <textarea cols="30" rows="3" placeholder="请输入您的问题" v-model="form.question"></textarea>
      </div>
      <div class="item">
        <upload-img-2 v-model="form.img" :max="5"></upload-img-2>
      </div>

      <div class="sub" @click="confirm()"> <span class="text-primary" style="color:#5c95a8;">提交</span></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      chat: Array
    },
    data () {
      return {
        loading: new this.Loading('提交中'),
        type: this.$route.query.type,
        show: true,
        form: {
          img: '',
          question: ''
        }
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
      },
      confirm() {
        this.loading.show()
        this.$http.post('/api/kefu', this.form).then(res => {
          this.loading.hide()
        }).catch(err => {
          this.loading.hide()
        })
      }
    }
  }
</script>

<style lang="less">
  .order-chat .chat .text {
    line-height: 20px;
    font-size: 14px;
    color: #0c0c0c;
    p {
      margin: 0;
    }
    img {
      max-width: 100%;
      //  height: 82px;
      margin: 9px 8px 0 0;
      display: inline-block;
    }
  }
</style>
<style lang="less" scoped>
  .form-sub {
    font-size: 15px;
    padding-top: 18px;
    textarea {
      vertical-align: top;
      flex: 1;
      border: none;
      padding: 2px 5px;
      line-height: 20px;
    }
    .item {
      display: flex;
      padding-bottom: 20px;
      margin: 0 10px 0 15px;
    }
    .label {
      color: #5c95a8;
    }
    .sub {
      border-top: 1px solid rgba(230, 230, 230, 1);
      margin: 0 15px;
      text-align: center;
      line-height: 48px;
    }
  }
  .title {
    font-size: 14px;
    color: #0c0c0c;
    padding: 0 10px 0 15px;
    height: 40px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .chat {
    background: #fdf8eb;
    border-bottom: 2px solid rgba(230, 230, 230, 1);
    .item {
      margin: 0 10px 0 15px;
      padding: 5px 0 15px 0;
      color: #0c0c0c;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
      .label {
        font-size: 16px;
        line-height: 40px;
        .date {
          margin-left: 4px;
          color: #ccc;
          font-size: 12px;
        }
      }
    }
  }
</style>
