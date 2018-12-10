<template>
  <div class="form-number">
    <input type="hidden" :value="value" @input="value=$event.target.value">

    <span class="item icon-minus" @click="minPlus()">-</span>

    <input :style="`width:${width}px;`" class="item num" type="text"  @input="inputText($event)" v-model="val">
    <span class="item icon-plus" @click="plus()">+</span>

    <span class="item num" ref="spannum" v-html="val" style="opacity:0;position:absolute;z-index:-1;"></span>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number
    },
    watch: {
      value() {
        if(this.val !== this.value) this.val = this.value
      },
      val(val, oldVal) {
        this.$nextTick(() => {
          this.width = this.$refs.spannum.clientWidth
        })
        this.$emit('input', parseInt(this.val))
      }
    },
    data () {
      return {
        val: this.value,
        width: 22,
        s: '',
        v: ''
      }
    },
    methods: {
      //  数字输入
      inputText(e) {
        let v = e.target.value, s = parseInt(v)
        this.s = s
        this.v = v

        if(isNaN(s)) {
          this.val = 1
        }else if(!isNaN(s) && s.toString().length !== v.length) {
          this.val = s
        }
      },
      //  加
      plus() {
        let v = parseInt(this.val)
        this.val = (isNaN(v) ? 0 : v)  + 1
      },
      // 减
      minPlus() {
        let v = parseInt(this.val)
        v = isNaN(v) ? 0 : v

        this.val = Math.max(1, v - 1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-number {
    position: relative;
    .item {
      height: 22px;
      background: #e5e5e5;
      vertical-align: middle;
      margin-right: 5px;
      display: inline-block;
      text-align: center;
      border-radius: 2px;
      padding: 0 2px;
    }
    .icon-minus, .icon-plus {
      width: 22px;
      color: rgba(140, 140, 140, 1);
      font-size: 23px;
      line-height: 18px;
    }
    input[type="text"], input[type="number"], .num {
      min-width: 22px;
      border: none;
      line-height: 22px;
    }
  }
</style>
