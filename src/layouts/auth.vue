<template lang="cs">
    <div class="content">
        <aside>
             <div class="info">
                <picture>
                    <img class="logo" src="@/assets/logo.svg"/>
                </picture>
                <div class="text">
                    <h1>Digitální kancelář</h1>
                    <p>Šetří Váš čas i peníze</p>
                </div>
                <div class="bottom">
                    <div class="logos">
                        <img src="Logos/gdpr-ready-badge-text_1.svg" />
                        <img src="Logos/eidas-ready-logo_1.svg" />
                        <img src="Logos/qes_2014_stamp_iso9001_gr_poz.svg" />
                        <img src="Logos/qes_2014_stamp_iso27001_gr_poz.svg" />
                    </div>
                    <p class="copy">Copyright © NUBEO Technologies, s.r.o.</p>
                </div>
                
             </div>
        </aside>
        <slot/>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
/*font-family: 'Inter', sans-serif;*/
/*font-family: 'Nunito Sans', sans-serif;*/
.content{
    display: flex;
    height: 100%;
}
aside{
    background: linear-gradient(82.92deg, #545CE4 0%, #E698F8 0.01%, #499AF7 100%);;
    width: 50%;
    height: 100%;
}
.info{
    margin-left: 150px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.info .logo{
    padding-top: 32px;
}
.text{
    color: #485C6D;
    font-family: 'Nunito Sans', sans-serif;
    
}
.text h1{
    font-size: 40px;
    margin-bottom: 0;
}
.text p{
    font-size: 24px;
    
}
.logos img{
    margin-right: 13px;
}
.bottom p{
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    font-weight: 500;
}
.copy{
    margin-bottom: 32px;
}
</style>