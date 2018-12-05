<template>
  <div>
    <input type="hidden" :value="value" @input="value = $event.target.value">
    <div class="box" v-show="show">
      <head-bar class="flex-between">
        <img :src="require('@/assets/icons/icon_fanhui.png')" height="22px" @click="show = false;">
        <span class="text-primary f14" @click="getImg()">使用</span>
      </head-bar>

      <img ref="image" :src="value" id="image" alt="" width="100%">
    </div>

    <slot name="up-trigger" :upload="upload"></slot>
  </div>
</template>

<script>
  import 'cropperjs/dist/cropper.css';
  import Cropper from 'cropperjs';

  export default {
    props: {
      value: String
    },
    data () {
      return {
        show: false,
        cropperBox: null
      }
    },
    watch: {
      show(val) {
        if(!val && this.cropperBox!==null) {
          this.cropperBox.destroy()
        }
      },
      value(val) {
        if(val) {
          this.createCropper()
        }
      }
    },
    mounted () {

    },
    methods: {
      // 创建裁剪实例
      createCropper() {
        this.$nextTick(() => {
          if(this.cropperBox!==null) {
            this.cropperBox.destroy()
          }

          // const image = document.getElementById('image');
          const image = this.$refs.image
          this.cropperBox = new Cropper(image, {
            autoCrop: true,
            viewMode:1,
            dragMode: 'move',
            background:false,
            aspectRatio: 1,
            guides: false,
            crop(event) {},
          });
        })
      },
      // 获取裁剪图像
      getImg() {
        let url = this.cropperBox.getCroppedCanvas().toDataURL()
        this.$emit('input', url)
        this.$emit('change', url)
        this.show = false

      },
      //  上传图片
      upload(e) {
        let file = {}, url = ''
        if(typeof e == 'string') {
          url = e
        }else {
          file = e.target.files[0]
          url = URL.createObjectURL(file)
        }

        this.$emit('input', url)
        this.show = true
      }
    }
  }
</script>

<style lang="less">
  .box .cropper-container {
    position: absolute;
    top: 60%;
    transform: translateY(-50%);

    .cropper-modal, .cropper-drag-box {
      background: rgba(60, 60, 60, 0.51);
      opacity: 1;
    }
  }
</style>
<style lang="less" scoped>
  .box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: #000;
    z-index: 200;
  }
</style>
