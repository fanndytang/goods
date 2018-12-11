<!-- 商品定制 -->
<template>
  <div>
    <head-bar :back="true" title="商品订制" :menu="true"></head-bar>

    <div style="height: 37px;"></div>
    <div class="tab-bar">
      <span class="item" :class="{'active': active==1}" @click="active=1">正面</span>
      <span class="item" :class="{'active': active==2}" @click="active=2">背面</span>
    </div>

    <div class="imgs section" :style="setGlobalFont()" ref="design-img-box">
      <preview-box id="front-box" :box="front" v-show="active==1"></preview-box>

      <preview-box id="back-box" :box="back" v-show="active==2"></preview-box>

      <img height="35px" :src="require('@/assets/icons/download.png')" alt="" class="download" @click="download()">
    </div>

    <div class="section design-purchase">
      <div class="sec-title">定制参数</div>

      <set-box v-show="active == 1" :box="front" :word-ele="wordFront"></set-box>

      <set-box v-show="active == 2" :box="back" :word-ele="wordBack"></set-box>

      <div class="list-item">
        <div class="label">定制字体：</div>
        <form-select style="width: 65vw;" :list="fontList" v-model="purchase.fontFamily"></form-select>
      </div>
      <div class="list-item">
        <div class="label">定制备注：</div>
        <textarea v-model="purchase.remark" class="textarea" cols="30" rows="4" placeholder="请备注想说的话"></textarea>
      </div>

    </div>

    <div class="section design-dict">
      <div class="sec-title">商品参数</div>
      <div class="list-item" v-for="item,i in dict" :key="i">
        <div class="label">{{item.title}}：</div>

        <div class="flex-xcenter" style="flex-wrap: wrap;">
          <div class="tag-list" v-for="el,k in item.list" :key="k">
          <span :class="{'active': item.activeIndex == k}" class="item"
                @click="item.activeIndex = k;dict.splice(i,1,item);"
                style="white-space: nowrap;">{{el}}</span>
          </div>
        </div>
      </div>
      <div class="list-item">
        <div class="label">数量：</div>
        <div class="flex-center">
          <form-number v-model="detail.num" style="margin-left:5px;"></form-number>
        </div>
      </div>

    </div>

    <modal-login :callback="confirm">
      <button class="btn btn-red btn-block" type="button">提交订单</button>
    </modal-login>
    <div style="height:.45rem;"></div>

  </div>
</template>

