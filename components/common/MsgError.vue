<script setup lang="ts">
    const props = defineProps<{
        mensagem: string
    }>()
</script>

<template>
    <span>
        {{ mensagem }}
    </span>
</template>