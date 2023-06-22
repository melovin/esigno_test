<template lang="cs">
    <div class="wrapper">
        <div class="content">
            <div class="heading">
                <h2>Zadejte kód</h2>
                <a href="">Zpět na přihlášení</a>
            </div>
            <p class="desc">Potřebujeme ověřit vaši identitu, zadejte prosím ověřovací <br/> PIN kód, který jsme vám poslali na e-mail <br/> <span>{{this.email}}</span>.</p>
            <div class="code">
                <div class="verify">
                    <v-otp-input
                    id="codeInput"
                    ref="otpInput"
                    v-model:value="code"
                    input-classes="otp-input"
                    separator=""
                    :num-inputs="4"
                    :should-auto-focus="true"
                    input-type="letter-numeric"
                    :conditionalClass="['one', 'two', 'three', 'four']"
                    :placeholder="['', '', '', '']"
                    @keydown.enter="onEnter"
                    />
                </div>
                <p id="error"></p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Ověřit a pokračovat</button>
            </div>
            <div class="tryagain">
                <p>Nepřišel Vám e-mail? Prosím zkontrolujte spam.</p>
                <a @click="this.showModal = true">Zaslat znovu kód</a>
            </div>
        </div>
        <infobox :type="this.status" :text="this.text" :time="this.time" :countdown="this.countdown" v-if="this.showModal" @closemodal="this.showModal=false" />
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
import infobox from "./infobox.vue"
import {verifyCode} from "@/services/user-service"
export default {
    emits: [
        'close',
        'setEmail'
    ],
    components:{
        infobox
    },
    data(){
        return{
            email: window.sessionStorage.getItem("email"),
            code: "",
            disable: true,

            // status: "ok",
            // text: "Nový kód Vám byl odeslán na e-mail: <br/>" + window.sessionStorage.getItem("email"),
            // time: 5000,
            // countdown: false,

            // status: "error",
            // text: "Nastala chyba při odesílání e-mailu, prosím zkuste znovu.",
            // time: 5000,
            // countdown: false,

            // status: "warning",
            // text: "Účet se zadaným e-mailem existuje, prosím přihlašte se nebo změňte heslo.",
            // time: 5000,
            // countdown: false,

            status: "info",
            text: "Požádat o odeslání nového kódu bude možné za: ",
            time: 30000,
            countdown: true,

            showModal: false
        }
    },
    watch: {
        code(value){
            if(value.length == 4)
                this.disable = false
            else 
                this.disable = true
            document.getElementById("error").innerText = "";
        }
    },
    methods:{
        async submit()
        {
            if(this.code.length == 4)
            {
                const result = await verifyCode({code: this.code}, this.email);
                
                if(result === '')
                {
                    this.$emit('close', true)
                }
                else if(result === 'Incorrect authentication code'){
                    document.getElementById("error").innerHTML = "Nesprávný ověřovací kód. Prosím zkontrolujte <br/> jeho správnost nebo požádejte o nový.";
                    var x = document.querySelectorAll(".otp-input")
                    x.forEach(x => x.classList.add('error'))
                }
                else if(result == 'Email already verified')
                {
                    document.getElementById("error").innerText = "Email již prošel verifikací, prosím pokračujte v dalším kroku";
                    document.getElementById("error").style.color = 'green';
                    var x = document.querySelectorAll(".otp-input")
                    x.forEach(x => x.classList.add('success'))
                    setTimeout(() => {
                        this.$emit('close')
                    }, 3000);
                }
                else if(result == 'No registration for email [null] found')
                {
                    document.getElementById("error").innerHTML = "Prosím, zadejte nejdříve svůj email.";
                    var x = document.querySelectorAll(".otp-input")
                    x.forEach(x => x.classList.add('error'))
                    setTimeout(() => {
                        this.$emit('setEmail')
                    }, 3000);
                }
                else{
                    document.getElementById("error").innerText = result;
                    var x = document.querySelectorAll(".otp-input")
                    x.forEach(x => x.classList.add('error'))
                }                   
            }
            else
            {
                document.getElementById("error").innerText = "Neplatná délka, kód musí obsahovat 4 číslice";
                var x = document.querySelectorAll(".otp-input")
                x.forEach(x => x.classList.add('error'))
            }
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
    max-height: 390px;
    height: 54vh;
    width: 42vw;
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
.heading p, .heading a, .desc, label, .tryagain{
    font-family: 'Inter', sans-serif;
}
.heading p, .heading a, label{
    font-size: 12px;
}
.desc, .tryagain{
    font-size: 14px;
}
.desc span{
    font-weight: bold;
}
.verify{
    display: flex;
    justify-content: center;
}
.code{
    display: flex;
    flex-direction: column;
    align-items: center;
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
        height: 80vh;
        gap: 20px;
    }
    .code{
        gap: 2px;
    }
  }
</style>