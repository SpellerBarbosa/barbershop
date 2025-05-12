<script setup lang="ts">
import Calendar from './Calendar.vue';

const selectedDate = ref()

</script>

<template>
    <section class="w-screen h-[80vh] bg-[#c6a765] overflow-auto">
        <Calendar  @select="selectedDate = $event"/>
        <form>
        </form>
    </section>
</template>