<template>
  <div id="position">
    <input type="hidden" :value="value" @input="value=$event.target.value">
    <slot></slot>
  </div>
</template>

<script>
  import MobileSelect from 'mobile-select'

  export default {
    props: {
            value: String,
         text: String
    },
    data () {
      return {
        country: [],
        mySelect: {}
      }
    },
    watch: {
      value(val) {
        this.setText()
      }
    },
    mounted () {
      this.countrySel()
    },
    methods: {
      setText() {
        if(this.value && !this.text && this.country.length) {
          let v = this.value.toString().split(','),
            text = '',
            level = v.length,
            i = 0,
            index = []

          let setText = (arr) => {
            for(let k in arr) {
              if(arr[k].id == v[i]) {
                text += arr[k].label
                index[i] = k
                i++
                if(i<level && arr[k].child && arr[k].child.length) {
                  setText(arr[k].child)
                }
                break;
              }
            }
          }

          setText(this.country)

          this.$emit('update:text', text)

          for(let k in index) {
            this.mySelect.locatePosition(k, index[k])
          }

        }
      },
      //  地区选择
      countrySel() {
        let that = this
        this.mySelect = new MobileSelect({
          trigger: '#position',
          title: '配送至',
          triggerDisplayData: false,
          wheels: [{data: [{id: 1, label: '', child: [{id: 11, label: ''}]}]}],
          keyMap: {id:'id', value: 'label', childs :'child'},
          callback:function(indexArr, data){
            let str = '', ids = ''
            for(let k in data) {
              ids += (ids ? ',' : '') + (data[k].id || '')
              str += (data[k].label || '')
            }
         //   that.params.position = ids
           // that.positiontext = str
            that.$emit('input', ids)
            that.$emit('update:text', str)
          }
        });

        this.$http({
          url: '/api/list/country',
          method: 'get',
          success: (data) => {
            this.mySelect.updateWheels(data.data);


           this.country = data.data
           this.setText()
          }

        })

      }
    }

  }
</script>


