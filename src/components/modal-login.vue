<template>
  <div>

    <span @click="$root.uid ? callback() : useLogin()">
      <slot></slot>
    </span>

    <div class="modal" v-if="visible">
      <ModalLogin :is-modal="true" @loginSuccess="visible=false;"></ModalLogin>
    </div>

  </div>
</template>

<script>
  import ModalLogin from '@/view/login/login.vue'

  export default {
    props: {
      callback: {
        type: Function,
        default: () => {}
      }
    },
    data () {
      return {
        visible: false
      }
    },
    methods: {
      useLogin() {
          this.$message.error('请登录')
          setTimeout(() => {
            this.visible = true
        }, 1000)
      }
    },
    components: {
      ModalLogin
    }
  }
</script>

<style lang="less" scoped>
  .modal {
    position: fixed;
    top: 0;
    left:  0;
    right: 0;
    bottom: 0;
    height: 100vh;
    width: 100vw;
    background: #fff;
    z-index: 300;
  }
</style>
