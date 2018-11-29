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
      <!--<div class="design-box front" v-show="active == 1">
        <img :src="front.backgroundImg" alt="">
        <div class="item" v-for="item,i in front.params" :key="i" :style="(item.fontsize?'font-size:'+item.fontsize+';':'')+'top:'+item.top+'px;left:'+item.left+'px;transform:rotate('+(item.rotate||'0')+'deg);'+item.style">
          <span v-if="item.type == 1">{{item.text}}</span>
          <span v-if="item.type == 2">{{item.selText}}</span>
          <span v-if="item.type == 3">
            <img :src="item.url" :style="`width:${item.width};height:${item.height};`" alt="">
          </span>
          <span v-if="item.type == 4">
            <img :src="item.url" alt="">
          </span>
        </div>

      </div>-->

      <div class="design-box back" v-show="active == 2">
        <img :src="back.backgroundImg" alt="">
        <div class="item" v-for="item,i in back.params" :key="i" :style="(item.fontsize?'font-size:'+item.fontsize+';':'')+'top:'+item.top+'px;left:'+item.left+'px;transform:rotate('+(item.rotate||'0')+'deg);'+item.style">
          <span v-if="item.type == 1">{{item.text}}</span>
          <span v-if="item.type == 2">{{item.selText}}</span>
          <span v-if="item.type == 3">
            <img :src="item.url" :style="`width:${item.width};height:${item.height};`" alt="">
          </span>
          <span v-if="item.type == 4">
            <img :src="item.url" alt="">
          </span>
        </div>


      </div>

      <img height="35px" :src="require('@/assets/icons/download.png')" alt="" class="download">
    </div>

    <div class="section purchase">
      <div class="sec-title">定制参数</div>

      <div v-show="active == 1">
      <!--  <set-box :box="front"></set-box>-->
      <!--  <div class="list-item" v-for="item,i in front.params" :key="i">
          <div class="label">
            {{item.title}}
            <div class="other-modal" v-if="item.type == 4" @click="getIcon(item, i, front)">其它模板</div>
          </div>
          <div style="flex: 1;">
            <input v-if="item.type == 1" type="text" v-model="item.text" @change="setDesign(front, i, wordFront)" placeholder="请输入">

            <form-select v-if="item.type == 2" :list="item.selList" v-model="item.selText" @change="setDesign(front, i, wordFront)" style="display:inline-block;"></form-select>

            <input v-if="item.type == 3 && item.istext" type="text" placeholder="请输入">
            <upload-img-1 v-if="item.type==3 && !item.istext" :url.sync="item.url"></upload-img-1>

            <div v-if="item.type == 4 && item.iconlist" class="xz-box" style="width:100%;">
              <div class="item" v-for="el,k in item.iconlist" :key="k" :class="{'active': item.url == el.url}">
                <div class="img" @click="setIconUrl(i, el.url, front)"><img :src="el.url" alt=""></div>
                {{el.text}}
            </div>
            </div>
          </div>

          <input type="text" placeholder="旋转角度" v-model="item.rotate" style="width: 30px;">


        </div>-->
      </div>

      <div v-show="active == 2">
        <div class="list-item" v-for="item,i in back.params" :key="i">
          <div class="label">
            {{item.title}}
            <div class="other-modal" v-if="item.type == 4" @click="getIcon(item, i, back)">其它模板</div>
          </div>
          <div style="flex: 1;">
            <input v-if="item.type == 1" type="text" v-model="item.text" @change="setDesign(back, i, wordBack)" placeholder="请输入">

            <form-select v-if="item.type == 2" :list="item.selList" v-model="item.selText" @change="setDesign(back, i, wordBack)" style="display:inline-block;"></form-select>

            <input v-if="item.type == 3 && item.istext" type="text" placeholder="请输入">
            <upload-img-1 v-if="item.type==3 && !item.istext" :url.sync="item.url"></upload-img-1>

            <div v-if="item.type == 4 && item.iconlist" class="xz-box">

              <div class="item" v-for="el,k in item.iconlist" :key="k" :class="{'active': item.url == el.url}">
                <div class="img" @click="setIconUrl(i, el.url, back)"><img :src="el.url" alt=""></div>
                {{el.text}}
            </div>
            </div>
          </div>

          <input type="text" placeholder="旋转角度" v-model="item.rotate" style="width: 30px;">


        </div>

      </div>


      <div class="list-item">
        <div class="label">定制字体</div>
        <form-select style="width: 65vw;" :list="fontList"></form-select>
      </div>
      <div class="list-item">
        <div class="label">定制备注</div>
        <textarea class="textarea" cols="30" rows="3" placeholder="请备注想说的话"></textarea>
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

    <div class="modal-box" v-show="showModal">
      <div class="modal-body">
        <div class="title">选择图标<img @click="showModal = false" class="close" height="20px" :src="require('@/assets/icons/icon_guanbi.png')" alt=""></div>
        <div class="item" v-for="item,i in icons.list" :key="i">
          <div class="item-tit">{{item.title}}<img height="22px" :src="require('@/assets/icons/icon_xia1.png')" alt=""></div>
          <div class="content">
            <div class="item" v-for="el,k in item.list" :key="k" :class="{'active': icons.ele.params[icons.index].url == el.url}">
              <div class="img" @click="setIconUrl(icons.index, el.url, icons.ele)"><img :src="el.url" alt=""></div>{{el.text}}
            </div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  import previewBox from './design/preview.vue'
  //import setbox from './design/setbox.vue'

  export default {
    data () {
      return {
        active: 1,
        loading: new this.Loading(),
        showModal: false,                            //  其它模板显示隐藏
        fontList: [                                  // 字体列表
          {id: '宋体', name: '宋体'},
          {id: '微软雅黑', name: '微软雅黑'}
        ],
        icons: {                                     // 其它模板列表
          index: '',                            // 当前数据所属的定制参数索引值
          ele: {params: []},                              // 当前数据所属的定制正面或背面
          list: []
        },
        purchase: {},                              // 其他一些公共定制参数
        front: {backgroundImg: '', params: [], scale: 1},    // 定制参数正面
        back: {backgroundImg: '', params: [], scale: 1},     //  定制参数背面
        detail: {},                                //  详情数据
        wordFront: '',
        wordBack: '',
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
                backgroundImg: '',
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
          that.$nextTick(() => {
            that.wordFront = $('#front-box .item')
            console.log(that.wordFront)
            that.wordFront.each(function(i) {
              new MyDrag({el: $(this)[0]})
              that.setDesign(that.front, i, that.wordFront)
            })
          })
        })
        paramsFormat(backFormat, (data) => {
          this.back = data
          that.$nextTick(() => {
            that.wordBack = $('.design-box.back .item')
            that.wordBack.each(function(i) {
              new MyDrag({el: $(this)[0]})
              that.setDesign(that.back, i, that.wordBack)
            })
          })
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
      // 选择不同的图标，更新显示
      setIconUrl(i, url, ele) {
        let p = ele.params[i]
        p.url = url
        ele.params.splice(i, 1, p)
        // this.showModal = false
      },
      // 更新参数显示
      setDesign(ele, i, word) {
        let p = ele.params[i]
        if(p.type == 1 || p.type == 2) {
          let radio = p.radio, radius
          if(p.type == 2)  ele.params.splice(i, 1, p)
          if(word.eq(i).find('span').length > 0)  word.eq(i).arctext('destroy')
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
        this.$http.get('/api/good/icon', {
          params: {
            id: item.iconsid
          }
        }).then(res => {
          this.icons.list = res.data

        }).catch(err => {
          this.icons.list = []
        })

        //  测试数据
        setTimeout(() => {
          this.icons.list = [
            {
              title: '生肖图标',
              list: [
                {url: "../../../static/img/sx/su.png", text: '老鼠'},
                {url: "../../../static/img/sx/niu.png", text: '牛'},
                {url: "../../../static/img/sx/hu.png", text: '老虎'},
                {url: "../../../static/img/sx/tu.png", text: '兔子'},
                {url: "../../../static/img/sx/long.png", text: '龙'},
                {url: "../../../static/img/sx/se.png", text: '蛇'},
                {url: "../../../static/img/sx/ma.png", text: '马'},
                {url: "../../../static/img/sx/yang.png", text: '羊'},
                {url: "../../../static/img/sx/hou.png", text: '猴'},
                {url: "../../../static/img/sx/ji.png", text: '鸡'},
                {url: "../../../static/img/sx/gou.png", text: '狗'},
                {url: "../../../static/img/sx/zhu.png", text: '猪'},
              ]
            },
            {
              title: '性别图标',
              list: [
                {url: "../../../static/img/gender/nanhai.png", text: '男孩'},
                {url: "../../../static/img/gender/nvhai.png", text: '女孩'},
              ]
            },
            {
              title: '其它图标',
            }
          ]
        }, 50)
      },
      // 提交订单
      confirm() {
        this.loading.show()

        let data = {
          id: this.$route.query.id,
          front: this.front,
          back: this.back,
          fontFamily: this.purchase.fontFamily,
          remark: this.purchase.remark,
          dict: this.dict
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
   //   'set-box': setbox
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

  /* .section {
     border-top: 8px solid #eaeaea;
   }*/
  .imgs {
    position: relative;
    text-align: center;
    padding: 14px 0;
    height: 2.15rem;
    // height: 3.14rem;
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


  .design-box {
    position: relative;
    .item {
      position: absolute;
    }
  }
  /*
    .sec-title {
      line-height: 40px;
      font-size: 14px;
      border-bottom: 1px solid rgba(230, 230, 230, 1);
    }*/
  /*
    .purchase, .dict {
      padding: 0 10px 60px 18px;
      .sec-title {
        margin-bottom: 5px;
      }
    }
    .dict .list-item {
      padding: 5px 0;
      .label {
        margin-right: 12px;
      }
    }*/
  /*
    .list-item {
      display: flex;
      align-items: flex-start;
      font-size: 14px;
      line-height: 20px;
      padding: 4px 0;
      .label {
        margin-right: 34px;
        color: #ccc;
        white-space: nowrap;
      }
      input[type="text"] {
        border: none;
      }
      textarea {
        padding: 5px;
        border: none;
      }
      &.xingzuo {
        .label .modal {
          color: #6ca4b6;
          font-size: 12px;
          text-align: center;
        }
        .xz-box {
          background: rgba(229, 229, 229, 1);
          overflow: auto;
          white-space: nowrap;
          font-size: 12px;
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
              width: 32px;
              height: 32px;
              border-radius: 50%;
              overflow: hidden;
              margin: 0 auto;
              img {
                max-width: 100%;
                max-height: 100%;
              }
            }
          }
        }
      }
      .tag {
        .item {
          color: #0c0c0c;
          font-size: 14px;
          background: #e5e5e5;
          display: inline-block;
          margin: 0 5px 5px 5px;
          padding: 0 5px;
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
    }*/
  .btn-red {
    width: 100vw;
    height: .45rem;
    font-size: 16px;
  }

  .modal-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .5);
    z-index: 10;
    color: #000;
    .modal-body {
      position: absolute;
      background: #fff;
      bottom: 0;
      max-height: 75%;
      width: 100%;
    }
    .title {
      line-height: 42px;
      font-size: 18px;
      text-align: center;
      border-bottom: 1px solid rgba(234, 234, 234, 1);
      padding: 0 15px;
      .close {
        float: right;
        margin-top: 10px;
      }
    }
    .item {
      .item-tit {
        margin: 0 0 0 10px;
        font-size: 14px;
        padding-right: 15px;
        height: 45px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid rgba(234, 234, 234, 1);
      }
      .content {
        padding: 3px 7px 20px 7px;
        border-bottom: 1px solid rgba(234, 234, 234, 1);
        .item {
          display: inline-block;
          width: 56px;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          .img {
            height: 47px;
            width: 47px;
            border-radius: 50%;
            overflow: hidden;
            background: #e9e9e9;
            margin: 12px auto 5px auto;
            border: solid 1px transparent;
            img {
              max-width: 100%;
              max-height: 100%;
            }
          }
          &.active .img {
            border: solid 1px rgba(220, 182, 61, 1);
          }
        }
      }
    }
  }

</style>
