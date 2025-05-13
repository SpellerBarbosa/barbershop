<script setup lang="ts">
import Calendar from "./Calendar.vue";
import { api } from "~/store/usePerfilStore";
import MsgError from "~/components/common/MsgError.vue";
import type { IError } from "../../../utils/types";

const selectedDate = ref<string>("");
const avaliableHours = ref<string[]>([]);
const erro = ref<Partial<IError>>({});

watch(selectedDate, async (newDate) => {
  if (!newDate) return;

  try {
    const response = await api.get("/service/avaliable-hours", {
      params: {
        date: newDate,
      },
    });
    const data = await response.data;
    avaliableHours.value = data.avaliableTimes;
    console.log(avaliableHours.value)
  } catch (error: any) {
    if (error.response.status >= 400) {
      return (erro.value.verify = error.message);
    }

    if (error.response.status >= 500) {
      return (erro.value.verify = error.message);
    }

    console.error(error)

    erro.value.verify = "Falha ao fazer a requisição tente novamente mais tarde."
  }
});
</script>

<template>
  <section class="w-screen h-[80vh] bg-[#c6a765] overflow-auto">
    <Calendar @select="selectedDate = $event" />
    <form></form>
    <MsgError :mensagem="erro.verify" :state="!!erro.verify"/>
  </section>
</template>
