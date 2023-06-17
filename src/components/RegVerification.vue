<template lang="cs">
    <div class="wrapper">
        <div class="content">
            <div class="heading">
                <h2>Zadejte kód</h2>
                <a href="">Zpět na přihlášení</a>
            </div>
            <p class="desc">Potřebujeme ověřit vaši identitu, zadejte prosím ověřovací <br/> PIN kód, který jsme vám poslali na e-mail <br/> <span>{{this.email}}</span>.</p>
            <div class="code">
                <v-otp-input
                ref="otpInput"
                v-model:value="bindModal"
                input-classes="otp-input"
                separator=""
                :num-inputs="4"
                :should-auto-focus="true"
                input-type="letter-numeric"
                :conditionalClass="['one', 'two', 'three', 'four']"
                :placeholder="['', '', '', '']"
                @on-change="handleOnChange"
                @on-complete="handleOnComplete"
                />
                <p id="error"></p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Ověřit a pokračovat</button>
            </div>
        </div>
        <div class="bottom">
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
export default {
    emits: [
        'close'
    ],
    data(){
        return{
            email: window.sessionStorage.getItem("email"),
            code: null,
            disable: true
        }
    },
    watch: {
        email(value){
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                this.disable = false;
            else
                this.disable = true;
            document.getElementById("error").innerText = "";
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
                else
                    document.getElementById("error").innerText = result;
            }
            else
                console.log("nene");
        }
    }
}
</script>
<style scoped>
/*font-family: 'Inter', sans-serif;*/
/*font-family: 'Nunito Sans', sans-serif;*/
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