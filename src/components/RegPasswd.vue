<template lang="cs">
    <div class="content" v-if="verified">
        <div class="error">
            <div class="errInfo">
                <img id="status" src="status/status_mailError.svg" alt="status icon"/>
                <p id="message">Ověřte prosím nejprve svůj e-mail.</p>       
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="exit">Ověřit e-mail</button>
            </div>
        </div>
    </div>
    <div class="wrapper">
        <div class="maincontent">
            <div class="heading">
                <h2>Tvorba hesla</h2>
                <a href="">Zpět na přihlášení</a>
            </div>
            <p class="desc">Děkujeme za vaše ověření. Nyní si můžete nastavit heslo. <br/> Dbejte prosím, aby heslo bylo dostatečně silné a <br/> neobsahovalo vaše iniciály či jiné snadno uhodnutelné slova.</p>
            <div>
                <label for="password">Heslo</label>
                <div class="bcg">
                    <input autocomplete="on" :type="this.type" name="password" id="passwd" v-model="passwd" @keydown.enter="onEnter" />
                    <img id="visibilityIcon" src="passwd/passwd_invisible.svg" @click="changeVisibility"/>
                </div>
                <p id="error"></p>
            </div>
            <ul>
                <li>
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Obsahuje alespoň 8 znaků</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Obsahuje jak malá písmena (a-z), tak velká (A-Z)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Obsahuje alespoň jednu číslici (0-9)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Obsahuje alespoň jeden speciální znak (@, #, /)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Neobsahuje Vaši e-mailovou adresu</p>
                </li>
                <!-- there is no way to check this, info about account is on next the step -->
                <!-- <li> 
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Neobsahuje Vaše jméno a příjmení</p>
                </li> -->
            </ul>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Vytvořit a pokračovat</button>
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
    props: [
        'emailVerified'
    ],
    emits: [
        'close',
        'verify'
    ],
    data(){
        return{
            passwd: "",
            verified: this.emailVerified,
            type: "password",
            disable: true,
            accetable: false
        }
    },
    watch: {
        passwd(value){
            //regex na heslo
            const regex = /^[^()]{8,}$/;
            var string = '[A-Z]+[a-z]+[0-9]+[@#$%^&+=]+[^'+ window.sessionStorage.getItem("email") +'].{8,}'
            const regex2 = new RegExp(string, 'g')
            this.accetable = regex2.test(value);
            if(this.accetable)
                this.disable = false
            else 
                this.disable = true
            document.getElementById("error").innerText = "";
        }
    },
    methods:{
        submit()
        {
            if(this.passwd === "1234")
                this.$emit('close', this.passwd)
            else
                console.log("nene");
        },
        exit()
        {
            this.$emit('verify')
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
            if(!this.verified)
            {
                console.log("verify email")
            }
            if(this.accetable)
            {
                console.log("accept passwd")
            }
            else
                document.getElementById("error").innerText = "Heslo je ve špatném formátu.";
                 
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
.bcg{
    display: flex;
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
input[type="password"] {
    -webkit-text-security: square;
  }
li{
    display: flex;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    color: #888888;
}
li img{
    margin-right: 5px;
}
ul{
    margin-top: 0;
}
.error{
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 23px;
    color: #E4162F;
    background-color: #FBDCE0;
    border: none;
    display: flex;
    flex-direction: column;
}
.errInfo{
    align-items: center;
    display: flex;
}
.content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}
button{
    width: 100%;
    height: 45px;
    border-radius: 4px;
    background-color: #327DDA;
    border: none;
    color:white;
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
    width: 50%;
}
.wrapper{
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
    
}
.maincontent{
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
input:focus{
    outline: solid 1px #BDBDBD;
}
button:disabled{
    opacity: 50%;
}
</style>