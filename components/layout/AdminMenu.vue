<script setup lang="ts">
import { ref, type Ref } from "vue";
const serviceMenu = ref<boolean>(false);
const appoitmetsMenu = ref<boolean>(false);

const toggleService = () => {
  serviceMenu.value = !serviceMenu.value;
  if (appoitmetsMenu.value) {
    appoitmetsMenu.value = false;
  }
};

const toggleAppointments = () => {
  appoitmetsMenu.value = !appoitmetsMenu.value;
  if (serviceMenu.value) {
    serviceMenu.value = false;
  }
};
</script>

<template>
  <header
    class="w-screen h-[10vh] fixed bottom-0 bg-[#202020] flex justify-center items-center"
  >
    <!-- <button class="w-[50px] h-[50px] grid place-items-center hidden" @click="toggle()">
      <span
        :class="[
          'w-[100%] h-0.5 block bg-[#c6a765]',
          stateMenu
            ? 'trasition duration-500 origin-center rotate-45 translate-y-[16px]'
            : 'transition duration-500',
        ]"
      ></span>
      <span
        :class="[
          'w-[100%] h-0.5 block bg-[#c6a765]',
          stateMenu
            ? 'opacity-0 transition duration-500'
            : 'transition duration-500',
        ]"
      ></span>
      <span
        :class="[
          'w-[100%] h-0.5 block bg-[#c6a765]',
          stateMenu
            ? 'transition duration-500 origin-center -rotate-45 -translate-y-[16px]'
            : 'transition duration-500',
        ]"
      ></span>
    </button> -->
    <nav class="w-[100%] h-[100%] flex items-center justify-evenly">
      <ul class="w-full h-full flex items-center justify-evenly">
        <li class="flex flex-col h-full justify-around">
          <span class="material-symbols-outlined">home</span>
          <p class="uppercase text-[10px] font-semibold text-[#c6a765]">inicio</p>
        </li>

        <li
          class="flex flex-col h-full justify-around cursor-pointer"
          @click="toggleService()"
        >
          <span class="material-symbols-outlined">build</span>
          <p class="uppercase text-xs font-semibold text-[#c6a765]">Serviços</p>
          <ul
            :class="[
              'w-screen h-[10vh] absolute left-0 bottom-[10vh] bg-[#202020] border-b-[.5px] border-[#fff] flex justify-center items-center',
              serviceMenu ? 'flex justify-evenly' : 'hidden',
            ]"
          >
            <li class="flex flex-col h-full items-center justify-around">
              <span class="material-symbols-outlined">add_circle</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                Cadastrar
              </p>
            </li>
            <li class="flex flex-col h-full items-center justify-around">
              <span class="material-symbols-outlined">edit</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                alterar
              </p>
            </li>
          </ul>
        </li>

        <li
          class="flex flex-col h-full justify-around cursor-pointer"
          @click="toggleAppointments()"
        >
          <span class="material-symbols-outlined"> book_online</span>
          <p class="uppercase text-[10px] font-semibold text-[#c6a765]">
            agenda<br />mentos
          </p>
          <ul
            :class="[
              'w-screen h-[10vh] absolute left-0 bottom-[10vh] bg-[#202020] border-b-[.5px] border-[#fff] flex justify-center items-center',
              appoitmetsMenu ? 'flex justify-evenly' : 'hidden',
            ]"
          >
            <li class="flex flex-col h-full items-center justify-around">
              <span class="material-symbols-outlined">check_circle</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                concluidos
              </p>
            </li>
            <li class="flex flex-col h-full items-center justify-around">
              <span class="material-symbols-outlined">hourglass_empty</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                pendentes
              </p>
            </li>
            <li class="flex flex-col h-full items-center justify-around">
              <span class="material-symbols-outlined">cancel</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                cancelados
              </p>
            </li>
          </ul>
        </li>
        <li class="flex flex-col h-full justify-around">
          <span class="material-symbols-outlined">logout</span>
          <p class="uppercase text-[10px] font-semibold text-[#c6a765]">sair</p>
        </li>
      </ul>
    </nav>
  </header>
</template>
<style scoped>
.material-symbols-outlined {
  color: #c6a765;
  font-size: 30px;
  font-variation-settings: "FILL" 0, "wght" 300, "GRAD" 0, "opsz" 24;
}
</style>
