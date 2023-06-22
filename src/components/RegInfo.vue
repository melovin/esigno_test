<template lang="cs">
    <div class="content" v-if="!passwdSet">
        <div class="errorVerif">
            <div class="errInfo">
                <img id="status" src="status/status_error.svg" alt="status icon"/>
                <p id="message">Nastavte si prosím nejprve heslo.</p>       
            </div>
            <div class="verifBtn">
                <button type="button" @click="exit">Nastavit heslo</button>
            </div>
        </div>
    </div>
    <div class="wrapper" v-else>
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
                <p class="perm">Registrací vyjadřujete souhlas s <a>všeobecnými obchodními <br/> podmínkami</a> a <a>zásadami ochrany osobních údajů</a>.</p>
            </div>
            <div>
                <button :disabled="this.disable" type="button" @click="submit">Dokončit registraci</button>
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
import { setDetails } from '@/services/user-service';
export default {
    emits: [
        'setpasswd',
        'save'
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
            this.disable = !(value.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
        },
        name(value){
            const name = document.getElementById("errorname")
            this.disable = !(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(value) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
            if(!(/[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name)))
            {
                name.innerText = "Jméno musí začínat velkým písmenem."
            }
            else
                name.innerText = ""
        },
        surname(value){
            const surname = document.getElementById("errorsurname")
            this.disable = !(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(value))
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
            if(this.company.length > 0 && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.name) && /[A-ZĚŠČŘŽÝÁÍÉŤĎÓŇŮÚ][a-zěščřžýáíéťďóňůú]*/g.test(this.surname))
            {
                const result = await setDetails({givenName: this.name,surname: this.surname,company: this.company}, window.sessionStorage.getItem("email"))
                if(result == "")
                    this.$emit('save',true)
                else if(result == "No registration for email ["+window.sessionStorage.getItem("email") +"] found")
                    this.passwdSet = false;
                else
                    this.$emit('save',false)
            }
            else
                document.getElementById("error").innerText = "Všechna pole jsou povinná. Jméno a příjmení musí začínat velkým písmenem";
                 
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
    justify-content: center;
    align-items: center;
    width: 50%;
}
.maincontent{
    display: flex;
    flex-direction: column;
    max-width: 460px;
    max-height: 370px;
    height: 60vh;
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
.heading p, .heading a, .desc, label, .perm{
    font-family: 'Inter', sans-serif;
}
.heading p, .heading a, label, .perm{
    font-size: 12px;
}
.desc{
    font-size: 14px;
}
.desc span{
    font-weight: bold;
}
.inputs{
    display: flex;
    width: 100%;
    gap: 10px;
    margin-bottom: 10px;
}
.inputs div{
    flex: 1;
}
input{
    height: 35px;
    border: solid 1px #BDBDBD;
    border-radius: 4px;
    padding: 0;
    width: calc(100% - 2px);
    font-size: 14px;
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
img{
    margin-left: -40px;
    cursor: pointer;
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