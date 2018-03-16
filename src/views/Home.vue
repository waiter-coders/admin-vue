<template>
  <div>主页{{ msg }}</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'sss'
    }
  },
  method:{
  	getConfig:function(){
  		alert(1);
  	},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
</style>
