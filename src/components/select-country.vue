<template>
  <div id="position">
    <slot></slot>
  </div>
</template>

<script>
  import MobileSelect from 'mobile-select'
  import country from '@/plugin/country'

  export default {
    props: {
            value: String,
         text: String
    },
    mounted () {
      this.countrySel()
    },
    methods: {
      //  地区选择
      countrySel() {
        let that = this
        let mobileSelect = new MobileSelect({
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

        this.$http.get('/api/country').then(res => {
          mobileSelect.updateWheels(res.data);
        }).catch(err => {})

        //测试： country 为测试数据
        setTimeout(() => {
          mobileSelect.updateWheels(country);
        }, 1000)
      }
    }

  }
</script>


