<template>
  <div class="full-gray">
    <div class="header">
      <img :src="require('@/assets/icons/icon_fanhui.png')" height="15px" @click="$router.go(-1)">
      <div class="good-search">
        <img :src="require('@/assets/icons/search1.png')" height="20px">
        <input-span class="text" v-model="value" v-focus placeholder="搜索品牌或关键词" @change="search()"></input-span>
      </div>
      <span @click="search()">搜索</span>
    </div>

    <div class="history" v-show="history.length">
    <div class="item">
      <div class="title">历史记录</div>
      <img :src="require('@/assets/icons/icon_shanchu.png')" height="22px" @click="clear()" @touchend="touch()" @mouseup="touch()">
    </div>
    <div class="item" v-for="item,i in history" :key="i">{{item}}</div>
  </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
        value: '',
        history: [],
        canSearch: true  // 是否可以搜索
      }
    },
    created() {
      this.history = (localStorage.getItem('mysgyjhistory') || '').split('**&&**')
    },
    methods: {
      touch() {
        this.canSearch = false
      },
      search() {
        if(!this.canSearch) {
          setTimeout(() => {this.canSearch = true}, 500)
          return false
        }
        if(this.value) this.history.push(this.value)
        localStorage.setItem('mysgyjhistory', this.history.join('**&&**'))
        this.$router.push({name: 'goodlist', query: {keyword: this.value}})
      },
      clear() {
        localStorage.removeItem('mysgyjhistory')
      },
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
  /*  components: {
      child: {
        props:{
          value: String
        },
        data:function(){
          return {
            innerText:this.value,
            lock:false
          }
        },
        watch:{
          value:{
            handler(newValue, oldValue) {
              if(!this.lock) {
                this.innerText=this.value;
              }
            }
          }
        },
        methods:{
          changeTxt:function(e){
            this.$emit('input', this.$el.innerHTML);
          }
        },
        template:`<div contenteditable="true" v-html="innerText" @input="changeTxt" @focus="lock=true" @blur="lock=false;$emit('change')"></div>`

      }
    }*/
  }
</script>

<style lang="less" scoped>
  .header {
    display: flex;
    align-items: center;
    padding: 3px 10px;
    font-size: 14px;
    color: #0b0b0b;
    background: #fff;

    .good-search {
      width: auto;
      flex: 1;
      margin-left: 5px;
      margin-right: 5px;
    }

    .text {
      max-width: 70vw;
      overflow-x: auto;
      white-space: nowrap;
      display: inline-block;
      vertical-align: middle;
      min-width: 100px;
      text-align: left;

      &[contenteditable=true]{
        user-modify: read-write-plaintext-only;
        &:empty:before {
          content: attr(placeholder);
          display: block;
          color: #ccc;
        }
      }
    }
  }

  .history {
    background: #fff;
    .item {
      display: flex;
      justify-content: space-between;
      line-height: 40px;
      padding: 0 10px;
      align-items: center;
      border-top: 1px solid rgba(237, 237, 237, 1);
      color: #ccc;
      font-size: 13px;
      &:first-child {
        font-size: 15px;
        color: #0b0b0b;
      }
    }
  }
</style>
