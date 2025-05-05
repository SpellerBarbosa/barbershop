<script setup lang="ts">
type IMensagem = {
    mensagem:String,
    state: Boolean
}

const props = defineProps<IMensagem>();
</script>

<template>
  <span
    :class="[
      'bg-[#ff000098] w-[50px] h-[50px] rounded-full grid place-items-center font-semibold tracking-wider text-white uppercase text-xs absolute top-10 left-[50%] -translate-x-[50%] opacity-0',
      state ? 'transition-all duration-1000 w-[80%] opacity-100 md:w-[50%] lg:w-[25%]' : 'transition-all duration-500 w-[50px] h-[50px]',
    ]"
  >
    <p :class="['opacity-0', state ? 'opacity-100 delay-1000 transition-all duration-700' : 'transition-all duration-500']">{{ mensagem }}</p>
  </span>
</template>
