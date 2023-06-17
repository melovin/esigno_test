<template lang="cs">
    <div>
        verificatiooon
        <input type="number" name="code" v-model="code" />
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
            code: ""
        }
    },
    methods:{
        submit()
        {
            if(this.code == "1234")
                this.$emit('close', this.code)
            else
                console.log("nene");
        }
    }
}
</script>
<style scoped>
    
</style>