<script>
  import previewBox from './design/preview.vue'
  import setbox from './design/setbox.vue'

  export default {
    data () {
      return {
        active: 1,
        loading: new this.Loading(),
        fontList: [                                  // 字体列表
          {id: '微软雅黑', name: '微软雅黑'},
          {id: '宋体', name: '宋体'},
          {id: '宋体1', name: '宋体1'},
          {id: '宋体2', name: '宋体2'},
          {id: '宋体3', name: '宋体3'},
          {id: '宋体4', name: '宋体4'},
          {id: '宋体5', name: '宋体5'},
          {id: '宋体6', name: '宋体6'},
        ],
        purchase: {},                              // 其他一些公共定制参数
        front: {backgroundImg: '', params: [], scale: 1},    // 定制参数正面
        back: {backgroundImg: '', params: [], scale: 1},     //  定制参数背面
        detail: {},                                //  详情数据
        wordFront: {},
        wordBack: {},
        dict: [],                                 //  商品参数
        designid: this.$route.query.designid
      }
    },
    watch: {
      front: {
        handler() {
          this.save()
        },
        deep: true
      },
      back: {
        handler() {
          this.save()
        },
        deep: true
      },
      dict: {
        handler() {
          this.save()
        },
        deep: true
      },
      'purchase.fontFamily' () {
        this.save()
      },
      'purchase.remark' () {
        this.save()
      },
      'detail.num' () {
        this.save()
      }
    },
    mounted () {
      this.getDetail()
    },
    methods: {
      //  获取页面初始数据
      getDetail() {
        let id = this.$route.query.id
        this.loading.show()

        this.$http({
          url: '/api/design/detail',
          method: 'get',
          data: {
            id: id
          },
          success: (data) => {
            this.loading.hide()

            if(sessionStorage.getItem(this.designid)) {
              let d = JSON.parse(sessionStorage.getItem(this.designid) || "{}")
              let dict = d.dict
              for(let k in data.data.dict) {
                data.data.dict[k].activeText = dict[k]
              }
              d.dict = data.data.dict
              this.detail = d

            }else {
              data.data.num = data.data.num || 1
              this.detail = data.data
            }
            this.dataFormat()
          },
          error: (data) => {
            this.loading.hide()
          }
        })

      },
      // 处理异步获取的数据
      dataFormat() {
        let that = this,
          purchase = this.detail.purchase || {},
          front = purchase.front || {},
          back = purchase.back || {},
          frontFormat = {backgroundImg : front.backgroundImg || '', params: front.params || [], scale: front.scale || 1},
          backFormat = {backgroundImg: back.backgroundImg || '', params: back.params || [], scale: front.scale || 1},
          dict = this.detail.dict || []

        this.purchase = purchase

        //  商品参数格式化
        this.dict = dict.map(item => {
          item.list = (item.text || '').toString().replace(/，/g, ',').split(',')   // 替换中文的逗号
          if(item.activeText) {
            for(let i in item.list) {
              if(item.list[i] == item.activeText) {
                item.activeIndex = i
                break;
              }
            }
          }
          item.activeIndex = item.activeIndex || -1
          return item
        })


        //  定制参数格式化
        paramsFormat(frontFormat, (data) => {
          this.front = data
          that.$nextTick(() => {that.wordFront = $('#front-box .item')})
        })
        paramsFormat(backFormat, (data) => {
          this.back = data
          that.$nextTick(() => {that.wordBack = $('#back-box .item')})
        })

        function paramsFormat(data, callback) {
          let backUrl = data.backgroundImg
          if(backUrl) {  //  计算定制参数背景图实际大小，得出内部元素对应的top, left相对值
            let image = new Image()
            image.onload = function() {
              let w = image.width, h = image.height,
                box = that.$refs['design-img-box'],
                height = box.clientHeight - 28, width = w * height / h

              if(width > (box.clientWidth)) {
                width = box.clientWidth
                height = width * h /w
              }

              callback(elFormat(data, width, height, w, h))
            }
            image.src =  backUrl
          }else {
            callback(elFormat(data))
          }
        }

        function elFormat(data, width, height, w, h) {
          let hasBackImg = width && height && w && h,
            scale = width / w,
            arr = data.params.map(item => {
              if(hasBackImg) {
                item.top = item.top * height / h
                item.left = item.left * width / w
              }

              data.web_height = height
              data.web_width = width
              data.natural_height = h
              data.natural_width = w

              if(item.type == 2) {   //  设置下拉选框列表
                let arr = (item.text || '').toString().replace(/，/g, ',').split(',')   // 替换中文的逗号
                item.selText = arr[0] || ''
                item.selList = arr.map(el => {return {id: el, name: el}})
              }

              if(item.type == 3) {
                item.lastImgUrl = item.url || ''
              }

              //  判断缩放比
              if(item.type == 1 || item.type == 2) {
                if(item.fontsize) {
                  item.fontsize = parseInt(item.fontsize) * scale / data.scale
                }
              }else if(item.type == 3 || item.type == 4) {
                if(item.width) {
                  item.width = parseInt(item.width) * scale / data.scale
                }
                item.initWidth = item.width || ''

                if(item.height) {
                  item.height = parseInt(item.height) * scale / data.scale
                }
                item.initHeight = item.height || ''
              }


              return item
            })

          data.params = arr

          return data
        }
      },
      // 设置字体和颜色
      setGlobalFont() {
        let sty = ''
        if(this.purchase.fontColor) sty += 'color:'+this.purchase.fontColor+';'
        if(this.purchase.fontFamily) sty += 'font-family:'+this.purchase.fontFamily+';'
        return sty
      },
      // 获取实际定制参数
      getPurchaseResult(data) {
        let d = []
        if(data.params) {
          d = data.params.map(item => {
            let r = {}
            for(let k in item) {
              if(k !== 'selList') {
                r[k] = item[k]
              }

            }
            r.top = data.natural_height * item.top / data.web_height
            r.left = data.natural_width * item.left / data.web_width

            if(r.fontsize) {
              r.fontsize = data.natural_height * parseFloat(item.fontsize) / data.web_height
            }

            if(r.width) {
              r.width = data.natural_height * parseFloat(item.width) / data.web_height
            }

            if(r.height) {
              r.height = data.natural_height * parseFloat(item.height) / data.web_height
            }

            return r
          })
        }

        return {
          fontFamily: this.purchase.fontFamily,
          fontColor: this.purchase.fontColor,
          backgroundImg: data.backgroundImg,
          params: d
        }

      },

      // 下载图片
      download() {
        let d = this.active == 1 ? this.front : this.back

        this.loading.show('正在请求')
        this.$http({
          url: '/api/download',
          method: 'post',
          data: this.getPurchaseResult(d),
          success: (data) => {
            // 下载图片
            this.loading.hide()
          },
          error: (data) => {
            this.loading.hide()
          }

        })
      },

      save() {
        let dict = []

        for(let k in this.dict) {
          let item = this.dict[k]
          dict.push(item.list[item.activeIndex] || '')
        }

        let data = {
          id: this.$route.query.id,
          purchase: {
            front: this.getPurchaseResult(this.front),
            back: this.getPurchaseResult(this.back),
            fontFamily: this.purchase.fontFamily,
            fontColor: this.purchase.fontColor,
            remark: this.purchase.remark,
          },
          title: this.detail.title || this.$route.query.title,
          dict: dict,
          imgUrl: this.detail.imgUrl || this.$route.query.imgUrl,
          num: this.detail.num
        }

        sessionStorage.setItem(this.designid, JSON.stringify(data))
      },
      // 提交订单
      confirm() {
        this.save()
        this.$router.push({name: "orderdetail", query: {type: 0, designid: this.designid}})
      }
    },
    components: {
      'preview-box': previewBox,
      'set-box': setbox
    }
  }
