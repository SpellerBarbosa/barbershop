<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import usePerfilStore from "~/store/usePerfilStore";

const serviceMenu = ref<boolean>(false);
const appoitmetsMenu = ref<boolean>(false);
const useProfile = usePerfilStore();
const router = useRouter();

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

const logout = async () => {
  await $fetch("/api/auth/logout");
  useProfile.user = null;
  router.push("/login");
};

const goToDasboard = () => {
  if (useProfile.isUser) return router.push("/client/dashboard");
};

const goToBook = () => {
  if (useProfile.isUser) return router.push("/client/service/book");
};

const goToMyAppointments = () => {
  if (useProfile.isUser) return router.push("/client/service/my-appointments");
};
</script>

<template>
  <header
    class="w-screen h-[10vh] fixed bottom-0 bg-[#202020] flex justify-center items-center"
  >
    <nav class="w-[100%] h-[100%] flex items-center justify-evenly">
      <ul class="w-full h-full flex items-center justify-evenly">
        <li class="flex flex-col h-full justify-around" @click="goToDasboard()">
          <span class="material-symbols-outlined">home</span>
          <p class="uppercase text-[10px] font-semibold text-[#c6a765]">
            inicio
          </p>
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
            <li
              class="flex flex-col h-full items-center justify-around"
              @click="goToBook()"
            >
              <span class="material-symbols-outlined">edit_calendar</span>
              <p class="uppercase text-[12px] font-semibold text-[#c6a765]">
                Agendar
              </p>
            </li>
          </ul>
        </li>

        <li
          class="flex flex-col h-full justify-around cursor-pointer"
          @click="
            () => {
              toggleAppointments();
            }
          "
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
            <li
              class="flex flex-col h-full items-center justify-around"
              @click="goToMyAppointments()"
            >
              <span class="material-symbols-outlined">event</span>
              <p
                class="uppercase text-[12px] font-semibold text-[#c6a765] text-center"
              >
                Meus<br />Agendamentos
              </p>
            </li>
          </ul>
        </li>
        <li
          class="flex flex-col h-full justify-around cursor-pointer"
          @click="logout()"
        >
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
