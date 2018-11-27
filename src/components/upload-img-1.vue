<template>
  <div class="upload">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <div class="img-box" v-show="url">
      <img :src="url" alt="">
    </div>

    <div class="up-trigger">
      <input type="file" @change="upload($event)">
      <img height="76px" :src="require('@/assets/icons/'+(url ? 'icon_reup' : 'icon_up')+'.png')" alt="">
    </div>
  </div>
</template>

<script>
  export default {
          props: {
                  value: String,
            url: String
          },
    data () {
                  return {
                       //   url: ''
                  }
    },
    methods: {
                  upload(e) {
                    //      console.log(this)
                          let file = e.target.files[0]
                    let url = URL.createObjectURL(file)
//console.log(url)
                    this.$emit('input', 'testsetsat')

                   // this.url = url

                    this.$emit('update:url', url)
                 //   console.log(this.value)
                  }
    }
  }
</script>

<style lang="less" scoped>
  .upload {
    overflow-x: auto;
    display: flex;
    min-height: 80px;
   // align-items: center;
    img {
      max-height: 100%;
      max-width: 100%;
      border-radius: 5px;
    }
  }
  .img-box {
  //  min-height: 76px;
    margin-right: 6px;
    overflow: hidden;
    flex: 1;
  }
  .up-trigger {
    position: relative;
    input[type=file] {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 10;
      opacity: 0;
    }
  }
</style>
