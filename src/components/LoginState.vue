<template lang="cs">
    <div class="wrapper" v-if="this.completed">
        <div class="maincontent" >
            <picture>
                <img src="../assets/happyRobot.svg" alt="veselý robot"/>
            </picture>
            <h2>Přihlášení proběhlo úspěšně</h2>
            <p class="desc">Prosím vyčkejte na přesměrování....</p>
        </div>

    </div>
    
    <div class="wrapper" v-else>
        <div class="maincontent">
            <picture>
                <img src="../assets/sadRobot.svg" alt="smutný robot"/>
            </picture>
            <h2>přihlášení se nezdařilo</h2>
            <p class="desc">Přihlášení neproběhlo z důvodu chyby na serveru. <br/> Prosím opakujte proces znovu nebo nás kontaktujte na <br/> e-mail <a href="mailto:podpora@esigno.com"><b>podpora@esigno.com.</b></a></p>
            <div class="btn">
                <button type="button" @click="tryagain">Zkusím to znovu</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            completed: $cookies.get('logged')
        }
    },
    methods:{
        exit(){
            window.sessionStorage.setItem("step","1")
        },
        tryagain(){
            this.$emit('tryagain')
        }
    },emits: [
        'tryagain'
    ]
}
</script>
<style scoped>
.maincontent{
    display: flex;
    flex-direction: column;
    max-width: 460px;
    max-height: 500px;
    height: 67vh;
    width: 60vw;
    padding: 32px;
    background-color: #F7F9FA;
    border-radius: 8px;
    gap: 32px;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
    text-align: center;
}
.desc{
    font-size: 14px;
}
.desc a{
    text-decoration: none;
    color: #2D2D2D;
}
.btn{
    width: 90%;
}
@media only screen and (max-width: 1300px) {
    .content{
        justify-content: center;
        gap: 20px;
    }
    .wrapper{
        height: 100%;
    }
  }
  @media only screen and (max-width: 500px) {
    .maincontent{
        gap: 12px;
    }
  }
</style>