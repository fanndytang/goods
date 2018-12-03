<template>
  <div id="app" @click="$root.eventHub.$emit('document-click', $event)">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  *, *:after, *:before {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }
  html {
    font-size: 100px;
    height: 100vh;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 0.12rem;
    color: #555;
/* //   min-height: 100vh;*/

    height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    transition-duration: 300ms;
  }
  #app {
    min-height: 100vh;
  }
  a {
    text-decoration: none;
    color: #333;
  }
</style>
