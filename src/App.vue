<template>
  <div id="app">
  <router-link to="/user/account/paging">paging</router-link>
      <router-link to="/user/account/form">form</router-link>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'waiter后台'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
