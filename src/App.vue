<template>
  <div id="app" @click="$root.eventHub.$emit('document-click', $event)">
    <div style="height:.5rem;"></div>
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App',
    mounted () {
      this.$nextTick(() => {  // 解决 ios10 及以上 Safari 无法禁止缩放
        // 阻止双击放大
        let lastTouchEnd = 0;
        document.addEventListener('touchstart', function(event) {
          if (event.touches.length > 1) {
            event.preventDefault();
          }
        });
        document.addEventListener('touchend', function(event) {
          let now = (new Date()).getTime();
          if (now - lastTouchEnd <= 300) {
            event.preventDefault();
          }
          lastTouchEnd = now;
        }, false);

        // 阻止双指放大
        document.addEventListener('gesturestart', function(event) {
          event.preventDefault();
        });
      })
    }
  }
</script>

<style>
  *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html {
    font-size: 100px;
  /* // height: 100vh;*/
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 0.12rem;
    color: #555;
/* //   min-height: 100vh;*/

    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition-duration: 300ms;
  }
  #app {
    height: 100%;
  }
  a {
    text-decoration: none;
    color: #333;
  }
</style>
