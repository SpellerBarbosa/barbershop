<script setup lang="ts">
import axios from "axios";
import { ref } from "vue";
import MsgError from "~/components/common/MsgError.vue";
import MsgSucess from "~/components/common/MsgSucess.vue";
import Logo from "~/components/layout/Logo.vue";
import Menu from "~/components/layout/SiteMenu.vue";
import clearMessage from "~/utils/clearMessage";
import { useRouter } from "vue-router";

const user = ref<string>("");
const password = ref<string>("");
const errorMsg = ref<string>("");
const sucessMsg = ref<string>("");
const cookie = useCookie("token");
const router = useRouter();
const isSubmiting = ref<boolean>(false);

const handleLogin = async () => {
  if (!user.value || !password.value) {
    errorMsg.value = "Usuario e password são obrigatórios.";
    clearMessage(errorMsg);
    return;
  }

  try {
    const response = await axios.post("/api/login", {
      user: user.value.toLowerCase().trim(),
      password: password.value.trim(),
    });

    const data = response.data;
    cookie.value = data.token;
    sucessMsg.value = data.message;
    user.value = "";
    password.value = "";
    isSubmiting.value = true;
    clearMessage(sucessMsg);
  } catch (error: any) {

    if (error.response.status >= 400) {
      errorMsg.value = error.response.data.message;
      clearMessage(errorMsg);
      return;
    }

    if (error.response.status >= 500) {
      errorMsg.value =
        error.response.data.message ||
        "Erro ao se conectar com o servidor, tente novamente mais tarde.";
      clearMessage(errorMsg);
    }
  } finally {
    isSubmiting.value = false;
  }
};
</script>

<template>
  <Menu />
  <main
    class="bg-[url(/img/fundo.jpeg)] w-screen h-screen bg-center bg-cover bg-no-repeat flex flex-col items-center justify-around"
  >
    <Logo />
    <form
      class="w-[90%] h-[40vh] bg-[#0303039c] flex flex-col justify-evenly items-center rounded-4xl md:w-[50%] md:h-[30vh] lg:w-[50%] xl:w-[35%]"
      @submit.prevent="handleLogin()"
    >
      <label
        for="user"
        class="w-[90%] h-[45px] border-2 rounded-md border-[#c6a765] overflow-hidden flex"
      >
        <span class="w-[15%]"
          ><img
            src="/img/tesoura.png"
            alt="icone de uma tesoura"
            class="w-[100%] bg-[#c6a765]"
        /></span>
        <input
          type="text"
          name="user"
          id="user"
          placeholder="Digite seu usuario ou email"
          class="w-[85%] text-center font-semibold outline-none text-[#ffca57]"
          v-model="user"
        />
      </label>

      <label
        for="password"
        class="w-[90%] h-[45px] border-2 rounded-md border-[#c6a765] overflow-hidden flex"
      >
        <span class="w-[15%] bg-[#c6a765]"
          ><img
            src="/img/navalha.png"
            alt="icone de uma tesoura"
            class="w-[80%]"
        /></span>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="**********"
          class="w-[85%] text-center uppercase font-semibold outline-none text-[#c6a765]"
          v-model="password"
        />
      </label>
      <section class="w-full flex justify-evenly">
        <button
          type="submit"
          class="uppercase border w-[150px] h-[50px] rounded-xl font-bold tracking-wider bg-[#c6a765] border-none cursor-pointer hover:bg-gray-700 hover:text-[#c6a765]"
          :disabled="isSubmiting"
        >
          Entrar
        </button>
        <button
          class="uppercase border w-[150px] h-[50px] rounded-xl font-bold tracking-wider bg-[#c6a765] border-none cursor-pointer hover:bg-gray-700 hover:text-[#c6a765]"
        >
          <nuxt-link to="/signup">Cadastre-se</nuxt-link>
        </button>
      </section>
    </form>
    <MsgError :mensagem="errorMsg" :state="!!errorMsg" />
    <MsgSucess :mensagem="sucessMsg" :state="!!sucessMsg" />
  </main>
</template>
