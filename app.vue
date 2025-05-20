<script setup lang="ts">
import usePerfilStore from './store/usePerfilStore';
import { onMounted } from 'vue';


const perfil = usePerfilStore();

onMounted(() =>{
   perfil.fetchProfile();
})

</script>


<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>
