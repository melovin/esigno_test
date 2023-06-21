<template lang="cs">
    <div class="content" v-if="!passwdSet">
        <div class="errorVerif">
            <div class="errInfo">
                <img id="status" src="status/status_mailError.svg" alt="status icon"/>
                <p id="message">Nastavte si prosím nejprve heslo.</p>       
            </div>
            <div class="verifBtn">
                <button type="button" @click="exit">Nastavit heslo</button>
            </div>
        </div>
    </div>
    <div class="wrapper" v-if="passwdSet">
        <div class="maincontent">
            <h2>Údaje k registrovanému účtu</h2>
            <p class="desc">Pro úspěšnou registraci prosím vyplňte následující údaje k <br/> vašemu účtu.</p>
            <div>
                <div class="inputs">
                    <div>
                        <label for="name">Jméno</label>
                        <input autocomplete="on" type="text" name="name" id="name" v-model="name" @keydown.enter="onEnter" />
                        <p id="errorname"></p>
                    </div>
                    <div>
                        <label for="surname">Příjmení</label>
                        <input autocomplete="on" type="text" name="surname" id="surname" v-model="surname" @keydown.enter="onEnter" />
                        <p id="errorsurname"></p>
                    </div>
                </div>
                <label for="company">Společnost</label>
                <input autocomplete="on" type="text" name="company" id="company" v-model="company" @keydown.enter="onEnter" />
                <p id="error"></p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Dokončit registraci</button>
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
import { setDetails } from '@/services/user-service';
export default {
    emits: [
        'close',
        'setpasswd'
    ],
    data(){
        return{
            company: "",
            name: "",
            surname: "",
            passwdSet: true,
            disable: true,
        }
    },
    watch: {
        company(value){
            this.disable = !(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
        },
        name(value){
            const name = document.getElementById("errorname")
            this.disable = !(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
            if(!(/[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name)))
            {
                name.innerText = "Jméno musí začínat velkým písmenem."
            }
            else
                name.innerText = ""
        },
        surname(value){
            const surname = document.getElementById("errorsurname")
            this.disable = !(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
            if(!(/[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname)))
            {
                surname.innerText = "Příjmení musí začínat velkým písmenem."
            }
            else
                surname.innerText = ""
        }
    },
    methods:{
        exit()
        {
            this.$emit('setpasswd')
        },
        async submit()
        {
            if(!(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname)))
            {
                const result = await setDetails({givenName: this.name,surname: this.surname,company: this.company}, window.sessionStorage.getItem("email"))
                if(result == "")
                    this.$emit('close')
                else if(result == "No registration for email ["+window.sessionStorage.getItem("email") +"] found")
                    this.passwdSet = false;
                else
                    document.getElementById("error").innerText = result;
            }
            else
                document.getElementById("error").innerText = "Všechna pole jsou povinná.";
                 
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
.inputs{
    display: flex;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
}
.inputs div{
    flex: 1;
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
.content{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
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