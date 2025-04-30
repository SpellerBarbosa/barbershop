<script setup lang="ts">
    const props = defineProps({
        mensagem: {type: String, required: true}
    })
</script>

<template>
    <span>
        {{ mensagem }}
    </span>
</template>