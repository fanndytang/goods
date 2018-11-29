<template>
  <div class="design-box">

    <img :src="box.backgroundImg" alt="">

    <div class="item" v-for="item,i in box.params" :key="i" :style="setStyle(item)">

      <span v-if="item.type == 1">{{item.text}}</span>
      <span v-if="item.type == 2">{{item.selText}}</span>
      <span v-if="item.type == 3"><img :src="item.url" :style="`width:${item.width};height:${item.height};`" alt=""></span>
      <span v-if="item.type == 4"><img :src="item.url" alt=""></span>

    </div>

  </div>
</template>

<script>
  export default {
    props: {
      box: Object
    },
    methods: {
      setStyle(item) {
        //(item.fontsize?'font-size:'+item.fontsize+';':'')+'top:'+item.top+'px;left:'+item.left+'px;transform:rotate('+(item.rotate||'0')+'deg);'+item.style
        let sty = ''

        if(item.fontsize) sty += 'font-size:'+item.fontsize
        sty += 'top:'+item.top+'px;'
        sty += 'left:'+item.left+'px;'
        sty += 'transform:rotate('+(item.rotate||0)+'deg;'
        if(item.style) sty += item.style

        return sty
      }
    }
  }
</script>

<style lang="less" scoped>
  .design-box {
    position: relative;
    .item {
      position: absolute;
    }
  }
</style>
