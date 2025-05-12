<script setup lang="ts">
import  useClickOutSide  from "../../composables/useClickOutSide";
import { ref } from "vue";

const stateMenu = ref<boolean>(false);
const menuRef = ref<HTMLElement | null>(null);

const toggleMenu = () =>{
    stateMenu.value = !stateMenu.value
}

useClickOutSide(menuRef, ()=>{
  stateMenu.value = false
})

</script>

<template>
  <header :class="['w-0 h-[100vh] bg-[#313131e3] transform transition-all duration-500 overflow-hidden absolute', stateMenu ? 'w-[80%] h-screen transition-all duration-500':' ']" ref="menuRef">
    <button
      class="w-[50px] h-[50px] grid place-items-center fixed top-3 left-3"
     @click="toggleMenu()">
      <span :class="['w-[100%] h-0.5 block bg-[#c6a765]', stateMenu ? 'trasition duration-500 origin-center rotate-45 translate-y-[16px]':'transition duration-500']"></span>
      <span :class="['w-[100%] h-0.5 block bg-[#c6a765]', stateMenu ? 'opacity-0 transition duration-500':'transition duration-500']"></span>
      <span :class="['w-[100%] h-0.5 block bg-[#c6a765]', stateMenu ? 'transition duration-500 origin-center -rotate-45 -translate-y-[16px]':'transition duration-500']"></span>
    </button>
    <nav :class="['w-0', stateMenu ? ' opacity-100 flex flex-col mt-[10vh] w-[100%] h-[90vh] justify-evenly items-center': '']">
      <ul :class="['w-[80%] h-[calc(85vh-150px)] mt-8 flex flex-col items-center uppercase gap-2 font-semibold tracking-wider text-[#c6a765]', stateMenu ? 'opacity-100 transition duration-500 delay-300': 'opacity-0']">
        <li><nuxt-link to="/">Inicio</nuxt-link></li>
        <li><nuxt-link to="/login">Entrar</nuxt-link></li>
        <li><nuxt-link to="/signup">Cadastrar</nuxt-link></li>
      </ul>
    </nav>
  </header>
</template>
