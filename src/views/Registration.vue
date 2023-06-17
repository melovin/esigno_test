<template lang="cs">
    <Reg-Email v-if="this.stepp == 1" @close="moveNext" />
    <Reg-Verification v-else-if="this.stepp == 2" @close="moveNext" />
    <Reg-Passwd v-else-if="this.stepp == 3" @close="moveNext" />
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
            stepp: null
        }
    },
    created(){
        this.stepp = window.sessionStorage.getItem("step") ?? 1;
    },
    methods:{
        moveNext(info){
            console.log(info)
            window.sessionStorage.setItem("step", ++this.stepp)
            this.stepp = window.sessionStorage.getItem("step");
        }
    }
}
</script>

<style scoped>
  
</style>
