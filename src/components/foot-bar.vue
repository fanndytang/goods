<template>
  <div>
    <div style="height: .5rem;"></div>
    <div class="menu">
      <router-link class="item" :class="{'active': active==1}" to="/"><img :src="setIcon('home', active === 1)">首页</router-link>
      <router-link class="item" :class="{'active': active==2}" to="/goodlist"><img :src="setIcon('dg', active === 2)">商品定购</router-link>
      <router-link class="item" :class="{'active': active==3}" :to="{name: 'customized', query: {customid: setId()}}"><img :src="setIcon('gx', active === 3)">个性定制</router-link>
      <router-link class="item" :class="{'active': active==4}" to="/mine"><img :src="setIcon('my', active === 4)">商家中心</router-link>
    </div>
  </div>
</template>

<script>
  export default {
      data () {
          return {
              active: 1
          }
      },
    created () {
      let str = {'/': 1, '/goodlist': 2, '/customized': 3, '/mine': 4}
      this.active = str[this.$route.path] || 1
    },
    methods: {
        setId() {
          return  'custom'+new Date().getTime()
        },
          setIcon(mark, active) {
              return active ?
                require('@/assets/icons/'+mark+'1.png') :
                require('@/assets/icons/'+mark+'.png')
          }
    }
  }
</script>

<style>
  body {/*
  //  padding-bottom: .25rem;*/
  }
</style>
<style lang="less" scoped>
  .menu {
    position: fixed;
    width: 100vw;
    bottom: 0;
    z-index: 100;
    display: flex;
    background: #fff;
    border-top: 1px solid rgba(215, 215, 215, 1);
    height: .5rem;
    align-items: center;
    justify-content: center;
    .item {
      flex: 1;
      color: #444;
      text-align: center;
      &.active {
        color: #dcb63d;
      }
      img {
        height: 22px;
        display: block;
        margin: 0 auto;
      }
    }
  }
</style>
