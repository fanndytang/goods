<template>
  <div class="set-design-box">

    <div class="list-item" v-for="item,i in box.params" :key="i" v-if="item.enable">
      <div class="label">
        {{item.title}}：
        <div class="other-modal" v-if="item.type == 4" @click="getIcon(item, i, box)">其它模板&emsp;</div>
      </div>
      <div style="flex: 1;" :style="item.type==4 ? 'overflow:hidden;': ''">
        <input v-if="item.type == 1" type="text" v-model="item.text" @change="setDesign(box, i, wordEle)" placeholder="请输入">

        <form-select v-if="item.type == 2" :list="item.selList" v-model="item.selText" @change="setDesign(box, i, wordEle)" style="display:inline-block;"></form-select>

        <input v-if="item.type == 3 && item.istext" v-model="item.text" type="text" placeholder="请输入">
        <div v-if="item.type==3 && !item.istext">
          <cropper-img v-model="item.url" @change="uploadCropperChange(item, i)" @cancel="cancelCropper(item,i)">
            <div slot="up-trigger" slot-scope="p" class="upload">
              <upload-img-1 class="design-img-upload" :no-up="true" :ref="'upload'+i" @change="p.upload(item.url)" style="margin: 7px 0 0 0;"
                            :url.sync="item.url" v-model="item.url"></upload-img-1>
            </div>

          </cropper-img>
          <input type="text" placeholder="请输入缩放比例" v-model="item.scaleNo" @change="changeScale(item, i)" style="margin-bottom:10px;"><span style="color:#c2c2c2;">%</span>
        </div>

        <div v-if="item.type == 4 && item.iconlist">
          <div class="xz-box">
            <div class="item" v-for="el,k in item.iconlist" :key="k" :class="{'active': item.url == el.url}">
              <div class="img" @click="setIconUrl(i, el.url, box)"><img :src="el.url" alt=""></div>
              {{el.text}}
          </div>
         </div>

         <div>
            <input type="text" placeholder="请输入缩放比例" v-model="item.scaleNo" @change="changeScale(item, i)" style="margin-bottom:10px;"><span style="color:#c2c2c2;">%</span>
          </div>
        </div>
      </div>

      <!--<input type="text" placeholder="旋转角度" v-model="item.rotate" style="width: 30px;">-->


    </div>

    <modal-box :show-modal.sync="showModal" :icons="icons" :setIconUrl="setIconUrl"></modal-box>
  </div>

</template>

<script>
  import modalBox from './modal.vue'

  export default {
    props: {
      box: Object,
      wordEle: Object
    },
    data () {
      return {
        showModal: false,
        icons: {                                     // 其它模板列表
          index: '',                            // 当前数据所属的定制参数索引值
          ele: {params: []},                              // 当前数据所属的定制正面或背面
          list: []
        },
        uploadUrl: '',
        cropperUrl: ''
      }
    },
    watch: {
      wordEle(val) {
        if(val.length) {
          let that = this
          val.each(function(i) {
                  if(that.box.params[i].enable) {
                    let d = new MyDrag({
                      el: $(this)[0],
                      parent: $(this).parent()[0],
                      callback: function() {
                        let params = that.box.params[i]
                        if(params && (params.top != d.y || params.left != d.x) ) {
                          params.top = d.y
                          params.left = d.x
                          that.box.params.splice(i, 1, params)
                        }
                      }
                    })

                    that.setDesign(that.box, i, that.wordEle)
                  }

          })
        }
      }
    },
    methods: {
            // 设置缩放比例
      changeScale(item, i) {
        let v = parseFloat(item.scaleNo)
        v = isNaN(v) ? 100 : v

        v = v / 100

        let ele =  this.wordEle.eq(i).find('img'),
          w = parseFloat(ele.data('width')),
          h = parseFloat(ele.data('height'))


        if(isNaN(w) || isNaN(h)) return

        item.width = w * v
        item.height = h * v

        this.box.params.splice(i, 1, item)
      },
      // 取消裁剪
      cancelCropper(item, i) {
        item.url = item.lastImgUrl||'';

        this.box.params.splice(i, 1, item)
      },
      // 上传图片裁剪
      uploadCropperChange(item, i) {
        item.lastImgUrl = item.url || ''
        item.width = item.initWidth || ''
        item.height = item.initHeight || ''
        item.scaleNo = ''

        this.box.params.splice(i, 1, item)

        this.$nextTick(() => {
          setTimeout(() => {
            let ele =  this.wordEle.eq(i).find('img'),
              w = ele.width(),
              h = ele.height()

            ele.data('width', w)
            ele.data('height', h)


               item.width = w
              item.height = h


                 this.box.params.splice(i, 1, item)
          }, 200)

        })
      },
      // 选择不同的图标，更新显示
      setIconUrl(i, url, ele) {
        let p = ele.params[i]
        p.url = url
        p.width = p.initWidth || ''
        p.height = p.initHeight || ''
        p.scaleNo = ''

        ele.params.splice(i, 1, p)

        this.$nextTick(() => {
          let e =  this.wordEle.eq(i).find('img'),
            w = e.width(),
            h = e.height()
          e.data('width', w)
          e.data('height', h)

          p.width = w
         p.height = h

          ele.params.splice(i, 1, p)

        })
      },
      // 更新参数显示
      setDesign(ele, i, word) {
        let p = ele.params[i]
        if(p.type == 1 || p.type == 2) {
          let radio = p.radio, radius
          if(p.type == 2)  ele.params.splice(i, 1, p)
          if(word.eq(i).find('span').length > 1) word.eq(i).arctext('destroy')
          if(p.type == 1){
            word.eq(i).text(p.text)
          }else if(p.type == 2) {
            word.eq(i).text(p.selText)
          }

          if(radio) {
            radius = word.eq(i).width() * 180 / (Math.PI * radio)
            word.eq(i).arctext({radius: parseFloat(radius)})
          }
        }

      },
      //  获取其它模板
      getIcon(item, i, ele) {
        this.showModal = true
        this.icons.index = i
        this.icons.ele = ele

        this.$http({
          url: '/api/icons',
          method: 'get',
          success: (data) => {
            this.icons.list = data.data
          },
          error: (data) => {
            this.icons.list = []
          }


        })

      },
    },
    components: {
      'modal-box': modalBox
    }
  }
</script>

<style lang="less">
  .set-design-box {
    padding-top: 3px;
    .form-select .sel-text {
      //  height: 28px;
      border: solid 1px rgba(204, 204, 204, 1);
    }
  }
  .design-img-upload.upload {
    .img-box {
      height: 76px;
      line-height: 76px;
      img {
        height: auto;
        max-width: 76px;

      }
    }
  }
</style>
<style lang="less" scoped>
  .xz-box {
    background: rgba(229, 229, 229, 1);
    overflow: auto;
    white-space: nowrap;
    font-size: 12px;
    margin: 7px 0 3px 0;

    line-height: 18px;
    padding: 10px 2px;

    .item {
      display: inline-block;
      text-align: center;
      margin: 0 4px;
      &.active .img {
        border: solid 2px rgba(220, 182, 61, 1);
      }
      .img {
        width: 36px;
        height: 36px;
        border: solid 2px transparent;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        img {
          background: #fff;
          width: 32px;
          height: 32px;
        }
      }
    }
  }

</style>
