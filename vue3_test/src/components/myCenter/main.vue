<template>
 <Top></Top> 
 <Body></Body>
</template>

<script>
import Top from '@/general/top.vue';
import Body from './body/body.vue';
//hooks
import Pending from '@/hooks/ifPending'

export default {
    name:'Main',
    components: { Top, Body },
    setup(){
       let p = Pending;
       p.ifPending();
    }
}
</script>

<style>

</style>