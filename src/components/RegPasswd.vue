<template lang="cs">
    <div class="content" v-if="!verified">
        <div class="errorVerif">
            <div class="errInfo">
                <img id="status" src="status/status_mailError.svg" alt="status icon"/>
                <p id="message">Ověřte prosím nejprve svůj e-mail.</p>       
            </div>
            <div class="verifBtn">
                <button type="button" @click="exit">Ověřit e-mail</button>
            </div>
        </div>
    </div>
    <div class="wrapper" v-if="verified">
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
                <!-- there is no way to check this, info about account is on the next step -->
                <!-- <li> 
                    <img src="passwd/passwd_gray.svg"/>
                    <p>Neobsahuje Vaše jméno a příjmení</p>
                </li> -->
            </ul>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Vytvořit a pokračovat</button>
            </div>
        </div>
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
import { verifyCode, setPassword } from '@/services/user-service';
export default {
    emits: [
        'close',
        'verify'
    ],
    data(){
        return{
            passwd: "",
            verified: true,
            type: "password",
            disable: true,
            accetable: false,
        }
    },
    async created()
    {
        const result = await verifyCode({code: ""}, window.sessionStorage.getItem("email"));
        if(result !== "Email already verified")
            this.verified = false;
    },
    watch: {
        passwd(value){
            this.disable = false
            this.accetable = true;

            let pattern = /^.{8,}$/g;
            this.checkPassword(pattern.test(value), 1)

            pattern = /(?=.*[A-Z])(?=.*[a-z])/g;
            this.checkPassword(pattern.test(value), 2)

            pattern = /(?=.*[0-9])/g;
            this.checkPassword(pattern.test(value), 3)

            pattern = /(?=.*[`´!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~])/g;
            this.checkPassword(pattern.test(value), 4)

            this.checkPassword(value != "" && !value.includes(window.sessionStorage.getItem("email")), 5)

            document.getElementById("error").innerText = "";
        }
    },
    methods:{
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
            if(this.accetable)
            {
                const result = await setPassword({password: this.passwd}, window.sessionStorage.getItem("email"))
                if(result == "")
                    this.$emit('close')
                else if(result == "Password already created")
                {
                    var element = document.getElementById("error");
                    element.innerText = "Heslo pro účet " + window.sessionStorage.getItem("email") + " bylo již vytvořeno, pokračujte prosím v dalším kroku.";
                    element.style.color = '#409230';
                    element.style.width = '100%';
                    setTimeout(() => {
                        this.$emit('close')
                    }, 5000);
                }
                else
                    document.getElementById("error").innerText = result;
            }
            else
                document.getElementById("error").innerText = "Heslo je ve špatném formátu.";
                 
        },
        onEnter: function(){
            this.submit();
        },
        checkPassword(isValid, numberOfReq)
        {
            if(isValid)
            {
                document.getElementById(numberOfReq + "req").style.color = '#409230';
                document.getElementById(numberOfReq + "img").src = 'passwd/passwd_green.svg';

            }
            else{
                document.getElementById(numberOfReq + "req").style.color = '#888888';
                document.getElementById(numberOfReq + "img").src = 'passwd/passwd_gray.svg';
                this.disable = true
                this.accetable = false
            }
        }
    }
}
</script>
<style scoped>
/*font-family: 'Inter', sans-serif;*/
/*font-family: 'Nunito Sans', sans-serif;*/
.content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
}
.maincontent{
    display: flex;
    flex-direction: column;
    max-width: 460px;
    max-height: 415px;
    height: 70vh;
    width: 70vw;
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
.heading p, .heading a, .desc, label{
    font-family: 'Inter', sans-serif;
}
.heading p, .heading a, label{
    font-size: 12px;
}
.desc{
    font-size: 14px;
}
.desc span{
    font-weight: bold;
}
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
ul{
    margin-top: 0;
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
.errorVerif{
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 23px;
    color: #E4162F;
    background-color: #FBDCE0;
    border: none;
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    gap: 20px;
    border-radius: 10px;
}
.verifBtn{
    width: 100%;
}
.errInfo{
    align-items: center;
    display: flex;
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