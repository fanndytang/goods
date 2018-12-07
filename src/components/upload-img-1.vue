<template>
  <div class="upload">
    <input type="hidden" :value="value" @input="value = $event.target.value">
    <div class="img-box" v-show="path || url">
    <img :src="path || url" alt="" height="76px">
  </div>

    <div class="up-trigger">
      <input type="file" @change="upload($event)">
      <img height="76px" :src="require('@/assets/icons/'+((url||path) ? 'icon_reup' : 'icon_up')+'.png')" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      url: String,
      noUp: Boolean   // 是否上传
    },
    data () {
      return {
        path: '',
        loading: new this.Loading('正在上传'),
      }
    },
    watch: {
            url(val) {

            //  this.$emit('input', val)

              this.path = val
           //   this.$emit('update:url', val)
            //  this.$emit('change', val)
            }
    },
    methods: {
      upload(e) {
        let file = e.target.files[0]

        if(this.noUp) {
          let url = URL.createObjectURL(file)
          this.$emit('input', url)

          this.path = url
          this.$emit('update:url', url)
          this.$emit('change', url)

          return false
        }

        this.loading.show()
        let d = new FormData()
        d.append('file', file)
        this.$http({
          url: '/upload',
          method: 'post',
          data: d,
          success: (data) => {
          //  data.data = URL.createObjectURL(file)

            this.$emit('input', data.data)

            this.path = data.data
            this.$emit('update:url', data.data)
            this.$emit('change', data.data)

            this.loading.hide()
          },
          error: (data) => {
            this.loading.hide()
            this.$message.error('上传失败，请重试')
          }

        })

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
   // max-height: 76px;
    margin-right: 6px;
  //  max-width: 100% - 76px;
    // overflow: hidden;
    // flex: 1;
  }
  .up-trigger {
    position: relative;
    img {
      display: block;
    }
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
