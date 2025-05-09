<script setup lang="ts">
import data from "../../../utils/data.json";
import AdminMenu from "~/components/layout/AdminMenu.vue";
import { ref } from "vue";

const solicitacoes = data.filter((pendente) => pendente.status === "cancelado");
</script>
<template>
  <AdminMenu />
  <main
    class="w-screen h-[90vh] flex flex-col items-center overflow-auto bg-[#0c0c0cef]"
  >
    <article class="w-[80%] h-[20%] grid place-items-center">
      <h1 class="text-2xl text-[#c6a765] uppercase text-center font-bodoni tracking-[3px] font-bold">Serviços concluidos</h1>
    </article>
    <section class="w-[90%] h-[80%] flex flex-col gap-4">
      <ul
        v-for="(solicitacao, index) in solicitacoes"
        :key="index"
        class="w-[95%] h-[180px] rounded-2xl grid grid-rows-10 grid-cols-14 bg-[#202020]"
      >
        <li
          class="w-full row-start-2 col-start-1 row-span-2 col-span-7 text-xl text-[#f1deb2] font-semibold tracking-[1.5px] grid place-items-center"
        >
          {{ solicitacao.cliente }}
        </li>
        <li
          class="row-start-5 col-start-2 grid place-items-center font-semibold text-[16px] text-[#c6a675] row-span-2 col-span-7 uppercase text-balance"
        >
          {{ solicitacao.servico }}
        </li>
        <li
          class="w-full h-full row-start-2 row-span-2 col-start-10 col-span-4 grid place-items-center tracking-wider text-center rounded-2xl 
          bg-[#b80303] text-white font-semibold uppercase text-sm"
        >
          {{ solicitacao.status }}
        </li>
        <li class="hidden">
          {{ new Date(solicitacao.data).toLocaleDateString("pt-BR") }}
        </li>
      </ul>
    </section>
  </main>
</template>
