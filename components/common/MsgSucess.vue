<script setup lang="ts">

const props = defineProps({
    mensagem: {
        type: String,
        required: true
    },
    state: Boolean
});
</script>

<template>
    <span :class="[
      'bg-[#00ff55ad] w-[50px] h-[50px] rounded-full grid place-items-center font-semibold tracking-wider text-white uppercase text-xs absolute top-10 left-[50%] -translate-x-[50%] opacity-0 text-center',
      state ? 'transition-all duration-1000 w-[80%] opacity-100 md:w-[50%] lg:w-[25%]' : 'transition-all duration-500 w-[50px] h-[50px]',
    ]">
    <p :class="['opacity-0', state ? 'opacity-100 delay-1000 transition-all duration-700 text-center' : 'transition-all duration-500']">
        {{ mensagem }} 
    </p>
    </span>
</template>
