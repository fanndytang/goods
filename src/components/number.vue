<template>
  <div class="form-number">
    <input type="hidden" :value="value" @input="value=$event.target.value">

    <span class="item icon-minus" @click="minPlus()">-</span>
    <input-span class="item num" v-model="val"></input-span>
    <span class="item icon-plus" @click="plus()">+</span>
  </div>
</template>

<script>
  export default {
    props: {
      value: Number
    },
    watch: {
      val(val) {
        this.$emit('input', parseInt(val))
      }
    },
    data () {
      return {
        val: this.value
      }
    },
    methods: {
      //  加
      plus() {
        this.val = parseInt(this.val) + 1
      },
      // 减
      minPlus() {
        let v = Math.max(1, parseInt(this.val) - 1)
        this.val = v
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
