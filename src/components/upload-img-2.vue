<template>
  <div class="upload">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <div class="img-box" v-for="item,i in list" :key="i">
      <img :src="item.url" alt="">
      <div class="del" @click="del(i)"><img :src="require('@/assets/icons/icon_guanbi.png')" alt=""></div>
    </div>

    <div class="up-trigger" @click="tip()">
      <input type="file" :disabled="list.length >= max" @change="upload($event)" multiple="multiple">
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
    watch: {
            value(val) {
                    if(val == '') {
                      this.list = []
                    }else {
                      if(val.split(',').length !== this.list.length) {
                        let v = val.split(',')
                        this.list = v.map(item => {
                          return {
                            url: item,
                            val: item   // 唯一标志
                          }
                        })
                      }
                    }

            }
    },
    data () {
      return {
              loading: new this.Loading('正在上传'),
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
        let file = e.target.files, num = 0

        if(this.list.length + file.length > this.max) {
          num = this.max - this.list.length
          this.$message.error('最大可上传'+this.max+'张图片')
          let d = []
          for(let i=0;i<num;i++) {
                  d.push(file[i])
          }
          file = d
        }


        if(file.length > 0) {
                this.loading.show()
          let d = new FormData()
          d.append('file', file)
          this.$http({
            url: '/upload',
            method: 'post',
            data: d,
            success: (data) => {
              // 测试数据
              data.data = []
              num = file.length
              for(let i=0; i<num; i++) {
                data.data.push(URL.createObjectURL(file[i]))
              }
              // 测试结束

              let url = typeof data.data =='string' ? data.data.split(',') : data.data
              if(url.length) {
                for(let k in url) {
                  this.list.push({
                    url: url[k],
                    val: url[k]   // 唯一标志
                  })
                }
              }

              let val = ''
              for(let k in this.list) {
                val += (val?',':'')+ this.list[k].val
              }

              this.$emit('input', val)
              this.loading.hide()
            },
            error: (data) => {
              this.loading.hide()
              this.$message.error('上传失败，请重试')
            }

          })
        }



      },
      del(i) {
              this.loading.show('正在删除')
        this.$http({
          url: '',
          method: 'get',
          data: {
                  url: this.list[i].url
          },
          success: (data) => {
            this.list.splice(i, 1)

            let val = ''
            for(let k in this.list) {
              val += (val?',':'')+ this.list[k].val
            }

            this.$emit('input', val)
            this.loading.hide()
          },
          error: (data) => {
                  this.$message.error('删除失败，请重试')
            this.loading.hide()
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
