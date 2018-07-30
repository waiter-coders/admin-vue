<template>
  <div id="app">
    <router-view @showDialog="showDialog"/>
    <admin-dialog :config="dialog"></admin-dialog>
  </div>
</template>

<script>
export default {
  name: "waiter",
  computed(){
    return { dialog: this.$store.state.dialog}
  },
  methods: {
    showDialog(config, callback) {
      this.dialog = config;
    }
  }
};
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
