<!-- 商品定制 -->
<template>
  <div class="design-list-box">
    <head-bar :back="true" title="商品订制" :menu="true"></head-bar>

    <div class="tab-bar">
      <span class="item" :class="{'active': active==1}" @click="active=1">正面</span>
      <span class="item" :class="{'active': active==2}" @click="active=2">背面</span>
    </div>

    <div class="imgs section" :style="setGlobalFont()" ref="design-img-box">
      <preview-box id="front-box" :box="front" v-show="active==1"></preview-box>

      <preview-box id="back-box" :box="back" v-show="active==2"></preview-box>

      <img height="35px" :src="require('@/assets/icons/download.png')" alt="" class="download" @click="download()">
    </div>

    <div class="section purchase">
      <div class="sec-title">定制参数</div>

      <set-box v-show="active == 1" :box="front" :word-ele="wordFront"></set-box>

      <set-box v-show="active == 2" :box="back" :word-ele="wordBack"></set-box>

      <div class="list-item">
        <div class="label">定制字体</div>
        <form-select style="width: 65vw;" :list="fontList" v-model="purchase.fontFamily"></form-select>
      </div>
      <div class="list-item">
        <div class="label">定制备注</div>
        <textarea v-model="purchase.remark" class="textarea" cols="30" rows="3" placeholder="请备注想说的话"></textarea>
      </div>
    </div>

    <div class="section dict">
      <div class="sec-title">商品参数</div>
      <div class="list-item" v-for="item,i in dict" :key="i">
        <div class="label">{{item.title}}</div>

        <div class="flex-xcenter" style="flex-wrap: wrap;">
          <div class="tag" v-for="el,k in item.list" :key="k">
          <span :class="{'active': item.activeIndex == k}" class="item"
                @click="item.activeIndex = k;dict.splice(i,1,item);"
                style="white-space: nowrap;">{{el}}</span>
          </div>
        </div>
      </div>

    </div>

    <button class="btn btn-red btn-block" type="button" @click="confirm()">提交订单</button>

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
          {id: '宋体', name: '宋体'},
          {id: '微软雅黑', name: '微软雅黑'}
        ],
        purchase: {},                              // 其他一些公共定制参数
        front: {backgroundImg: '', params: [], scale: 1},    // 定制参数正面
        back: {backgroundImg: '', params: [], scale: 1},     //  定制参数背面
        detail: {},                                //  详情数据
        wordFront: {},
        wordBack: {},
        dict: [],                                 //  商品参数
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

        this.$http.get('/api/good/purchase', {
          params: {
            id: id
          }
        }).then(res => {
          this.loading.hide()
          // todo ...
          this.detail = {}

          this.dataFormat()
        }).catch(err => {
          this.loading.hide()
        })


        // 测试数据
        setTimeout(() => {
          this.detail = {
            purchase: {   // 定制参数
              fontColor: 'blue',
              fontFamily: 'A',
              back: {
                backgroundImg: '../../../static/img/g1.png',
                scale: 1,
                params: [
                  {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '平安', title: '祝福祝福', top: 92, type: 1},
                  {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '健康', title: '祝福祝福', top: 92, type: 1},
                  {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '活泼', title: '祝福祝福', top: 92, type: 1},
                  {enable: true, fontsize: '', left: 150, radio: '', rotate: '', text: '', title: '祝福祝福', top: 92, type: 1},
                  {enable: true, fontsize: '', left: 150, radio: '', rotate: '', title: '宝宝照片', top: 92, istext: false, type: 3}
                ]
              },
              front: {
                backgroundImg: '../../../static/img/goods.png',
                scale: 0.7967914438502673,
                params: [
                  {enable: true, fontsize: '24px', left: 221, radio: '40', rotate: '50', text: '50CM', title: '宝宝身高', top: 128, type: 1},
                  {enable: true, fontsize: '30px', left: 106.67959050484066, radio: '', rotate: '', text: '张北海', title: '宝宝姓名', top: 129.26845637583892, type: 1},
                  {enable: true, fontsize: '24px', left: 92, radio: '50', rotate: '180', text: '2018.07.14', title: '出生日期', top: 305, type: 1},
                  {enable: true, fontsize: '24px', left: 44, radio: '', rotate: '', text: 'AM,PM', title: '上午下午', top: 210, type: 2},
                  {enable: true, left: 100, rotate: '', istext: true, text: '', title: '出生时间', top: 150, type: 3},
                  {enable: true, fontsize: '24px', left: 23, radio: '70', rotate: '-50', text: '3700g', title: '宝宝重量', top: 120, type: 1},
                  {enable: true, left: 150, rotate: '30', title: '宝宝星座', top: 92, type: 4,
                    url: '',
                    iconsid: 1,
                    iconlist: [
                      {id: 1, text: '白羊座', url: "../../../static/img/xz/baiyang.png",},
                      {id: 2, text: '金牛座', url: "../../../static/img/xz/jinniu.png",},
                      {id: 3, text: '双子座', url: "../../../static/img/xz/shuangzi.png",},
                      {id: 4, text: '巨蟹座', url: "../../../static/img/xz/jujie.png",},
                      {id: 5, text: '狮子座', url: "../../../static/img/xz/shizi.png",},
                      {id: 6, text: '处女座', url: "../../../static/img/xz/chunv.png",},
                    ]
                  }
                ]
              }
            },
            dict: [
              {title: '成色', text: 'Ag999,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金,银镀金'},
              {title:  '重量', text: '20g,30g'},
              {title: '规格', text: '20*23.8mm,20*10.4mm'}
            ]
          }

          this.dataFormat()
        }, 50)
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
          item.activeIndex = -1
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

              if(item.type == 2) {   //  设置下拉选框列表
                let arr = (item.text || '').toString().replace(/，/g, ',').split(',')   // 替换中文的逗号
                item.selText = arr[0] || ''
                item.selList = arr.map(el => {return {id: el, name: el}})
              }

              //  判断缩放比
              if(item.type == 1 || item.type == 2) {
                if(item.fontsize) {
                  item.fontsize = parseInt(item.fontsize) * scale / data.scale + 'px'
                }
              }else if(item.type == 3 || item.type == 4) {
                if(item.width) {
                  item.width = parseInt(item.width) * scale / data.scale + 'px'
                }

                if(item.height) {
                  item.height = parseInt(item.height) * scale / data.scale + 'px'
                }
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
        if(this.purchase.fontFamily) sty += 'color:'+this.purchase.fontFamily+';'
        return sty
      },
      // 下载图片
      download() {
        let data = this.active == 1 ? this.front : this.back

        console.log(data)
      },
      // 提交订单
      confirm() {
        this.loading.show()

        let dict = []

        for(let k in this.dict) {
          let item = this.dict[k]
          dict.push(item.list[item.activeIndex] || '')

        }

        let data = {
          id: this.$route.query.id,
          front: this.front,
          back: this.back,
          fontFamily: this.purchase.fontFamily,
          remark: this.purchase.remark,
          dict: dict
        }

        this.$http.post('/api/goods/order',data).then(res => {
          this.loading.hide()
          this.$router.push({name: "orderdetail", query: {type: 0, orderid: '214321125'}})
        }).catch(err => {
          this.loading.hide()
        })

        //  测试数据
        setTimeout(() => {
          this.$router.push({name: "orderdetail", query: {type: 0, orderid: '214321125'}})
        }, 50)
      }
    },
    components: {
      'preview-box': previewBox,
      'set-box': setbox
    }
  }
</script>

<style lang="less" scoped>
  .tab-bar {
    line-height: .25rem;
    display: flex;
    text-align: center;
    color: #000;
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
    img {
      max-width: 100%;
      max-height: 100%;
    }
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
  }
</style>
