<template lang="cs">
    <div class="retrySend">
        <img ref="hihi" id="status" src="" alt="status icon"/>
        <p ref="haha" id="message"></p>       
    </div>
</template>
<script>
export default {
    props: [
        'data'
    ],
    emits:[
        'closemodal'
    ],
    data(){
        return{
            status: this.data,
            email: window.sessionStorage.getItem("email")
        }
    },
    mounted() //this section should be redone to make it reusable (send message to component, possibility to add button...)
    {
        if(this.status == "ok")
            {
                var x = document.querySelectorAll(".retrySend");
                x.forEach( x => x.classList.add("ok"));
                document.getElementById("message").innerHTML = "Nový kód Vám byl odeslán na e-mail: <br/>" + this.email
                document.getElementById("status").src="status/status_positive.svg";
                setTimeout(() => {
                    var x = document.querySelectorAll(".retrySend");
                    x.forEach( x => x.classList.remove("ok"));
                    this.$emit('closemodal', true)
                }, 5000);
            }
            else if(this.status == "error")
            {
                var x = document.querySelectorAll(".retrySend");
                x.forEach( x => x.classList.add("error"));
                document.getElementById("message").innerHTML = "Nastala chyba při odesílání e-mailu, prosím zkuste to znovu."
                document.getElementById("status").src="status/status_error.svg";
                setTimeout(() => {
                    var x = document.querySelectorAll(".retrySend");
                    x.forEach( x => x.classList.remove("error"));
                    this.$emit('closemodal', true)
                }, 5000);
            }
            else if(this.status == "info"){
                console.log("opeeen")
                var display = 30;
                var mess = document.getElementById("message");
                mess.innerText = "Požádat o odeslání nového kódu bude možné za: " + display-- + 's';
                var y = setInterval(function() {
                    mess.innerText = "Požádat o odeslání nového kódu bude možné za: " + display-- + 's';
                }, 1000);

                var x = document.querySelectorAll(".retrySend");
                x.forEach( x => x.classList.add("info"));          
                var img = document.getElementById("status");   
                img.src="status/status_info.svg";
                
                setTimeout(() => {
                    var x = document.querySelectorAll(".retrySend");
                    x.forEach( x => x.classList.remove("info"));
                    clearInterval(y)
                    this.$emit('closemodal', true)
                }, 30000);
            }
            else{
                document.getElementById("status").src="status/status_mailError.svg";
                document.getElementById("message").innerHTML = "Účet se zadaným e-mailem existuje, prosím <br/> přihlaste se nebo změňte heslo.";
                var x = document.querySelectorAll(".retrySend");
                x.forEach( x => x.classList.add("emailError"));
            }
    }
}
</script>
<style scoped>
.retrySend{
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 23px 0 23px 12px ;
    align-items: center;
}
.retrySend.emailError{
    display: flex;
    color: #E47410;
    background-color: #FBEADB;
}
.retrySend.ok{
    display: flex;
    color: #409230;
    background-color: #E2EFE0;
}
.retrySend.error{
    display: flex;
    color: #E4162F;
    background-color: #FBDCE0;
    border: none;
}
.retrySend.info{
    display: flex;
    color: #327DDA;
    background-color: #E0ECF9;
}
.retrySend p{
    margin-left: 12px;
}
</style>