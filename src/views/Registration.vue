<template lang="cs">
    <Reg-Email v-if="this.stepp == 1" @close="moveNext" />
    <Reg-Verification v-else-if="this.stepp == 2" @close="moveNext" @setEmail="goBack"/>
    <Reg-Passwd v-else-if="this.stepp == 3" @close="moveNext" @verify="verify" />
    <Reg-Info v-else-if="this.stepp == 4" @save="save" @setpasswd="goBack"/>
    <Reg-State v-else-if="this.stepp == 5" @tryagain="tryagain" @toLogin="toLogin"/>
</template>
<script>
import RegEmail from '@/components/RegEmail.vue';
import RegVerification from '@/components/RegVerification.vue'
import RegPasswd from '@/components/RegPasswd.vue'
import RegInfo from '@/components/RegInfo.vue';
import RegState from '@/components/RegState.vue';

export default {
    components: {
        RegEmail,
        RegVerification,
        RegPasswd,
        RegInfo,
        RegState
    },
    data(){
        return{
            stepp: null,
            completed: null
        }
    },
    created(){
        this.stepp = window.sessionStorage.getItem("step") ?? 1;
    },
    methods:{
        moveNext(){
            window.sessionStorage.setItem("step", ++this.stepp);
            this.stepp = window.sessionStorage.getItem("step");
        },
        verify()
        {
            if(window.sessionStorage.getItem("email"))
                window.sessionStorage.setItem("step","2");
            else
                window.sessionStorage.setItem("step","1");
            this.stepp = window.sessionStorage.getItem("step");
        },
        goBack()
        {
            window.sessionStorage.setItem("step",--this.stepp);
            this.stepp = window.sessionStorage.getItem("step")
        },
        save(value)
        {
            window.sessionStorage.setItem("completed", value)
            this.moveNext();
        },
        tryagain()
        {
            window.sessionStorage.clear()
            this.stepp = 1;
        },
        toLogin()
        {
            window.sessionStorage.clear()
            this.$router.push('/login') 
        }
    }
}
</script>

<style scoped>
  
</style>
