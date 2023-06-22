<template lang="cs">
    <div class="wrapper">
        <div class="content" v-if="!this.logged && !this.showRobot">
            <div class="heading">
                <h2>Přihlášení</h2>
                <p>Jste nový uživatel? <a><router-link to="/Registration">Registrovat se</router-link></a></p>
            </div>
            <div class="inputs">
                <label for="email">E-mail</label>
                <input autofocus autocomplete="on" type="email" name="email" id="email" v-model="email" @keydown.enter="onEnter" />
                <p id="errormail"></p>
                <div>
                    <div class="passwdLabel">
                        <label for="passwd">Heslo</label>
                        <a @click="sendEmail">Zapomněli jste heslo?</a>
                    </div>
                    <div class="bcg">
                        <input autocomplete="on" :type="this.type" name="password" id="passwd" v-model="passwd" @keydown.enter="onEnter" />
                        <img id="visibilityIcon" src="passwd/passwd_invisible.svg" @click="changeVisibility"/>
                    </div>
                    <p id="errorpasswd"></p>
                </div>
                <div class="remember">
                    <input type="checkbox" name="remember" id="remember" v-model="remember" @keydown.enter="onEnter" />
                    <p @click="this.remember = !this.remember">Zapamatovat přihlášení</p>
                </div>
            </div>
            <p id="error"></p>
            <div>
                <button :disabled="this.disabled" type="button" @click="submit">Přihlásit se</button>
            </div>
        </div>
        <Login-State v-else @tryagain="tryagain"/>
        <infobox type="error" text="Zadali jste nesprávné přihlašovací údaje." time="5000" countdown="false" v-if="this.showModal" @closemodal="this.showModal=false" />
            <div class="pc bottom">
                <p><a href="#">Prohlášení o GDPR</a> | <a href="#">Veřejné obchodní podmínky</a></p>
                <div class="inUse">
                    <img src="@/assets/in_use.svg" alt="in use icon"/>
                    <p>Všechny systémy v provozu</p>
                </div>
            </div>
    </div>
</template>
<script>
import {Login} from '@/services/user-service';
import infobox from '@/components/infobox.vue';
import LoginState from '@/components/LoginState.vue';
import VueCookies from 'vue-cookies'
export default {
    components:{
        infobox,
        LoginState
    },
    data(){
        return{
            email: "",
            passwd: "",
            type: "password",
            remember: false,
            disabled: true,
            logged: $cookies.get('logged'),
            showRobot: false,
            showModal: false

        }
    },
    methods:{
        tryagain()
        {
           this.showRobot = false;
        },

        changeVisibility(){
            if(this.type == "password")
            {
                this.type = "text"
                document.getElementById("visibilityIcon").src = "passwd/passwd_visible.svg";
            }
            else
            {
                this.type = "password"
                document.getElementById("visibilityIcon").src = "passwd/passwd_invisible.svg";
            }
        },
        async submit()
        {
            if(this.email.length > 0 && this.passwd.length >= 8)
            {
                const result = await Login({email: this.email, password: this.passwd})
                if(result == "")
                {
                    $cookies.set("logged", this.email)
                    this.showRobot = true;
                    setTimeout(() => {
                        this.$router.push("/")
                    }, 3000);
                }
                else if(result == "Invalid credentials")
                    this.showModal = true;
                else
                    this.showRobot = false;
            }
            else
                this.showModal = true;
                 
        },
        onEnter: function(){
            this.submit();
        },
        sendEmail()
        {
            alert("Byl vám odeslán email s výzvou k obnovení hesla. Zkontrolujte prosím svojí e-mailovou schránku.")
        }
    },
    watch: {
        passwd(value){
            document.getElementById("errormail").innerText = "";
            document.getElementById("passwd").style.border = "#BDBDBD solid 1px"
            document.getElementById("email").style.border = "#BDBDBD solid 1px"

            this.disabled = false
            if(value.length < 8 || this.email.length == 0)
                this.disabled = true;

        },
        email(value){
            document.getElementById("errorpasswd").innerText = "";
            document.getElementById("email").style.border = "#BDBDBD solid 1px"
            document.getElementById("passwd").style.border = "#BDBDBD solid 1px"
            this.disabled = false
            if(value.length == 0 || this.passwd.length < 8)
                this.disabled = true;
        }
    },
}
</script>
<style scoped>
.content{
    display: flex;
    flex-direction: column;
    max-width: 460px;
    max-height: 300px;
    height: 70vh;
    width: 70vw;
    padding: 32px;
    background-color: #F7F9FA;
    gap: 15px;
    border-radius: 8px;
}
.heading{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
.heading p, .desc, label, .remember{
    font-family: 'Inter', sans-serif;
}
.heading p, label{
    font-size: 12px;
}
.passwdLabel{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-family: 'Inter', sans-serif;
}
.bcg{
    display: flex;
}
.remember{
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 12px;
}
.remember input{
    height: 15px;
    width: 15px;
}
.remember p{
    user-select: none;
}
.inputs{
    display: flex;
    flex-direction: column;
    gap: 10px;
}
input{
    height: 35px;
    border: solid 1px #BDBDBD;
    border-radius: 4px;
    padding: 0;
    width: calc(100% - 2px);
    font-size: 14px;
}
img{
    margin-left: -40px;
    cursor: pointer;
}
.bottom .inUse{
    color: #409230;
    display: flex;
    gap: 4px;
    height: 10px;
    align-items: baseline;
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
    .heading{
        flex-direction: column;
    }
  }
</style>