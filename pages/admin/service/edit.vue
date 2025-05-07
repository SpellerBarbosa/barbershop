<script setup lang="ts">
import useServiceStore from '~/store/useServiceStore';

const service = useServiceStore()

console.log(service.services)

</script>

<template>
    <main>
        <h1>Serviços cadastrados</h1>
    </main>
</template>