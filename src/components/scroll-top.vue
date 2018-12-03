<template>
  <div class="scroll-top" id="scroll-top" @click="scrollToTop()" v-show="isScrollTop">
    <img height="20px" :src="require('@/assets/icons/top.png')" alt="">
    顶部
  </div>
</template>

<script>
  export default {
    props: {
   //   el: String
    },
    data() {
      return {
        scrollTop: null,     // 定义滚动条默认位置
        isScrollTop: false   // 定义按钮默认状态
      }
    },
    mounted() {
      // 监听滚动事件
      window.addEventListener('scroll', () => {
        this.scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop || 0

        // 控制滚动按钮的隐藏或显示
        this.isScrollTop = this.scrollTop > 150
      }, true);
    },
    methods: {
      scrollToTop() {  //  滚动到顶部
        let scrollTop = this.scrollTop,
          //scrollEle = document.querySelector(this.el) || window,
          speed = 40   // 速度初始值

        function play () {
          if(scrollTop > 0){
            scrollTop -= speed
            scrollTop = Math.max(scrollTop, 0)
            speed += 20
            window.scrollTo(0, scrollTop)
            requestAnimFrame (() => {play()})
          }
        }
        play()
      }
    }
  };
</script>

<style lang="less" scoped>
  .scroll-top {
    position: fixed;
    bottom: 2.5rem;
    right: 5px;
    width: 44px;
    height: 44px;
    padding: 3px;
    background: #e1e1e1;
    border-radius: 50%;
    z-index: 100;
    text-align: center;
    img {
      display: block;
      margin: 0 auto;
    }
  }
</style>
