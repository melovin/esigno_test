<template lang="cs">
    <Reg-Email v-if="this.stepp == 1" @close="moveNext" />
    <Reg-Verification v-else-if="this.stepp == 2" @close="moveNext" />
    <Reg-Passwd v-else-if="this.stepp == 3" @close="moveNext" @verify="verify" />
    <Reg-Info v-else-if="this.stepp == 4" @close="moveNext" @setpasswd="setpasswd"/>
</template>
<script>
import RegEmail from '@/components/RegEmail.vue';
import RegVerification from '@/components/RegVerification.vue'
import RegPasswd from '@/components/RegPasswd.vue'
import RegInfo from '@/components/RegInfo.vue';
export default {
    components: {
        RegEmail,
        RegVerification,
        RegPasswd,
        RegInfo
    },
    data(){
        return{
            stepp: null,
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
        setpasswd()
        {
            window.sessionStorage.setItem("step",--this.stepp);
        }
    }
}
</script>

<style scoped>
  
</style>
