<template lang="cs">
    <div class="modal">
        <div class="retrySend">
            <img id="status" alt="status icon"/>
            <p id="message"></p>       
        </div>
    </div>
</template>
<script>
export default {
    props: [
        'type',
        'text',
        'time',
        'countdown'
    ],
    emits:[
        'closemodal'
    ],
    mounted(){
        var x = document.querySelectorAll(".retrySend");
        x.forEach( x => x.classList.add(this.type));
        document.getElementById("status").src="status/status_"+ this.type + ".svg";
        if(this.countdown == true)
        {
            var display = this.time / 1000
            //in timeout this.text was not working :(
            var text = this.text
            var mess = document.getElementById("message");           
            mess.innerHTML = `${text} ${display--}s`;
            
            var y = setInterval(function() {
                mess.innerHTML = `${text} ${display--}s`;
            }, 1000);

            setTimeout(() => {
                    var x = document.querySelectorAll(".retrySend");
                    x.forEach( x => x.classList.remove(this.type));
                    clearInterval(y)
                    this.$emit('closemodal', true)
                }, this.time);
        }
        else
        {
            document.getElementById("message").innerHTML = this.text
            setTimeout(() => {
                var x = document.querySelectorAll(".retrySend");
                x.forEach( x => x.classList.remove(this.type));
                this.$emit('closemodal', true)
            }, this.time);
        }
            
    }
}
</script>
<style scoped>
.modal{
    width: 100%;
}
.retrySend{
    display: none;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    padding: 23px 0 23px 12px ;
    align-items: center;
    border-radius: 4px;
    margin-top: 15px;
    padding-left: 32px;
}
.retrySend.warning{
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