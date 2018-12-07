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
          if(!this.$root.webinfo.isget) {
                  this.getInfo()
          }
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
    },
    methods: {
            // 获取网站相关配置信息
      getInfo() {
              this.$http({
                url: '/home/get_global_config',
                method: 'get',
                success: (data) => {
                        //  测试数据
                  data.data = {
                    webname: '',   // 网站名称
                    logo: './static/img/logo.jpg',   // Logo
                    ads: {
                      home_banner: [   // 首页轮播图
                        {
                          id: '1',
                          link: 'http://baidu.com',    // 图片链接
                          url: './static/img/ad1.jpg',   // 图片地址
                          type: '1'                     //  1: 图片  2： 视频
                        },
                        {
                          id: '2',
                          link: '',
                          type: '2',
                          url: './static/img/ad1.jpg',
                          videoUrl: 'http://220.112.193.197/mp4files/A18400000009E79A/vjs.zencdn.net/v/oceans.mp4' // 视频地址
                        },
                      ],
                      new_arrival: {link: '', url: './static/img/ad2.png'},  //  首页 新品专区(link 有值就跳转，否则不跳）
                      hot_sale: {link: '', url: './static/img/ad3.jpg'},  // 首页 热卖专区(link 有值就跳转，否则不跳）
                      goods_banner: {link: '', url: './static/img/banner.jpg'},  //  商品定制 头部(link 有值就跳转，否则不跳）
                    }
                  }
                  // 测试数据结束

                  let d = data.data
                  d.ads = d.ads || {}
                  this.$root.webinfo = {
                          isget: true,   // 已经获取过配置信息
                          webname: d.webname || '',
                          logo: d.logo || '',
                    home_banner: d.ads.home_banner || [],
                    new_arrival: d.ads.new_arrival || {},
                    hot_sale: d.ads.hot_sale || {},
                    goods_banner: d.ads.goods_banner || {},
                  }
                },
                error: (data) => {
                        this.$root.webinfo.isget = false
                }
              })
      }
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
