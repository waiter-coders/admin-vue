<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'waiter'
}
</script>

<style lang="scss">
@import "normalize.css/normalize.css";
@import "styles/index.scss";
#app {
  font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background: #fff;
  font-size:14px;
  color: #515151;
}
</style>
