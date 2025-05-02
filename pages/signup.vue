<script setup lang="ts">
import InputLabel from "~/components/forms/InputLabel.vue";
import signupBtn from "~/components/forms/signupBtn.vue";
import Logo from "~/components/layout/Logo.vue";
import { ref } from "vue";
import MsgError from "~/components/common/MsgError.vue";
import MsgSucess from "~/components/common/MsgSucess.vue";
import axios from "axios";

const name = ref<string>("");
const email = ref<string>("");
const user = ref<string>("");
const password = ref<string>("");
const confirmPasword = ref<string>("");
const errorMsg = ref<string>("");
const sucessMsg = ref<string>("");
const isMatch = computed(() => password.value !== confirmPasword.value);
const isValid = ref<boolean>(false);
const isSubmitting = ref<boolean>(false);

const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const handlerSignup = async () => {
  if (
    !name.value ||
    !email.value ||
    !user.value ||
    !password.value ||
    !confirmPasword.value
  ) {
    errorMsg.value = "Todos os campos são obrigatórios";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3500);
    return;
  }

  if (!emailRegex.test(email.value)) {
    errorMsg.value = "Digite um email valido.";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3500);
    return;
  }

  if (password.value !== confirmPasword.value) {
    errorMsg.value = "As senhas devem ser iguais";
    setTimeout(() => {
      errorMsg.value = "";
    }, 3500);
    return;
  }

  isSubmitting.value = true;

  try {
    const response = await axios.post("/api/signup", {
      name: name.value.toLowerCase().trim(),
      email: email.value.toLowerCase().trim(),
      user: user.value.toLowerCase().trim(),
      password: password.value.trim(),
    });

    const data = response.data;

    if (response.status === 200) {
      sucessMsg.value = data.msg;
      setTimeout(() => {
        sucessMsg.value = "";
      }, 3500);

      return;
    }
  } catch (error: any) {
    console.log("Erro capturado:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.msg || error.response.data?.message;

      if (status === 400) {
        errorMsg.value = message || "Requisição inválida.";
      } else if (status === 500) {
        errorMsg.value = "Erro no servidor. Tente novamente mais tarde.";
      } else {
        errorMsg.value = `Erro inesperado. Código: ${status}`;
      }
    } else if (error.status === 500 || error.code === "ERR_BAD_RESPONSE") {
      // Caso o servidor nem responda direito
      errorMsg.value = "Erro no servidor. Tente novamente mais tarde.";
    } else if (error.request) {
      errorMsg.value = "Sem resposta do servidor.";
    } else {
      errorMsg.value = `Erro desconhecido: ${error.message}`;
    }

    setTimeout(() => {
      errorMsg.value = "";
    }, 3500);
  } finally {
    isSubmitting.value = false;
    name.value = "";
    email.value = "";
    user.value = "";
    password.value = "";
    confirmPasword.value = "";
  }
};
</script>

<template>
  <main
    class="w-screen h-screen bg-[url(/img/fundo.jpeg)] bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center">
    <Logo />
    <form
      class="w-[95%] h-[60vh] bg-[#000000b2] rounded-2xl grid place-items-center md:w-[70%] md:h-[50vh] lg:h-[60vh] lg:w-[50%] xl:w-[40%]"
      @submit.prevent="handlerSignup()">
      <InputLabel link="name" place="Digite seu nome" input_name="Digite seu nome" v-model="name" />
      <InputLabel link="email" place="email@email.com" input_name="Digite seu email" :state="isValid" v-model="email" />
      <InputLabel link="user" place="digite seu usuario" input_name="Digite um nome de usuario" v-model="user" />
      <InputLabel link="password" place="**********" input_name="Digite sua senha" type_input="password"
        v-model="password" :state="isMatch" />
      <InputLabel link="confirm-password" place="**********" input_name="confirme sua senha" type_input="password"
        v-model="confirmPasword" :state="isMatch" />
      <signupBtn btn-name="Cadastrar" btn-type="submit" :is-submitting="isSubmitting" />
    </form>
    <MsgError :mensagem="errorMsg" :state="!!errorMsg" />
    <MsgSucess :mensagem="sucessMsg" :state="!!sucessMsg" />
  </main>
</template>
