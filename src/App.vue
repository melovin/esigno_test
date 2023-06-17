<template>
  <component :is="layout">
    <router-view/>
  </component>
</template>
<script>
const defaultLayout = 'default';
export default {
  computed: {
    layout(){
      return (this.$route.meta.layout || defaultLayout) + '-layout'
    }
  }
}
</script>
<style>
/*used (Nunito Sans) instead of payed font (Geomanist)*/
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Nunito+Sans:wght@400;700&display=swap');
html, body{
  margin: 0;
  padding: 0;
  height: 100%;
}
#app {
  height: 100%;
}

</style>
