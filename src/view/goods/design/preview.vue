<template>
  <div class="design-box preview-design-box">

    <img :src="box.backgroundImg" alt="">

    <div class="item" v-for="item,i in box.params" :key="i" :style="setStyle(item)" v-show="item.enable">

      <span v-if="item.type == 1">{{item.text}}</span>
      <span v-if="item.type == 2">{{item.selText}}</span>
      <span v-if="item.type == 3"><img :src="item.url" :style="setSize(item)" alt=""></span>
      <span v-if="item.type == 4">
        <img :src="item.url" :style="setSize(item)" alt=""></span>

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      box: Object
    },
    methods: {
            setSize(item) {
                    let sty = ''
                    if(item.width) sty += 'width:'+item.width+'px;'
                    if(item.height) sty += 'height:'+item.height+'px;'
              return sty
            },
      setStyle(item) {
        //(item.fontsize?'font-size:'+item.fontsize+';':'')+'top:'+item.top+'px;left:'+item.left+'px;transform:rotate('+(item.rotate||'0')+'deg);'+item.style
        let sty = ''

        if(item.fontsize) sty += 'font-size:'+item.fontsize+'px;'
        sty += 'top:'+item.top+'px;'
        sty += 'left:'+item.left+'px;'
        sty += 'transform:rotate('+(item.rotate||0)+'deg;'
        if(item.style) sty += item.style

        //console.log(sty)

        return sty
      }
    }
  }
</script>
<style lang="less">
  .preview-design-box .item span {
    line-height:1;
  }
</style>
<style lang="less" scoped>
  .design-box {
    max-height: 100%;
    display: inline-block;
    position: relative;
    overflow: hidden;
    .item {
      position: absolute;
      line-height: 1;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
