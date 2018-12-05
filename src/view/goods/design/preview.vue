<template>
  <div class="design-box">

    <img :src="box.backgroundImg" alt="">

    <div class="item" v-for="item,i in box.params" :key="i" :style="setStyle(item)">

      <span v-if="item.type == 1">{{item.text}}</span>
      <span v-if="item.type == 2">{{item.selText}}</span>
      <span v-if="item.type == 3"><img :src="item.url" :style="`width:${item.width};height:${item.height};`" alt=""></span>
      <span v-if="item.type == 4">
        <img :src="item.url" :style="`width:${item.width};height:${item.height};`" alt=""></span>

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      box: Object
    },
    methods: {
            changeIconSize(e, i) {
              item.width = (parseInt(item.width) + 1) + 'px'
              this.box.params.splice(i, 1, item)
            },
      setStyle(item) {
        //(item.fontsize?'font-size:'+item.fontsize+';':'')+'top:'+item.top+'px;left:'+item.left+'px;transform:rotate('+(item.rotate||'0')+'deg);'+item.style
        let sty = ''

        if(item.fontsize) sty += 'font-size:'+item.fontsize+';'
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

<style lang="less" scoped>
  .design-box {
    height: 100%;
    display: inline-block;
    position: relative;
    .item {
      position: absolute;
    }
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
</style>
