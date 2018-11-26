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
  font-family: -apple-system, Helvetica, arial, tahoma, 'Microsoft Yahei', '\5b8b\4f53', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  background: #fff;
}
</style>
