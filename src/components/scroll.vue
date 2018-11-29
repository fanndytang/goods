<template>
  <div class="scroll-loadmore"
       @touchstart="touchStart($event)"
       @touchmove="touchMove($event)"
       @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">
    <section class="inner">
  <!--    <div style="position:fixed;top:40px;left:40px;color:red;z-index:100;">{{infiniteLoading}}</div>-->
      <slot></slot>
      <footer class="load-more">
        <div class="loading" v-show="loading"></div>
        <slot name="loadmore">
          <div class="tip" v-show="!loading && !notip"> ——<span>{{nodata ? nodatatext : '上拉显示更多'}}</span>——  </div>
        </slot>
      </footer>
    </section>
  </div>
</template>

<script>
  export default {
    props: {
      onInfinite: {
        type: Function,
        default: undefined,
        require: false
      },
      loading: {
        type: Boolean,
        default: true
      },
      nodatatext: {
              type: String,
        default: '没有更多数据啦'
      },
      nodata: {
        type: Boolean,
        default: false
      },
      notip: Boolean
    },
    watch: {
      loading(val) {
        if(!val) this.infiniteLoading = false
      }
    },
    data () {
      return {
        startY: 0,
        startScroll: 0,
        infiniteLoading: false
      };
    },
    methods: {
      touchStart (e) {
        this.startY = e.targetTouches[0].pageY;
        this.startScroll = this.$el.scrollTop || 0;
      },
      touchMove (e) {
        if (this.$el.scrollTop > 0) {
          return;
        }
        let diff = e.targetTouches[0].pageY - this.startY - this.startScroll;
        if (diff > 0) e.preventDefault();
      },
      infinite () {
        this.infiniteLoading = true;
        this.onInfinite(this.infiniteDone);
      },
      infiniteDone () {
        this.infiniteLoading = false;
      },

      onScroll () {
        if (this.infiniteLoading) {
          return;
        }
        let outerHeight = this.$el.clientHeight;
        let innerHeight = this.$el.querySelector('.inner').clientHeight;
        let scrollTop = this.$el.scrollTop;
        let infiniteHeight = this.$el.querySelector('.load-more').clientHeight;
        let bottom = innerHeight - outerHeight - scrollTop;
        if (bottom < infiniteHeight) this.infinite();
      }
    }
  }
</script>

<style lang="less" scoped>
  .scroll-loadmore {
    position: relative;
    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
  .scroll-loadmore .inner {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    transition-duration: 300ms;
  }
  .tip {
    color: #ccc;
    font-size: 14px;
    text-align: center;
    width: 100vw;
    line-height: .5rem;
    background: #eaeaea;
    span {
      margin: 0 4px;
    }
  }
  .loading {
    text-align: center;
    display: block;
    width: 30px;
    height: 30px;
    margin: 10px auto;
    border: 2px solid #9d9d9d;
    border-top-color: transparent;
    border-radius: 50%;
    animation: circle 1s infinite;
  }

  @keyframes circle {
    0% {transform: rotate(0)}
    100% {transform: rotate(360deg)}
  }
</style>
