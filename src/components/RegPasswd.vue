<template lang="cs">
    <div>
        passwddd
        <input type="password" name="password" v-model="passwd" />
        <button type="button" @click="submit">move</button>
    </div>
</template>
<script>
export default {
    emits: [
        'close'
    ],
    data(){
        return{
            passwd: ""
        }
    },
    methods:{
        submit()
        {
            if(this.passwd === "1234")
                this.$emit('close', this.passwd)
            else
                console.log("nene");
        }
    }
}
</script>
<style scoped>
    
</style>