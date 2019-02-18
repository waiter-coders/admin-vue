<template>
  <div>{{ msg }}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: ''
    }
  },
  created () {
    this.getConfig()
  },
  methods: {
    getConfig () {
      this.msg = '欢迎！'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
