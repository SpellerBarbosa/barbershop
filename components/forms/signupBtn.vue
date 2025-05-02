<script setup lang="ts">
const props = defineProps<{
    btnName: String,
    btnType?: 'submit' | 'button' | 'reset'
    isSubmitting?: boolean
}> ()



const typeBtn = props.btnType || 'submit'
</script>

<template>
    <button :type="typeBtn" :disabled="isSubmitting" class="w-[150px] h-[50px] m-2 bg-[#c6a765] rounded-2xl font-bold uppercase text-sm tracking-wider">
        {{ isSubmitting ? 'Enviado ...': btnName }}
    </button>
</template>
