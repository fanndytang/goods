<!-- 商品定制 -->
<template>
  <div>
    <head-bar :back="true" title="商品定制" :menu="true"></head-bar>

    <div class="tab-bar">
      <span class="item" :class="{'active': active==1}" @click="active=1">正面</span>
      <span class="item" :class="{'active': active==2}" @click="active=2">背面</span>
    </div>

    <div class="imgs">
      <span class="design-box front" v-show="active == 1">
        <img src="../../../static/imgs/goods.png" alt="">
        <div class="item" v-for="item,i in detail.front" :key="i" :style="'top:'+item.top+';left:'+item.left+';transform:rotate('+(item.rotate||'0')+'deg);'+item.style">{{item.value}}</div>
      </span>
      <span class="design-box back" v-show="active == 2">
        <img src="../../../static/imgs/goods.png" alt="">
      </span>

      <span class="fa fa-download download"></span>
    </div>

    <div class="sec-title">定制参数</div>
    <div class="params-con" v-show="active == 1">
      <div class="list-item" v-for="item,i in detail.front" :key="i">
        <div class="label">{{item.label}}</div>
        <input type="text" v-model="item.value" v-show="item.type != 'radio'" @change="rebuild(i)">

        <div v-show="item.type == 'radio'">
          <input type="radio" name="test" :checked = "item.value == 'AM'"> AM
          <input type="radio" name="test" :checked ="item.value == 'PM'">PM
        </div>
      </div>

      <div class="list-item">
        <div class="label">宝宝星座 <div style="font-size:12px;color:blue;">其它模板</div></div>
        <div style="background:#ccc;height:50px;line-height:50px;">
          <span>白羊座</span>
          <span>金牛座</span>
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
        <input type="file">
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
      <textarea cols="30" rows="3" style="flex: 1;"></textarea>
    </div>


    <div class="sec-title">商品参数</div>
    <div class="list-item">
      <div class="label">成色</div>
      <div class="tag">
        <span class="item">Au999</span>
        <span class="item">Ag999</span>
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


    <button type="button">提交订单</button>

  </div>
</template>

<script>
  export default {
      data () {
          return {
            active: 1,
            detail: {
                  front: [
                    {label: '宝宝身高', value: '50cm', top: '128px', left: '226px', radius: '0.1', rotate: '50', style: 'font-size:28px;color:#333;'},
                    {label: '宝宝姓名', value: '张北海', top: '128px', left: '108px', radius: false, style: 'font-size: 36px;color:#333;'},
                    {label: '出生日期', value: '2018.07.14', top: '305px', left: '95px', radius: '0.1', dir: -1, style: 'font-size: 28px;color:#333;'},
                    {label: '下午下午', value: 'PM', top: '216px', left: '45px', type: 'radio', radius: false, style: 'font-size: 26px;color:#333;'},
                    {label: '出生时间', value: '09:30', top: 0, left: 0},
                    {label: '宝宝重量', value: '3700g', top: '122px', left: '22px', radius: '0.1', rotate: '-50', style: 'font-size: 28px;color:#333;'},
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
    line-height: 2.5rem;
    display: flex;
    text-align: center;
    background: #ddd;
    .item {
      flex: 1;
      &.active {
        color: #fff;
        background: #bbb;
      }
    }
  }
  .imgs {
    position: relative;
    background: #fff;
    text-align: center;
    .download {
      position: absolute;
      right: 10px;
      bottom: 10px;
    }
  }
  .sec-title, .list-item {
    background: #fff;
  }
  .params-con {
    border-bottom: 1px dotted #ccc;
  }
  .sec-title {
    border-bottom: 1px solid #ccc;
    padding: 10px;
    margin-top: 10px;
  }
  .list-item {
    display: flex;
    align-items: center;
    padding: 5px 10px;
    .label {
      margin-right: 10px;
      font-weight: bold;
    }
    .tag {
      .item {
        display: inline-block;
        padding: 0 20px;
        background: #ccc;
        border-radius: 4px;
        & + .item {
          margin-left: 20px;
        }
      }
    }
  }
  button {
    width: 100vw;
    border: none;
    background: red;
    color: #fff;
    line-height: 3rem;
    margin-top: 10px;
  }

  .design-box {
    position: relative;
    display: inline-block;
    .item {
      position: absolute;
    }
  }
</style>
