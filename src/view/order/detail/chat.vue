<template>
  <div v-show="type != 0">
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

      <div class="sub" @click="confirm()"> <span class="text-primary">提交</span></div>
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

<style lang="less" scoped>
  .form-sub {
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
    padding: 0 15px 0 18px;
    height: 45px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
  }
  .chat {
    background: #fdf8eb;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    .item {
      line-height: 20px;
      margin: 0 15px 0 15px;
      padding-bottom: 19px;
      font-size: 14px;
      color: #0c0c0c;
      &:not(:last-child) {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
      }
      .label {
        font-size: 16px;
        padding: 14px 0 11px 0;
        .date {
          margin-left: 5px;
          color: #ccc;
          font-size: 12px;
        }
      }
      .text {
        p {
          margin: 0;
        }
        img {
          max-width: 100%;
          margin: 10px 3px 0 0;
        }
      }
    }
  }
</style>
