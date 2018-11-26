<template>
  <div class="full-gray">
    <div class="header">
      <img :src="require('@/assets/icons/icon_fanhui.png')" height="15px" @click="$router.go(-1)">
      <div class="good-search">
        <img :src="require('@/assets/icons/search1.png')" height="20px">
        <span class="text">{{value || place}}</span>
        <input type="search" class="input-search" v-focus v-model="value" @change="search()" />
      </div>
      <span @click="search()">搜索</span>
    </div>

    <div class="history" v-show="history.length">
      <div class="item">
        <div class="title">历史记录</div>
        <img :src="require('@/assets/icons/icon_shanchu.png')" height="22px" @click="clear()">
      </div>
      <div class="item" v-for="item,i in history" :key="i">{{item}}</div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {
         // c: false,
        place: '搜索品牌或关键词',
        value: '',
        history: []
      }
    },
    created() {
      this.history = (localStorage.getItem('mysgyjhistory') || '').split('**&&**')
     // console.log(this.history)
    },
    methods: {
      search() {
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
