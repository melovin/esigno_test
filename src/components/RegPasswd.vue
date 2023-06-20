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
                <label for="passwd">Heslo</label>
                <div class="bcg">
                    <input autocomplete="on" :type="this.type" name="password" id="passwd" v-model="passwd" @keydown.enter="onEnter" />
                    <img id="visibilityIcon" src="passwd/passwd_invisible.svg" @click="changeVisibility"/>
                </div>
                <p id="error"></p>
            </div>
            <ul>
                <li>
                    <img src="passwd/passwd_gray.svg" id="1img"/>
                    <p id="1req">Obsahuje alespoň 8 znaků</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg" id="2img"/>
                    <p id="2req">Obsahuje jak malá písmena (a-z), tak velká (A-Z)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg" id="3img"/>
                    <p id="3req">Obsahuje alespoň jednu číslici (0-9)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg" id="4img" />
                    <p id="4req">Obsahuje alespoň jeden speciální znak (@, #, /)</p>
                </li>
                <li>
                    <img src="passwd/passwd_gray.svg" id="5img"/>
                    <p id="5req">Neobsahuje Vaši e-mailovou adresu</p>
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
            accetable: false,
        }
    },
    watch: {
        passwd(value){
            //regex na heslo
            this.disable = false
            let pattern = /^[^ ]{8,}$/g;
            if(pattern.test(value))
            {
                document.getElementById("1req").style.color = 'green';
                document.getElementById("1img").src = 'passwd/passwd_green.svg';

            }
            else{
                document.getElementById("1req").style.color = '#888888';
                document.getElementById("1img").src = 'passwd/passwd_gray.svg';
                this.disable = true
            }
            pattern = /(?=.*[A-Z])(?=.*[a-z])/g;
            if(pattern.test(value))
            {
                document.getElementById("2req").style.color = 'green';
                document.getElementById("2img").src = 'passwd/passwd_green.svg';
            }
            else{
                document.getElementById("2req").style.color = '#888888';
                document.getElementById("2img").src = 'passwd/passwd_gray.svg';
                this.disable = true
            }
            pattern = /(?=.*[0-9])/g;
            if(pattern.test(value))
            {
                document.getElementById("3req").style.color = 'green';
                document.getElementById("3img").src = 'passwd/passwd_green.svg';
            }
            else{
                document.getElementById("3req").style.color = '#888888';
                document.getElementById("3img").src = 'passwd/passwd_gray.svg';
                this.disable = true
            }
            pattern = /(?=.*[`´!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/g;
            if(pattern.test(value))
            {
                document.getElementById("4req").style.color = 'green';
                document.getElementById("4img").src = 'passwd/passwd_green.svg';

            }
            else{
                document.getElementById("4req").style.color = '#888888';
                document.getElementById("4img").src = 'passwd/passwd_gray.svg';
                this.disable = true
            }           
            if(value != "" && !value.includes(window.sessionStorage.getItem("email")))
            {
                document.getElementById("5req").style.color = 'green';
                document.getElementById("5img").src = 'passwd/passwd_green.svg';

            }
            else{
                document.getElementById("5req").style.color = '#888888';
                document.getElementById("5img").src = 'passwd/passwd_gray.svg';
                this.disable = true
            }
            // if(this.accetable)
            //     this.disable = false
            // else 
            //     this.disable = true
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