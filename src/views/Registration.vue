<template lang="cs">
    <Reg-Email v-if="this.stepp == 1" @close="moveNext" />
    <Reg-Verification v-else-if="this.stepp == 2" @close="moveNextVerified" />
    <Reg-Passwd :emailVerified="this.emailVerified" v-else-if="this.stepp == 3" @close="moveNext" @verify="verify" />
</template>
<script>
import RegEmail from '@/components/RegEmail.vue';
import RegVerification from '@/components/RegVerification'
import RegPasswd from '@/components/RegPasswd'
export default {
    components: {
        RegEmail,
        RegVerification,
        RegPasswd
    },
    data(){
        return{
            stepp: null,
            emailVerified: false
        }
    },
    created(){
        this.stepp = window.sessionStorage.getItem("step") ?? 1;
    },
    methods:{
        moveNext(info){
            window.sessionStorage.setItem("step", ++this.stepp);
            this.stepp = window.sessionStorage.getItem("step");
        },
        moveNextVerified(info){
            this.moveNext(info);
            this.emailVerified = info;
        },
        verify()
        {
            if(window.sessionStorage.getItem("email"))
                window.sessionStorage.setItem("step","2");
            else
                window.sessionStorage.setItem("step","1");
            this.stepp = window.sessionStorage.getItem("step");
        }
    }
}
</script>

<style scoped>
  
</style>
