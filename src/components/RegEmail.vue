<template lang="cs">
    <div class="wrapper">
        <div class="content">
            <div class="heading">
                <h2>Registrace</h2>
                <p>Máte účet? <a><router-link to="/login">Přihlásit se</router-link></a></p>
            </div>
            <p class="desc">Na e-mail Vám bude zaslán ověřovací kód. Po ověření <br/>prosím pokračujte v dalších krocích registrace.</p>
            <div>
                <label for="email">E-mail</label>
                <input autofocus autocomplete="on" type="email" name="email" id="email" v-model="email" @keydown.enter="onEnter" />
                <p id="error"></p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Pokračovat</button>
            </div>
        </div>
        <infobox type="warning" text="Účet se zadaným e-mailem existuje, prosím <br/> přihlašte se nebo změňte heslo." time="5000" countdown="false" v-if="this.showModal" @closemodal="this.showModal=false" />
        <div class="pc bottom">
            <p><a href="#">Prohlášení o GDPR</a> | <a href="#">Veřejné obchodní podmínky</a></p>
            <div class="inUse">
                <img src="@/assets/in_use.svg" />
                <p>Všechny systémy v provozu</p>
            </div>
        </div>
    </div>
</template>
<script>
import {validateEmail} from "@/services/user-service"
import infobox from "./infobox.vue";
export default {
    emits: [
        'close'
    ],
    components:{
        infobox
    },
    data(){
        return{
            email: "",
            disable: true,
            showModal:false
        }
    },
    watch: {
        email(value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                this.disable = false;
            else
                this.disable = true;

            document.getElementById("error").innerText = "";
            this.showModal = false;
        }
    },
    methods:{
        async submit()
        {
            if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email))
            {
                const result = await validateEmail({email: this.email});
                
                if(result === '')
                {
                    window.sessionStorage.setItem("email", this.email)
                    this.$emit('close', this.email)
                }
                else if(result == "Email already used")
                    this.showModal = true;
                else
                    document.getElementById("error").innerText = result;
            }
            else
                document.getElementById("error").innerText = "E-mail je ve špatném formátu.";
                 
        },
        onEnter: function(){
            this.submit();
        }
    }
}
</script>
<style scoped>
/*font-family: 'Inter', sans-serif;*/
/*font-family: 'Nunito Sans', sans-serif;*/
.content{
    display: flex;
    flex-direction: column;
    max-width: 460px;
    max-height: 300px;
    height: 30vh;
    width: 30vw;
    padding: 32px;
    background-color: #F7F9FA;
    gap: 32px;
    border-radius: 8px;
}
.heading{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
.heading p, .desc, label{
    font-family: 'Inter', sans-serif;
}
.heading p, label{
    font-size: 12px;
}
.desc{
    font-size: 14px;
}
input{
    height: 35px;
    border: solid 1px #BDBDBD;
    border-radius: 4px;
    padding: 0;
    width: calc(100% - 2px);
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
@media only screen and (max-width: 1300px) {
    .mobile{
      display: block;
    }
    .pc{
        display: none;
    }
    .content{
        justify-content: center;
        width: 60vw;
        height: 40vh;
    }
    .wrapper{
        height: 100%;
    }
  }
  @media only screen and (max-width: 500px) {
    .content{
        width: 70vw;
    }
  }
</style>