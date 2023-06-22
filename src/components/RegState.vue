<template lang="cs">
    <div class="wrapper">
        <div class="maincontent" v-if="this.completed === 'true'">
            <picture>
                <img src="../assets/happyRobot.svg" />
            </picture>
            <h2>Registrace proběhla úspěšně</h2>
            <p class="desc">Děkujeme váš profil byl úspěšně založen. <br/> Nyní můžete přejít do portálu Esigno.</p>
            <div class="btn">
                <button type="button" @click="loginRedirect">Přejít do Esigno</button>
            </div>
        </div>
        <div class="maincontent" v-else>
            <picture>
                <img src="../assets/sadRobot.svg" />
            </picture>
            <h2>Registrace se nezdařila</h2>
            <p class="desc">Vás profil se nepodařilo založit z důvodu chyby na serveru. <br/> Prosím opakujte proces znovu nebo nás kontaktujte na <br/> e-mail <a href="mailto:podpora@esigno.com"><b>podpora@esigno.com.</b></a></p>
            <div class="btn">
                <button type="button" @click="tryagain">Zkusím to znovu</button>
            </div>
        </div>
        <div class="bottom">
            <p><a href="#">Prohlášení o GDPR</a> | <a href="#">Veřejné obchodní podmínky</a></p>
            <div class="inUse">
                <img src="@/assets/in_use.svg" alt="in use icon"/>
                <p>Všechny systémy v provozu</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            completed: window.sessionStorage.getItem("completed")
        }
    },
    methods:{
        exit(){
            window.sessionStorage.setItem("step","1")
        },
        loginRedirect()
        {
            this.$emit('toLogin')
        },
        tryagain(){
            this.$emit('tryagain')
        }
    },emits: [
        'tryagain',
        'toLogin'
    ]
}
</script>
<style scoped>
.maincontent{
    display: flex;
    flex-direction: column;
    width: 460px;
    height: 500px;
    padding: 32px;
    background-color: #F7F9FA;
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
.errInfo{
    align-items: center;
    display: flex;
}
.btn{
    width: 90%;
}
.bottom .inUse{
    color: #409230;
    display: flex;
    gap: 4px;
}
.bottom{
    margin-left: 32px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    display: flex;
    gap: 60px;
    position: absolute;
    bottom: 32px;
}
</style>