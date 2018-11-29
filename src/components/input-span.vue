<template>
  <div contenteditable="true" v-html="innerText" @input="changeTxt" @focus="lock=true" @blur="lock=false;$emit('change')"></div>
</template>

<script>
  export default {
    props:{
      value: [String, Number]
    },
    data:function(){
      return {
        innerText:this.value,
        lock:false
      }
    },
    watch:{
      value:{
        handler(newValue, oldValue) {
          if(!this.lock) {
            this.innerText=this.value;
          }
        }
      }
    },
    methods:{
      changeTxt:function(e){
        this.$emit('input', this.$el.innerHTML);
      }
    },
   // template:``
  }
</script>
