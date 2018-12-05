<template>
  <div class="form-number">
    <input type="hidden" :value="value" @input="value=$event.target.value">

    <span class="item icon-minus" @click="minPlus()">-</span>
    <span class="item num" contenteditable="true" @input="inputText($event)" v-html="val"></span>
    <span class="item icon-plus" @click="plus()">+</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number
    },
    watch: {
      val(val, oldVal) {
        this.$emit('input', parseInt(this.val))
      }
    },
    data () {
      return {
        val: this.value
      }
    },
    methods: {
            inputText(e) {
              let v = e.target.innerText, s = parseInt(v)

              if(isNaN(s)) {
                e.target.innerText = 1

                this.$nextTick(() => {

                  setTimeout(() => {
                    let obj = e.target
                    if (window.getSelection) {//ie11 10 9 ff safari
                      obj.focus(); //解决ff不获取焦点无法定位问题
                      //   console.log(obj)
                      let range = window.getSelection();//创建range
                      range.selectAllChildren(obj);//range 选择obj下所有子内容
                      range.collapseToEnd();//光标移至最后
                    }
                  }, 10)

                })

              }else if(!isNaN(s) && s.toString().length !== v.length) {
                e.target.innerText = s
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
