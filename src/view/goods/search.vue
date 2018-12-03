<template>
  <div class="full-gray">
    <div class="header">
      <img :src="require('@/assets/icons/icon_fanhui.png')" height="15px" @click="$router.go(-1)">
      <div class="good-search">
        <div class="input-bg">
          <img :src="require('@/assets/icons/search1.png')" height="20px">
          <span>{{spanVal || '搜索品牌或关键词'}}</span>
        </div>

        <input class="input-search" @input="inputVal($event)" type="text" v-model="value" placeholder="搜索品牌或关键词" v-focus @blur="search()">
      </div>
      <span @click="canSearch=true; search()">搜索</span>
    </div>

    <div class="history" v-show="history.length">
    <div class="item">
      <div class="title">历史记录</div>
      <img ref="history" :src="require('@/assets/icons/icon_shanchu.png')" height="22px" @click="clear()" @touchend="touch()" @mouseup="touch()">
    </div>
    <div class="item" v-for="item,i in history" :key="i" v-html="item" @click="value=item;canSearch=true;search();" @touchend="touch()" @mouseup="touch()"></div>
  </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
              spanVal: '',
        value: '',
        history: [],
        canSearch: true  // 是否可以搜索
      }
    },
    created() {
      let history = (localStorage.getItem('mysgyjhistory') || '').split('**&&**')
      for(let k in history) {
        let item = history[k]
        if(item && !this.history.includes(item)) this.history.push(item)
      }
    },
    methods: {
      inputVal(e) {
              this.spanVal = e.target.value
            },
      touch() {
        this.canSearch = false
      },
      search() {
        if(!this.canSearch) {
          setTimeout(() => {this.canSearch = true}, 500)
          return false
        }
        if(this.value) this.history.push(this.value.toString().replace(/<br>/g, ''))
        localStorage.setItem('mysgyjhistory', this.history.join('**&&**'))
        this.$router.push({name: 'goodlist', query: {keyword: this.value}})
      },
      clear() {
        localStorage.removeItem('mysgyjhistory')
        this.history = []
      },
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    }
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
