<template>
  <div id="app">
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
    min-height: 100vh;
  }
  #app {
    min-height: 100vh;
  }
  a {
    text-decoration: none;
    color: #333;
  }
</style>
