<!-- 商品定制 -->
<template>
  <div>
    <head-bar :back="true" title="商品订制" :menu="true"></head-bar>

    <div style="height: 37px;"></div>
    <div class="tab-bar">
      <span class="item" :class="{'active': active==1}" @click="active=1">正面</span>
      <span class="item" :class="{'active': active==2}" @click="active=2;setImgSize();">背面</span>
    </div>

    <div class="imgs section" :style="setGlobalFont()" ref="design-img-box">
      <preview-box id="front-box" :box="front" v-show="active==1"></preview-box>

      <preview-box id="back-box" :box="back" v-show="active==2"></preview-box>

      <img height="35px" :src="require('@/assets/icons/download.png')" alt="" class="download" @click="download()">
    </div>

    <div class="section design-purchase">
      <div class="sec-title flex-between">定制参数 <span class="text-primary" @click="reset()">恢复原图</span></div>

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


    <div class="modal-download" v-show="showDownload">
      <div class="modal-body">
        <div class="modal-title"><img @click="showDownload=false" :src="require('@/assets/icons/icon_guanbi.png')" height="20px" alt=""></div>
        <img :src="downloadUrl" alt="">
        <p>长按图片保存</p>
      </div>
    </div>

  </div>
</template>

<script>
  import previewBox from './design/preview.vue'
  import setbox from './design/setbox.vue'
  import html2canvas from 'html2canvas';


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
        designid: this.$route.query.designid,
        originData: {},         // 原始数据
        downloadUrl: '',
        showDownload: false,
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
      setImgSize() {
        let that = this
        this.$nextTick(() => {
          let items = $('#back-box .item')
          items.each(function(i) {

          let img = $(this).find('img')
          if(img.length) {
            let w = img.width(), h = img.height(), v = that.back.params[i].scaleNo

            v = isNaN(v) ? 100 : v
            if(v <= 0) v = 100

            img.data('width', w * 100 / v)
            img.data('height', h * 100 / v)
          }
        })
        })

      },
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
                    console.log('designid')
              let d = JSON.parse(sessionStorage.getItem(this.designid) || "{}")
              let dict = d.dict
              for(let k in data.data.dict) {
                data.data.dict[k].activeText = dict[k]
              }
              d.dict = data.data.dict
              this.detail = d
              this.dataFormat(data.data.purchase || {})
            }else {
                    console.log('nodesignid')
              data.data.num = data.data.num || 1
              this.detail = {
                "id":"5",
                "title":"\u5546\u54c1\u540d\u79f0\u4e94",
                "imgs":["\/uploads\/goods\/7c5ad7ad9a6cff190b7410cb2df3e81f.jpg","\/uploads\/goods\/0830af6fcba0f9d540ef799e55e1e94c.jpg"],
                "tag":[
                  {"name":"\u70ed\u9500","value":"#ccc"},
                  {"name":"\u7279\u5356","value":"#666"},
                  {"name":"\u7cbe\u54c1","value":"#ff0000"}
                ],
                "process":"< img src=\"\/uploads\/goods_content\/b1385f93ad9a6d0136a446ee19475580.png\" alt=\"\" \/><br \/>",
                "rules":"< img src=\"\/uploads\/goods_content\/d9d9587e848b1c486a8e2dbb56d49ff6.png\" alt=\"\" \/>",
                "detail":"< img src=\"\/uploads\/goods_content\/d3.jpg\" alt=\"\" \/>",
                "dict":[{"title":"\u6210\u8272","text":"PT950"},{"title":"\u91cd\u91cf","text":"30G"},{"title":"\u89c4\u683c","text":"10*15MM"}],
                "purchase":{
                  "fontColor":"#FF3311",
                  "fontFamily":"Arial",
                  "front": {
                    "backgroundImg":"./static/img/t2.jpg",
                    "params":[
                      {"type":1,"title":"1213325","rotate":"30","enable":false,"top":0,"left":0,"text":"10","fontsize":20,"radio":"40"},
                      {"type":4,"title":"\u5b9d\u5b9d\u751f\u8096","rotate":"6","enable":true,"top":87,"left":394,"width":32,"height":32,"iconsid":"2",
                        "url":"\/uploads\/icons\/4e0d626285b3875ae7f78e7509704c40.png",
                        "iconlist":[
                          {"url":"\/uploads\/icons\/4e0d626285b3875ae7f78e7509704c40.png","text":"\u767d\u7f8a\u5ea7","id":"2"},
                          {"url":"\/uploads\/icons\/1042228aa810fedd4268fae933360e24.png","text":"\u91d1\u725b\u5ea7","id":"1"},
                          {"url":"\/uploads\/icons\/7440a632a3703b76456e7fbe32d3d157.png","text":"\u53cc\u5b50\u5ea7","id":"3"}
                        ]
                      },
                      {"type":3,"title":"\u5b9d\u5b9d\u7167\u7247","rotate":"7","enable":true,"top":12,"left":569,"width":180,"height":40,
                        "url":"./static/img/t3.jpg","istext":true},
                      {"type":2,"title":"\u51fa\u751f\u65f6\u95f4","rotate":"45","enable":true,"top":210,"left":48,"text":"AM,PM","fontsize":25,"radio":"35"},
                      {"type":1,"title":"\u5b9d\u5b9d\u59d3\u540d","rotate":"10","enable":true,"top":195,"left":609,"text":"\u738b\u5c0f\u6d77","fontsize":20,"radio":"0"}
                    ],
                    "scale":1
                  },
                  "back":{
                    "backgroundImg":"./static/img/t1.png",
                    "params":[
                      {"type":1,"title":"\u795d\u798f\u8bed\u5f55","rotate":"20","enable":true,"top":172,"left":654,"text":"\u5065\u5eb7","fontsize":30,"radio":"10"},
                      {"type":3,"title":"\u5b9d\u5b9d\u56fe\u7247","rotate":"","enable":true,"top":136,"left":14,"width":"","height":"","url":"./static/img/t3.jpg","istext":false}
                    ],
                    "scale":1
                  }
                }
                /*purchase: {   // 定制参数
                 fontColor: 'red',
                 fontFamily: '微软雅黑',
                 front: {
                 //   backgroundImg: './static/img/goods.png',
                 backgroundImg: './static/img/ad3.jpg',
                 scale: 1,
                 params: [
                 {enable: true, height: 40, width:180, istext:false, left: 567.233, radio: '', rotate: '7', title: '位置测试', url: './static/img/logo.jpg', top: 12.1808, type: 3},
                 /!* {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '健康', title: '祝福祝福', top: 92, type: 1},
                 {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '活泼', title: '祝福祝福', top: 92, type: 1},
                 {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '', title: '祝福祝福', top: 92, type: 1},
                 {enable: true, fontsize: '', left: 150, radio: '', rotate: '', title: '宝宝照片', top: 92, istext: false, type: 3}*!/
                 ]
                 },
                 back: {
                 // backgroundImg: './static/img/goods.png',
                 backgroundImg: './static/img/ad2.png',
                 //  scale: 0.7967914438502673,
                 scale: 1,
                 params: [
                 {enable: true, fontsize: '20', left: 661.68, radio: '', rotate: '30', text: "健康", title: "位置测试", top: 177.34, type: 1},
                 //     {enable: false, fontsize: '24', left: 221, radio: '40', rotate: '50', text: '50CM', title: '宝宝身高', top: 128, type: 1},
                 //    {enable: true, fontsize: '30', left: 106.67959050484066, radio: '', rotate: '', text: '张北海', title: '宝宝姓名', top: 129.26845637583892, type: 1},
                 //  {enable: true, fontsize: '24', left: 92, radio: '50', rotate: '180', text: '2018.07.14', title: '出生日期', top: 305, type: 1},
                 // {enable: true, fontsize: '24', left: 44, radio: '', rotate: '', text: 'AM,PM', title: '上午下午', top: 210, type: 2},
                 //  {enable: true, left: 100, rotate: '', istext: true, text: '', title: '出生时间', top: 150, type: 3},
                 //  {enable: true, fontsize: '24', left: 23, radio: '70', rotate: '-50', text: '3700g', title: '宝宝重量', top: 120, type: 1},
                 /!*    {enable: true, left: 150, rotate: '30', title: '宝宝星座', top: 92, type: 4,
                 width: 100,
                 height: 100,
                 url: '',
                 iconsid: 1,
                 iconlist: [
                 {id: 1, text: '白羊座', url: "http://pic33.photophoto.cn/20141022/0019032438899352_b.jpg",},
                 {id: 1, text: '白羊座', url: "./static/img/xz/baiyang.png",},
                 {id: 2, text: '金牛座', url: "./static/img/xz/jinniu.png",},
                 {id: 3, text: '双子座', url: "./static/img/xz/shuangzi.png",},
                 {id: 4, text: '巨蟹座', url: "./static/img/xz/jujie.png",},
                 {id: 5, text: '狮子座', url: "./static/img/xz/shizi.png",},
                 {id: 6, text: '处女座', url: "./static/img/xz/chunv.png",},
                 ]
                 }*!/
                 ]
                 }
                 },
                 dict: [
                 {title: '成色', text: 'Ag999,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金'},
                 {title:  '重量', text: '20g,30g'},
                 {title: '规格', text: '20*23.8mm,20*10.4mm'}
                 ]*/
              }
              this.dataFormat()
            }

          },
          error: (data) => {
            this.loading.hide()
          }
        })

      },
      // 处理异步获取的数据  hasOrigin:是否存储过原始数据
      dataFormat(origin) {
        let that = this,
          purchase = this.detail.purchase || {},
          front = purchase.front || {},
          back = purchase.back || {},
          frontFormat = {backgroundImg : front.backgroundImg || '', params: front.params || [], scale: front.scale || 1},
          backFormat = {backgroundImg: back.backgroundImg || '', params: back.params || [], scale: front.scale || 1},
          dict = this.detail.dict || []

        this.purchase = purchase
        if(!origin) this.originData.purchase = this.deepClone(this.purchase)

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
          if(!origin) this.originData.front = this.deepClone(this.front)

          that.$nextTick(() => {that.wordFront = $('#front-box .item')})
        })
        paramsFormat(backFormat, (data) => {
          this.back = data
          if(!origin) this.originData.back = this.deepClone(this.back)

          that.$nextTick(() => {that.wordBack = $('#back-box .item')})
        })

        if(origin) {  // 刷新页面或返回页面是恢复原图的数据
          let front = origin.front || {},
            back = origin.back || {},
            f = {backgroundImg : front.backgroundImg || '', params: front.params || [], scale: front.scale || 1},
            b = {backgroundImg: back.backgroundImg || '', params: back.params || [], scale: front.scale || 1}

          this.originData.purchase = origin || {}
          paramsFormat(f, (data) => {this.originData.front = this.deepClone(data)})
          paramsFormat(b, (data) => {this.originData.back = this.deepClone(data)})
        }

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
                console.log('scale:'+(width / w))
          let hasBackImg = width && height && w && h,
            scale = width / w,
            arr = data.params.map(item => {
              if(hasBackImg) {
                item.top = item.top * height / h
                item.left = item.left * width / w

                console.log(item.title, item.top)
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
      deepClone(originData) {  // 克隆对象
        let result = {}
        for(let k in originData) {
          if(k == 'params') {
            result.params = []
            for(let m in originData.params) {
              let p = {}
              for(let n in originData.params[m]) {
                p[n] = originData.params[m][n]
              }
              result.params.push(p)
            }
          }else {
            result[k] = originData[k]
          }
        }

        return result

      },
      reset() {  // 恢复原图
        this.front = {}
        this.back = {}
        this.$nextTick(() => {
          this.front = this.deepClone(this.originData.front)
          this.back = this.deepClone(this.originData.back)
          this.purchase = this.deepClone(this.originData.purchase)

          this.$nextTick(() => {
            this.wordFront = $('#front-box .item')
            this.wordBack = $('#back-box .item')
          })

        })

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
        let that = this
        this.loading.show()
        html2canvas(this.active==1 ? $('#front-box').get(0) : $('#back-box').get(0)).then(function(canvas) {
         // console.log(canvas.toBlob())

          that.downloadUrl = canvas.toDataURL()

          console.log(typeof that.downloadUrl)


        //  console.log(that.downloadUrl)
          that.showDownload = true
          that.loading.hide()
        }).catch(err => {
          that.loading.hide()
        })
      },

      save(callback) {
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
        callback ? callback(data) : ''
      },
      // 提交订单
      confirm() {
        this.loading.show()
        this.save((data) => {
          let that = this
          data.purchase.frontavatar = ''
          data.purchase.backavatar = ''

          let str = {
            1: {el: $('#front-box').get(0), key: 'frontavatar'},
            2: {el: $('#back-box').get(0), key: 'backavatar'},
          }

          html2canvas(str[that.active].el).then(function(canvas1) {
            data.purchase[str[that.active].key] = canvas1.toDataURL()
            that.active = that.active == 1 ? 2 : 1

            that.$nextTick(() => {
              html2canvas(str[that.active].el).then(function(canvas2) {
                data.purchase[str[that.active].key] = canvas2.toDataURL()
                that.loading.hide()
                sessionStorage.setItem(that.designid, JSON.stringify(data))
                that.$router.push({name: "orderdetail", query: {type: 0, designid: that.designid}})
              }).catch(err => {
                that.loading.hide()
                sessionStorage.setItem(that.designid, JSON.stringify(data))
                that.$router.push({name: "orderdetail", query: {type: 0, designid: that.designid}})
              })
            })

          }).catch(err => {
            that.loading.hide()
            sessionStorage.setItem(that.designid, JSON.stringify(data))
            that.$router.push({name: "orderdetail", query: {type: 0, designid: that.designid}})
          })
        })
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
  //  height: 2.15rem;
    height: 3rem;
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

  .modal-download {
    position: fixed;
    top:0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 200;
    color: #000;
    .modal-title {
      text-align:right;
      line-height: 30px;
    }
    .modal-body {
      position: absolute;
      background: #fff;
      top: 50%;
      left:0;
      transform: translateY(-50%);
      max-height: 75%;
      width: 100%;
      padding: 10px;
      text-align: center;
    }
    img {
      max-width: 100%;
      max-height: 60%;
    }

  }
</style>
