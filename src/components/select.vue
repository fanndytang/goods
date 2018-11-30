<template>
  <div class="form-select" :class="{'open': show}">
    <input type="hidden" :value="value" @input="value = $event.target.value">

    <div class="sel-text" @click="show = !show">
      <span class="text">{{selItem[sellab]||'' }}</span>
      <span class="icon"></span>
    </div>
    <ul class="sel-list">
      <li v-for="item,i in list" :key="i" @click="sel(item)" :class="{'select': selItem[selval] == item[selval]}">{{item[sellab] || ''}}</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      value: [String, Number],
      list: Array,
      sellab: {
        type: String,
        default: 'name'
      },
      selval: {
        type: String,
        default: 'id'
      }
    },
    data () {
      return {
        show: false,
        selItem: ''
      }
    },
    mounted () {
      this.init()
      this.$root.eventHub.$on('document-click', (e) => {
        if (!this.$el.contains(e.target)) this.show = false
      })
    },
    methods: {
            init() {
                    if(this.value) {
                      for(let k in this.list) {
                              if(this.value === this.list[k][this.selval]) {
                                      this.selItem = this.list[k]
                                break;
                              }
                      }
                    }

            },
      sel(item) {
        this.$emit('input', item[this.selval])
      //  console.log(item[this.selval])
        this.$emit('change', item[this.selval])
        this.selItem = item
        this.show = false
      }
    }
  }
</script>

<style lang="less" scoped>
  .form-select {

    position: relative;
    .sel-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #e5e5e5;
      height: 25px;
      padding: 0 5px 0 10px;
      border-radius: 2px;
      .icon {
        display: inline-block;
        border-width: 8px 8px 0 8px;
        border-style: solid;
        border-color: #0c0c0c transparent transparent transparent;
      }
      .text {
        margin-right: 15px;
      }
    }
    .sel-list {
      z-index: 100;
      padding: 0;
      margin: 0;
      background: #fff;
      position: absolute;
      list-style: none;
      left: 0;
      top: 100%;
      min-width: 100%;
      display: none;
      //   white-space: nowrap;
      -webkit-box-shadow: 0 6px 13px 0 rgba(7, 0, 2, 0.31);
      -moz-box-shadow: 0 6px 13px 0 rgba(7, 0, 2, 0.31);
      box-shadow: 0 6px 13px 0 rgba(7, 0, 2, 0.31);
      border: solid 1px rgba(195, 195, 195, 1);

      li {
        &:not(:first-child) {
          border-top:  solid 1px rgba(195, 195, 195, 1);
        }
        padding: 0 10px;
        line-height: 25px;
        font-size: 12px;
        color: #c2c2c2;
        &.select {
          padding-left: 20px;
          color: #0c0c0c;
          background: #e0dede;
        }
      }
    }

    &.open {
      .sel-text {
        border: solid 1px rgba(195, 195, 195, 1);
        border-bottom: 0;
      }
      .sel-list {
        display: block;
        .sel-text .icon {
          border-width: 0 8px 8px 8px;
          border-color: transparent transparent #0c0c0c transparent;
        }
      }
    }
  }
</style>
