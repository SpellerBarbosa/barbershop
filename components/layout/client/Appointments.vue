<script setup lang="ts">
import Calendar from "./Calendar.vue";
import { api } from "~/store/usePerfilStore";
import MsgError from "~/components/common/MsgError.vue";
import type { IError } from "../../../utils/types";
import type { IService } from "~/server/models/servicesSchema";

const selectedDate = ref<string>("");
const avaliableHours = ref<string[]>([]);
const servicesAvaliable = ref<IService[]>([]);
const erro = ref<Partial<IError>>({});
const serviceSelected = ref<string>("");
const selectedHour = ref<string>("")
const serviceSelectedData = computed(() => {
  return servicesAvaliable.value.find(
    (s) => s.service === serviceSelected.value
  );
});

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

    const services = await api.get("/service/search-services");
    const dataService = await services.data;
    servicesAvaliable.value = dataService.services;
  } catch (error: any) {
    if (error.response.status >= 400) {
      return (erro.value.verify = error.message);
    }

    if (error.response.status >= 500) {
      return (erro.value.verify = error.message);
    }

    console.error(error);

    erro.value.verify =
      "Falha ao fazer a requisição tente novamente mais tarde.";
  }
});

watch(serviceSelected, (newValue) => {
  console.log(newValue);
  console.log(serviceSelectedData.value);
});
</script>

<template>
  <section class="w-screen h-[80vh] bg-[#c6a765] overflow-auto">
    <h1
      class="w-full h-[10%] bg-[#202020] text-[#c6a765] text-xl uppercase text-center font-serif border-t-1 tracking-wider font-bold mb-[30px]"
    >
      Esolha um dia para agendar seu horario
    </h1>
    <Calendar @select="selectedDate = $event" />
    <form
      :class="[
        'w-screen  h-[30vh] grid place-items-center opacity-0',
        selectedDate
          ? 'opacity-100 pointer-events-auto transition duration-500'
          : 'pointer-events-none transition duration-300',
      ]"
    >
      <div
        :class="[
          'w-[80%] h-[80%] bg-[#202020] flex flex-col items-center justify-evenly rounded-4xl text-[#c6a765] uppercase',
        ]"
      >
        <select
          name="service"
          id="service"
          v-model="serviceSelected"
          class="uppercase border-[#c6a765] border-1 p-2 text-center w-[90%] cursor-pointer"
        >
          <option value="" disable selected>Selecione um serviço</option>
          <option
            :value="service.service"
            v-for="(service, index) in servicesAvaliable"
            :key="index"
          >
            {{ service.service }}
          </option>
        </select>
        <select
          name="service"
          id="service"
          v-model="selectedHour"
          :class="['uppercase border-[#c6a765] border-1 p-2 text-center w-[90%] cursor-pointer', serviceSelected ? 'opacity-100 transition duration-700 delay-100': 'opacity-0 pointer-events-none']"
        >
          <option value="" disable selected>Selecione um Horario</option>
          <option
            :value="hour"
            v-for="(hour, index) in avaliableHours"
            :key="index"
          >
            {{ hour }}
          </option>
        </select>
        <label
          for="service-value"
          :class="[
            'w-[70%] flex justify-evenly',
            selectedHour
              ? 'opacity-100 transition duration-700'
              : 'opacity-0 pointer-events-none transition duration-500',
          ]"
        >
          <span>Valor: </span>
          <input
            type="string"
            :value="`R$ ${serviceSelectedData?.price}`"
            disabled
            class="w-[50%]"
          />
        </label>
        <button
          :class="[
            'w-[150px] h-[50px] rounded-3xl bg-[#c6a765] text-[#202020] font-bold uppercase border-black tracking-wider',
            serviceSelectedData?.price
              ? 'opacity-100 transition duration-700 delay-300 cursor-pointer'
              : 'opacity-0 pointer-events-none transition duration-700',
          ]"
        >
          Agendar
        </button>
      </div>
    </form>
    <MsgError :mensagem="erro.verify" :state="!!erro.verify" />
  </section>
</template>
