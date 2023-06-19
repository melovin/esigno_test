<template lang="cs">
    <div class="wrapper">
        <div class="content">
            <div class="heading">
                <h2>Zadejte kód</h2>
                <a href="">Zpět na přihlášení</a>
            </div>
            <p class="desc">Potřebujeme ověřit vaši identitu, zadejte prosím ověřovací <br/> PIN kód, který jsme vám poslali na e-mail <br/> <span>{{this.email}}</span>.</p>
            <div class="verif">
                <div class="code">
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
                    <!-- @on-change="handleOnChange"
                    @on-complete="handleOnComplete" -->
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
            <infobox :data="this.status" v-if="this.showModal" @closemodal="this.showModal=false" />
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
import infobox from "./infobox.vue"
import {verifyCode} from "@/services/user-service"
export default {
    emits: [
        'close',
    ],
    components:{
        infobox
    },
    data(){
        return{
            email: window.sessionStorage.getItem("email"),
            code: "",
            disable: true,
            status: "ok",
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
                        this.$emit('close', true)
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

.show{
    display: flex;
}
.verif{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
.tryagain{
    font-family: 'Inter', sans-serif;
    font-size: 14px;
}
.tryagain a{
    cursor: pointer;
}
.code{
    display: flex;
    justify-content: center;
}
.disabled {
    opacity: 0.5;
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
#error{
    color: red;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    margin-top: 5px;
}
.wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    
}
.content{
    display: flex;
    flex-direction: column;
    width: 460px;
    height: 300px;
    padding: 32px;
    background-color: #F7F9FA;
    gap: 32px;
}
P{
    margin: 0;
}
.heading{
    display: flex;
    align-items: baseline;
    justify-content: space-between;
}
.heading h2{
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    margin: 0;
}
.heading a{
    font-family: 'Inter', sans-serif;
    font-size: 12px;
}
.heading p, .desc, label{
    font-family: 'Inter', sans-serif;
}
label{
    display: block;
}
.heading p, label{
    font-size: 12px;
}
.desc{
    font-size: 14px;
}
.desc span{
    font-weight: bold;
}
a, a:visited{
    color: #327DDA;
}
input{
    height: 30px;
    border: solid 1px #BDBDBD;
    border-radius: 4px;
    padding: 0;
    width: calc(100% - 2px);
}
input:focus{
    outline: solid 1px #BDBDBD;
}
button{
    width: 100%;
    height: 45px;
    border-radius: 4px;
    background-color: #327DDA;
    border: none;
    color:white;
}
button:disabled{
    opacity: 50%;
}
</style>