</script>

<style lang="less">
  .design-purchase, .design-dict {
    .list-item {
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      line-height: 28px;
      color: #0c0c0c;
      .label {
        margin-right: 34px;
        color: #c2c2c2;
        white-space: nowrap;
        min-width: 60px;
        .other-modal {
          color: #6ca4b6;
          font-size: 12px;
          text-align: center;
          line-height: 18px;
        }
      }
      input[type="text"] {
        // border: none;
        border: 1px solid #eaeaea;
        -webkit-appearance: none;
      }
      textarea {
        padding: 5px;
        border: none;
      }
    }

    .form-select .sel-text {
      margin-top: 2px;
    }
  }
</style>

<style lang="less" scoped>
  .section {
    border-top: 10px solid #eaeaea;
    padding: 0 17px;
    &.design-purchase {
      padding-bottom: 10px;
    }
  }

  .sec-title {
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid rgba(230, 230, 230, 1);
    color: #333;
    font-weight: normal;
  }

  .design-dict {
    margin-bottom: 115px;
    .sec-title {
      margin-bottom: 5px;
    }
    .list-item {
      .label {
        min-width: 42px;
        margin-right: 7px;
        color: #ccc;
      }
    }
  }

  .tag-list {
    .item {
      color: #0c0c0c;
      font-size: 14px;
      background: #e5e5e5;
      display: inline-block;
      margin: 7px 5px;
      padding: 0 7px;
      line-height: 22px;
      border-radius: 4px;
      border: 1px solid transparent;

      &.active {
        color: #dcb63d;
        border-color: #dcb63d;
        background: #edda9e;
      }
    }
  }

  .tab-bar {
    position: fixed;
    top: .5rem;
    left: 0;
    z-index: 8;
    background: #fff;
    width: 100%;
    padding-top: 5px;
    line-height: 30px;
    display: flex;
    text-align: center;
    color: #000;
    font-size: 15px;
    .item {
      flex: 1;
      border-bottom: 2px solid transparent;
      &.active {
        color: #cc6666;
        border-color: rgba(204, 102, 102, 1);
      }
    }
  }

  .imgs {
    position: relative;
    text-align: center;
    padding: 14px 0;
    height: 2.15rem;
    .download {
      position: absolute;
      right: 20px;
      bottom: 13px;
    }
  }

  .btn-red {
    width: 100vw;
    height: .45rem;
    font-size: 16px;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 10;
  }
</style>
