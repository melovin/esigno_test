<template lang="cs">
    <div class="wrapper">
        <div class="content">
            <div class="heading">
                <h2>Registrace</h2>
                <p>Máte účet? <a href="">Přihlásit se</a></p>
            </div>
            <p class="desc">Na e-mail Vám bude zaslán ověřovací kód. Po ověření <br/>prosím pokračujte v dalších krocích registrace.</p>
            <div>
                <label for="email">E-mail</label>
                <input autocomplete="on" type="email" name="email" id="email" v-model="email" />
                <p id="error"></p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Pokračovat</button>
            </div>
        </div>
    </div>
</template>
<script>
// $(window).on('beforeunload', function(){
//     socket.close();
// });

import {validateEmail} from "@/services/user-service"
export default {
    emits: [
        'close'
    ],
    data(){
        return{
            email: "",
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