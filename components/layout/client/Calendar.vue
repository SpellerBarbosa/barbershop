<script setup lang="ts">
import { ref } from "vue";
import generateDays from "~/utils/genereteDaysOfMonth";
import generetaNameOfMonths from "~/utils/generateNameOfMonths";

const date: Date = new Date();
const month: number = date.getMonth();
const year: number = date.getFullYear();
const today: number = date.getDate();
const daysOfMonth: number[] = generateDays(month, year);
const monthName: string = generetaNameOfMonths(month);

const emit = defineEmits<{ (e: "select", date: string): void }>();

const handleValueLi = (value: number) => {
  const dataSelected = new Date(year, month, value);
  const formattedDate = dataSelected.toISOString().split("T")[0];
  emit("select", formattedDate);
};

// Array de nomes dos dias da semana
const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];

// Calcula o primeiro dia do mês
const firstDayOfMonth = new Date(year, month, 1).getDay();

const props = defineProps<{
  width?: number
  height?: number
}>()

</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl uppercase font-bold tracking-wider">{{ monthName }}</h1>
    <section class="flex flex-wrap bg-[#0a0a0ac9] text-[#c6a765]"
      :style="{ width: `${width}px`, height: `${height}px` }">
      <!-- Cabeçalho com os dias da semana -->
      <ul class="w-full flex">
        <li v-for="day in daysOfWeek" :key="day" :class="['w-[calc(100%/7)] text-center font-bold']">
          {{ day }}
        </li>
      </ul>

      <!-- Dias do mês no respectivo dia da semana -->
      <ul class="w-full h-full flex flex-wrap">
        <!-- Preenchimento inicial para alinhar corretamente -->
        <li v-for="n in firstDayOfMonth" :key="'empty-' + n" class="w-[calc(100%/7)]"></li>

        <li v-for="(day, index) in daysOfMonth" :key="index" :class="[
          'w-[calc(100%/7)] border grid place-items-center cursor-pointer',
          day < today ? 'bg-[#c6a765a9] text-black pointer-events-none' : '',
          day === today ? 'bg-blue-500' : '',
          new Date(year, month, day).getDay() === 0 ? 'bg-[red] text-withe pointer-events-none': ''
        ]" @click="handleValueLi(day)">
          {{ day }}
        </li>
      </ul>
    </section>
  </div>
</template>