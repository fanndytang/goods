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
  body {
    padding: 0;
    margin: 0;
    font-size: 14px;
    color: #555;
    min-height: 100vh;
    background: #f3f3f3;
  }
  a {
    text-decoration: none;
    color: #333;
  }
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}*/
</style>
