<!-- 商品定制 -->
<template>
  <div class="design-list-box">
    <head-bar :back="true" title="商品订制" :menu="true"></head-bar>

    <div class="tab-bar">
      <span class="item" :class="{'active': active==1}" @click="active=1">正面</span>
      <span class="item" :class="{'active': active==2}" @click="active=2">背面</span>
    </div>

    <div class="imgs section">
      <span class="design-box front" v-show="active == 1">
        <img src="../../../static/img/goods.png" alt="">
        <div class="item" v-for="item,i in detail.front" :key="i" :style="'top:'+item.top+';left:'+item.left+';transform:rotate('+(item.rotate||'0')+'deg);'+item.style">{{item.value}}</div>
      </span>
      <span class="design-box back" v-show="active == 2">
        <img src="../../../static/img/goods.png" alt="">
      </span>

      <img height="35px" :src="require('@/assets/icons/download.png')" alt="" class="download">
    </div>

    <div class="section purchase">
      <div class="sec-title">定制参数</div>
      <div class="params-con" v-show="active == 1">
        <div class="list-item" v-for="item,i in detail.front" :key="i">
          <div class="label">{{item.label}}</div>
          <input type="text" v-model="item.value" v-show="item.type != 'radio'" @change="rebuild(i)" placeholder="请输入">

          <div v-show="item.type == 'radio'">

            <input type="radio" name="test" :checked = "item.value == 'AM'"> AM
          <input type="radio" name="test" :checked ="item.value == 'PM'">PM
        </div>
        </div>

        <div class="list-item xingzuo">
          <div class="label">宝宝星座 <div class="modal" @click="showModal = true">其它模板</div></div>
          <div class="xz-box">
            <div class="item active"><div class="img"><img :src="require('@/assets/xz/baiyang.png')" alt=""></div>白羊座</div>
            <div class="item"><div class="img"><img :src="require('@/assets/xz/jinniu.png')" alt=""></div>金牛座</div>
            <div class="item"><div class="img"><img :src="require('@/assets/xz/shuangzi.png')" alt=""></div>双子座</div>
            <div class="item"><div class="img"><img :src="require('@/assets/xz/jujie.png')" alt=""></div>巨蟹座</div>
            <div class="item"><div class="img"><img :src="require('@/assets/xz/shizi.png')" alt=""></div>狮子座</div>
            <div class="item"><div class="img"><img :src="require('@/assets/xz/chunv.png')" alt=""></div>处女座</div>
          </div>
        </div>
      </div>
      <div class="params-con" v-show="active == 2">
        <div class="list-item">
          <div class="label">祝愿祝愿</div>
          <input type="text" value="平安">
        </div>
        <div class="list-item">
          <div class="label">祝福祝福</div>
          <input type="text" value="健康">
        </div>
        <div class="list-item">
          <div class="label">宝宝照片</div>
          <div class="upload">
          <!--  <input type="file">-->
            <img height="76px" :src="require('@/assets/icons/icon_up.png')" alt="">
            <img height="76px" :src="require('@/assets/icons/icon_reup.png')" alt="">
          </div>
        </div>
      </div>
      <div class="list-item">
        <div class="label">定制字体</div>
        <select>
          <option value="1">宋体</option>
          <option value="2">微软雅黑</option>
          <option value="3">楷体</option>
          <option value="4">华文行楷</option>
        </select>
      </div>
      <div class="list-item">
        <div class="label">定制备注</div>
        <textarea class="textarea" cols="30" rows="3" placeholder="请备注想说的话"></textarea>
      </div>
    </div>

    <div class="section dict">
      <div class="sec-title">商品参数</div>
      <div class="list-item">
        <div class="label">成色</div>
        <div class="tag">
          <span class="item active">Au999</span>
          <span class="item">Ag999</span>
          <span class="item">银镀金</span>
          <span class="item">银镀金</span>
          <span class="item">银镀金</span>
          <span class="item">银镀金</span>
          <span class="item">银镀金</span>
        </div>
      </div>
      <div class="list-item">
        <div class="label">重量</div>
        <div class="tag">
          <span class="item">20g</span>
          <span class="item">30g</span>
        </div>
      </div>
      <div class="list-item">
        <div class="label">规格</div>
        <div class="tag">
          <span class="item">20*23.8mm</span>
          <span class="item">20*10.4mm</span>
        </div>
      </div>
      <div class="list-item">
        <div class="label">数量</div>
        <input type="number">
      </div>

    </div>

    <button class="btn btn-red btn-block" type="button">提交订单</button>

    <div class="modal-box" v-show="showModal">
      <div class="modal-body">
        <div class="title">
          选择图标
          <img @click="showModal = false" class="close" height="20px" :src="require('@/assets/icons/icon_guanbi.png')" alt="">
        </div>

        <div class="item">
          <div class="item-tit">
            生肖图标
            <img height="22px" :src="require('@/assets/icons/icon_xia1.png')" alt="">
          </div>
          <div class="content">
            <div class="item active"><div class="img"><img  :src="require('@/assets/sx/su.png')" alt=""></div>老鼠</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/niu.png')" alt=""></div>牛</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/hu.png')" alt=""></div>老虎</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/tu.png')" alt=""></div>兔子</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/long.png')" alt=""></div>龙</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/se.png')" alt=""></div>蛇</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/ma.png')" alt=""></div>马</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/yang.png')" alt=""></div>羊</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/hou.png')" alt=""></div>猴</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/ji.png')" alt=""></div>鸡</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/gou.png')" alt=""></div>狗</div>
            <div class="item"><div class="img"><img  :src="require('@/assets/sx/zhu.png')" alt=""></div>猪</div>
          </div>
        </div>

        <div class="item">
          <div class="item-tit">
            性别图标
            <img height="22px" :src="require('@/assets/icons/icon_xia1.png')" alt="">
          </div>
          <div class="content">
            <div class="item"><div class="img"><img :src="require('@/assets/gender/nanhai.png')" alt=""></div>男孩</div>
            <div class="item"><div class="img"><img :src="require('@/assets/gender/nvhai.png')" alt=""></div>女孩</div>
          </div>
        </div>

        <div class="item">
          <div class="item-tit">
            其它图标
            <img height="22px" :src="require('@/assets/icons/icon_xia1.png')" alt="">
          </div>
          <div class="content"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
      data () {
          return {
            active: 1,
            showModal: false,
            detail: {
                  front: [
                    {label: '宝宝身高', value: '50cm', top: '0', left: '0', radius: '0.1', rotate: '50', style: 'font-size:28px;color:#333;'},
                    {label: '宝宝姓名', value: '张北海', top: '0', left: '0', radius: false, style: 'font-size: 36px;color:#333;'},
                    {label: '出生日期', value: '2018.07.14', top: '0', left: '0', radius: '0.1', dir: -1, style: 'font-size: 28px;color:#333;'},
                    {label: '下午下午', value: 'PM', top: '0', left: '0', type: 'radio', radius: false, style: 'font-size: 26px;color:#333;'},
                    {label: '出生时间', value: '', top: 0, left: 0},
                    {label: '宝宝重量', value: '3700g', top: '0', left: '0', radius: '0.1', rotate: '-50', style: 'font-size: 28px;color:#333;'},
                  ]
            },
            wordFront: ''
          }
      },
    mounted () {
      this.$nextTick(() => {
        let that = this
        this.wordFront = $('.design-box.front .item')
        this.wordFront.each(function(i) {
          new MyDrag({
            el: $(this)[0]
          })
          that.setDesign(i)
        })
      })
    },
    methods: {
          rebuild(i) {
            this.wordFront.eq(i).text(this.detail.front[i].value)
            this.wordFront.eq(i).arctext('destroy')
            this.setDesign(i)
          },
          setDesign(i) {
            let radius = this.detail.front[i].radius
            if(!radius) {
              radius = this.wordFront.eq(i).width() * 1800 / Math.PI
            }else {
              radius = this.wordFront.eq(i).width() * 9 / (Math.PI * 2)
            }
            this.wordFront.eq(i).arctext({radius: parseFloat(radius), dir: this.detail.front[i].dir || 1})
          }
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
