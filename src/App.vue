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
.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
}
.otp-input:focus{
  outline: none;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
  background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input::placeholder {
  font-size: 15px;
  text-align: center;
  font-weight: 600;
}
</style>
