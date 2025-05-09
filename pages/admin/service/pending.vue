<script setup lang="ts">
import data from "../../../utils/data.json";
import AdminMenu from "~/components/layout/AdminMenu.vue";
import { ref } from "vue";

const today = new Date().toISOString().split("T")[0];
const date  = ref<string>(today)
const solicitacoes = data.map(solicitacao => ({
  ...solicitacao,
  data: new Date(solicitacao.data)
}))

const requestsDay = computed(()=>{
  const dateSistem = new Date();
  const dateDay = date.value ? new Date(`${date.value}T00:00:00`).toLocaleDateString('pt-BR') : dateSistem.toLocaleDateString('pt-BR')

  return solicitacoes.filter((solicitacao) =>{
    const dateRequest = solicitacao.data.toLocaleDateString('pt-BR');

    return solicitacao.status === 'pendente' && dateRequest === dateDay
  })
})


console.log(date.value)

</script>
<template>
  <AdminMenu />
  <main
    class="w-screen h-[90vh] flex flex-col items-center overflow-auto bg-[#0c0c0cef]"
  >
    <article class="w-[80%] h-[20%] grid place-items-center">
      <h1 class="text-2xl text-[#c6a765] uppercase text-center font-bodoni tracking-[3px] font-bold">Agendamentos pendentes</h1>
    </article>
    <section class="w-[90%] h-[80%] flex flex-col items-center gap-4">
      <label for="date" class="text-[#c6a765] w-[80%] flex justify-between m-8">
        <span class="text-2xl font-bold text-center">Data</span>
        <input type="date" class="bg-[#c6a765] text-black" id="date" v-model="date" :min="today">
      </label>

      <ul
        v-for="(requestDay, index) in requestsDay"
        :key="index"
        class="w-[95%] h-[180px] rounded-2xl grid grid-rows-10 grid-cols-14 bg-[#202020]"
      >
        <li
          class="w-full row-start-2 col-start-1 row-span-2 col-span-7 text-2xl text-[#f1deb2] font-semibold tracking-[1.5px] grid place-items-center"
        >
          {{ requestDay.cliente }}
        </li>
        <li
          class="row-start-5 col-start-2 grid place-items-center font-semibold text-[16px] text-[#c6a675] row-span-2 col-span-7 uppercase text-balance"
        >
          {{ requestDay.servico }}
        </li>
        <li
          class="row-start-2 row-span-2 col-start-10 col-span-4 grid place-items-center tracking-wider text-center rounded-2xl bg-[#c6a765] font-semibold uppercase text-sm"
        >
          {{ requestDay.status }}
        </li>
        <li class="text-[#c6a765] col-start-9 row-start-5 row-span-2 font-bold flex items-center">
          {{ new Date(requestDay.data).toLocaleDateString("pt-BR") }}
        </li>
        <li class="row-start-8 row-span-10 col-span-full flex justify-evenly">
          <div class="flex items-center gap-2">
            <select name="status" id="status" aria-label="status" class="mr-[50px] text-[#c6a765]">
              <option value="" disabled selected>Modificar status</option>
              <option value="em atendimento">Em Atendimento</option>
              <option value="concluido">Concluido</option>
              <option value="cancelado">Cancelado</option>
            </select>
            <button class="w-[100px] h-[35px] rounded-lg bg-[#4CAF50] hover:bg-[#449d48] text-black border-none font-semibold tracking-wider">Salvar</button>
          </div>
        </li>
      </ul>
    </section>
  </main>
</template>
