<template lang="cs">
    <div class="defaultLayout">
        <div class="content">
            <nav>
                <picture>
                    <img class="logo" src="@/assets/logo.svg"/>
                  </picture>
                  <div class="links">
                      <router-link to="/">Domů</router-link> 
                      <router-link to="/registration">Registrace</router-link> 
                      <router-link v-if="!logged" to="/login">Log-in</router-link> 
                      <a v-if="logged" @click="logout">Log-out</a>
                      <p v-if="logged">Přihlášený uživatel: {{this.logged}}</p>
                  </div>
              </nav>
        </div>
        <slot/>
    </div>
</template>
<script>
import VueCookies from 'vue-cookies'
export default {
    data(){
        return{
            logged: $cookies.get("logged")
        }
    },
    methods:{
        logout()
        {
            $cookies.remove("logged")
            this.$router.go()
        }
    }
}
</script>
<style scoped>
.defaultLayout{
    background: linear-gradient(82.92deg, #545CE4 0%, #E698F8 0.01%, #499AF7 100%);;
    height: 100%;
}
.content{
    width: 90%;
    margin-left: auto;
    margin-right: auto;
    padding-top: 50px;
}
a, p{
    color: rgb(209, 207, 207);
    font-family: 'Inter', sans-serif;
    font-size: 20px;
}
a{
    cursor: pointer;
    text-decoration: underline;
}
nav{
    display: flex;
    justify-content: space-between;
}
.links{
    display: flex;
    gap: 10px;
    align-items: center;
}
.links p{
    font-weight: bold;
    color: rgb(158, 245, 158);
}
@media only screen and (max-width: 950px) {
    .links {
      flex-direction: column;
      align-items: flex-start;
    }
    nav{
        flex-direction: column;
        align-items: center;
    }
    .links {
      flex-direction: column;
      align-items: center;
    }
  }
</style>