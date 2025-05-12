<script setup lang="ts">
import InputLabel from "~/components/forms/InputLabel.vue";
import AdminMenu from "~/components/layout/admin/AdminMenu.vue";
import signupBtn from "~/components/forms/signupBtn.vue";
import clearErrors from "~/utils/clearErrors";
import usePerfilStore from "~/store/usePerfilStore";
import clearMessage from "../../../utils/clearMessage";
import MsgError from "~/components/common/MsgError.vue";
import MsgSucess from "~/components/common/MsgSucess.vue";
import { api } from "~/store/usePerfilStore";
import { ref } from "vue";
import type { IError } from "~/utils/types";

const service = ref<string>("");
const price = ref<string>("");
const messageError = ref<Partial<IError>>({});
const sucessMessage = ref<string>("");
const isSubmitting = ref<boolean>(false);
const perfil = usePerfilStore();


const handleSubmitService = async () => {
  if (!service.value) {
    messageError.value.service = "Preencha o campo serviço.";
    clearErrors(messageError);
    return;
  }

  if (!price.value) {
    messageError.value.price = "O Campo esta vazio";
    clearErrors(messageError);
    return;
  }

  const realPrice = price.value.replace(",", ".");

  if (isNaN(Number(realPrice))) {
    messageError.value.price = "O valor digitado não é um numero";
    clearErrors(messageError);
    return;
  }

  const parsedPrice = parseFloat(realPrice);

  if (parsedPrice < 0) {
    messageError.value.price = "Não e possivel cadastrar um valor negativo";
    clearErrors(messageError);
    return;
  }

  if (!perfil.userId) {
    messageError.value.verify =
      "Token não atenticado ou vencido faça login novamente.";
    clearErrors(messageError);
    return;
  }

  isSubmitting.value = true;
  
  try {
      const response = await api.post("/service/create-service", {
          service: service.value.toLowerCase().trim(),
          price: parsedPrice,
          userId: perfil.userId,
        });
        
        const data = response.data;
        
        sucessMessage.value = data.message;
        clearMessage(sucessMessage);
        service.value = "";
        price.value = "";
  } catch (error: any) {
    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.msg || error.response.data?.message;

      if (status === 400) {
        messageError.value.request = message || "Requisição invalida";
        clearErrors(messageError);
      } else if (status === 500) {
        messageError.value.request =
          "Erro no servidor tente novamente mais tarde";
        clearErrors(messageError);
      } else {
        messageError.value.request = `Error desconhecido:  ${error}`;
        clearErrors(messageError);
      }
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <AdminMenu />
  <main
    class="w-screen h-[90vh] flex flex-col justify-between items-center bg-[#202020de]"
  >
    <section class="w-[100%] h-[15vh] grid place-items-center bg-[#202020]">
      <h1 class="text-3xl font-bold tracking-wider text-[#c6a765] font-bodoni">
        Cadastro de Serviços
      </h1>
      <h3
        class="text-xl font-bodoni font-bold tracking-wide text-[#c6a765] capitalize"
      >
        Barbearia navalha de ouro
      </h3>
    </section>

    <form
      class="w-[90%] h-[80vh] flex flex-col items-center justify-center"
      @submit.prevent="handleSubmitService"
    >
      <InputLabel
        input_name="serviço"
        link="service"
        place="digite o nome do serviço."
        v-model="service"
      />
      <span class="w-[80%] h-[50px] text-red-600 uppercase font-semibold text-center tracking-wider text-[12px]"><p v-show="messageError.service">{{ messageError.service }}</p></span>
      <InputLabel
        input_name="Valor"
        link="price"
        place="digte o valor do serviço"
        v-model="price"
      />
      <span class="w-[80%] h-[50px] text-red-600 uppercase font-semibold text-center tracking-wider text-[12px]"><p v-show="messageError.price" >{{ messageError.price }}</p></span>
      <signupBtn
        btn-type="submit"
        btn-name="Cadastrar"
        :is-submitting="isSubmitting"
      />
    </form>
    <MsgError
      :mensagem="messageError.request"
      :state="!!messageError.request"
    />
    <MsgError :mensagem="messageError.verify" :state="!!messageError.verify" />
    <MsgSucess :mensagem="sucessMessage" :state="!!sucessMessage" />
  </main>
</template>
