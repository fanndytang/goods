<template>
  <div class="upload">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <div class="img-box" v-for="item,i in list" :key="i">
      <img :src="item.url" alt="">
      <div class="del" @click="del(i)"><img :src="require('@/assets/icons/icon_guanbi.png')" alt=""></div>
    </div>

    <div class="up-trigger" @click="tip()">
      <input type="file" :disabled="list.length >= max" @change="upload($event)">
      <img height="76px" :src="require('@/assets/icons/icon_up.png')" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      value: String,
      url: [String, Array],
      max: {
        type: Number,    // 最多可上传多少张
        default: Number.POSITIVE_INFINITY  // 正无穷大
      }
    },
    data () {
      return {
        list: []
      }
    },
    mounted () {
      if(this.url && this.value) {
        let url = typeof this.url === 'array' ? this.url : (this.url||'').split(',')
        let val = (this.value || '').split(',')
        if(val && url.length) {
          this.list = url.map((item,index) => {
            return {
              url: item,
              val: val[index] || ''
            }
          })
        }
      }

    },
    methods: {
      // 上传多于最大可上传数量时需要提示
      tip() {
        if(this.list.length >= this.max) {
          this.$message.error('最大可上传'+this.max+'张图片')

          return false
        }
      },
      upload(e) {
        let file = e.target.files[0]
        let url = URL.createObjectURL(file)

        this.list.push({
          url: url,
          val: url   // 唯一标志
        })

        let val = ''
        for(let k in this.list) {
          val += (val?',':'')+ this.list[k].val
        }

        this.$emit('input', val)
      },
      del(i) {
        this.list.splice(i, 1)

        let val = ''
        for(let k in this.list) {
          val += (val?',':'')+ this.list[k].val
        }

        this.$emit('input', val)

      }
    }
  }
</script>

<style lang="less" scoped>
  .upload {
    overflow-x: auto;
    display: flex;
    min-height: 80px;
    flex-wrap: wrap;
    img {
      max-height: 100%;
      max-width: 100%;
      border-radius: 5px;
    }
  }
  .img-box {
    overflow: hidden;
    position: relative;
    margin: 0 6px 3px 0;
    img {
      max-height: 80px;
    }
    .del {
      position: absolute;
      right: 0;
      top: 0;
      height: 20px;
      width: 20px;
      text-align: center;
      line-height: 16px;
      border: 1px solid #eee;
      border-radius: 50%;
      background: #fff;
      img {
        height: 10px;
      }
    }
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

      &:disabled {
        z-index: -1;
      }
    }
  }
</style>
