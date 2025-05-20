<script setup lang="ts">
import { watch } from "vue";
import usePerfilStore from "~/store/usePerfilStore";
import { api } from "~/store/usePerfilStore";
import type { IAppointments } from "~/server/models/appointmentsSchema";

const useStore = usePerfilStore();
const appointments = ref<IAppointments[]>([]);

const formateDate = (dateStr: Date) =>{
    return new Date(dateStr).toLocaleDateString();
}

const formateTime = (dateStr: Date) =>{
    const date = new Date(dateStr);
    const hour = date.getHours().toString().padStart(2, '0')
    const min = date.getMinutes().toString().padStart(2, '0')
    return  `${hour}:${min}`
}

const formatPrice = (price: number) => {
  return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

watch(
  () => useStore.userId,
  async (userId) => {
    if (!userId) {
      console.error("ID do usuário não está disponível.");
      return;
    }

    try {
      const response = await api.post("/service/my-appointments", {
        userId,
      });

      appointments.value = response.data.appointments;
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  },
  { immediate: true }
);
</script>

<template>
  <section class="w-screen h-[80vh] bg-[#c6a765] flex flex-col items-center jus">
    <ul v-for="(appointment, index) in appointments" :key="index" class="w-[95%] bg-[#202020] m-2 rounded-2xl text-[#c6a765] flex flex-col items-center uppercase font-semibold tracking-wider">
      <li class=" flex  justify-between w-[90%] mb-3">
        <span>Serviço:</span> <p>{{ appointment.service }}</p>
      </li>
      <li class=" flex justify-between w-[90%] mb-3">
        <span>Data do Agendamento: </span> <p>{{formateDate(appointment.date)}}</p>
      </li>
      <li class=" flex  justify-between w-[90%] mb-3">
        <span>Hora do Agendamento: </span> <p>{{ formateTime(appointment.date) }}</p>
      </li>
      <li class="flex justify-evenly w-full">
        <span>Preço:</span> <p>{{ formatPrice(appointment.price) }}</p>
      </li>
      <button class="w-[150px] h-[50px] bg-[#bb0808] rounded-xl m-2">Cancelar</button>
    </ul>
  </section>
</template>
