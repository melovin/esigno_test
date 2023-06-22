<template>
  <main>
    <Home />
  </main>
</template>

<script>
// @ is an alias to /src
import Home from '@/components/Home.vue'

export default {
  name: 'HomeView',
  components: {
    Home
  }
}
</script>
<style scoped>
main{
  text-align: center;
}
</style>