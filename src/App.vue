<template>
  <div id="app">
    <router-view/>
    <admin-dialog :config="dialog"></admin-dialog>
  </div>
</template>

<script>
export default {
  name: 'waiter',
  computed: {
    dialog () {
      return this.$store.state.dialog
    }
  }
}
</script>

<style lang="scss">
@import "normalize.css/normalize.css";
@import "styles/index.scss";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #fff;
}
</style>
