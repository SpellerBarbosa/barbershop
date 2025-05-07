<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { api } from '~/store/usePerfilStore';

const route = useRoute()
const id = route.params.id

onMounted(async()=>{
    const response = await api.get(`/service/edit/${id}`) 
    console.log(response)
})
</script>
<template>
    <main>
        
    </main>
</template>