<script setup lang="ts">
import InputLabel from '~/components/forms/InputLabel.vue';
import AdminMenu from '~/components/layout/AdminMenu.vue';
import signupBtn from '~/components/forms/signupBtn.vue';
import { ref } from 'vue';

const service = ref<string>("");
const price = ref<number>(0)
</script>

<template>
    <AdminMenu />
    <main class="w-screan h-[90vh] flex flex-col justify-between items-center bg-[#202020de]">
        <section class="w-[100%] h-[15vh] grid place-items-center bg-[#202020]">
            <h1 class="text-3xl font-bold tracking-wider text-[#c6a765] font-bodoni">Cadastro de Serviços</h1>
            <h3 class="text-xl font-bodoni font-bold tracking-wide text-[#c6a765] capitalize">Barbearia navalha de ouro</h3>
        </section>

        <form class="w-[90%] h-[80vh] flex flex-col items-center justify-center">
            <InputLabel 
            input_name="serviço" 
            link="service" 
            place="digite o nome do serviço." 
            v-model="service"
            />
            <InputLabel
            input_name="Valor"
            link="price"
            place="digte o valor do serviço"
            type_input="number"
            v-model="price"
            />
            <signupBtn btn-name="Cadastrar" />
        </form>
    </main>
</template>