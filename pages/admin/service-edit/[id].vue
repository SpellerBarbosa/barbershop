<script setup lang="ts">
import { useRoute } from 'vue-router';
import { onMounted } from 'vue';
import { api } from '~/store/usePerfilStore';
import { ref } from 'vue';
import AdminMenu from '~/components/layout/admin/AdminMenu.vue';

const route = useRoute();
const id = route.params.id;
const serviceData = ref({
    service: '',
    price: 0,
});


onMounted(async () => {
    const response = await api.get(`/service/edit/${id}`);

    serviceData.value.service = response.data.service.service;
    serviceData.value.price = response.data.service.price;
});
</script>
<template>
    <AdminMenu />
    <main
        class="w-[100%] h-[90vh] bg-[#080808b6] flex flex-col items-center justify-between"
    >
        <h1
            class="w-full text-3xl font-bodoni font-extrabold text-[#c6a765] p-5 tracking-wider"
        >
            Editar Serviços
        </h1>
        <form
            class="w-[80%] h-[50vh] bg-[#ac8a42d3] rounded-3xl flex flex-col items-center justify-center font-semibold mb-[100px]"
        >
            <label
                for="service"
                class="flex flex-col w-[80%] mb-[50px]"
            >
                <span class="uppercase">nome do serviço</span>
                <div class="w-full flex justify-between mt-[20px]">
                    <input
                        type="text"
                        disabled="true"
                        v-model="serviceData.service"
                        class="w-[calc(100%)] text-center border-b-1 uppercase text-sm"
                    />
                    <span
                        class="material-symbols-outlined w-[35px] h-[35px] flex items-center justify-center bg-[#000000d8]"
                        title="editar"
                    >
                        edit
                    </span>
                </div>
            </label>
            <label
                for="price"
                class="w-[80%] flex flex-col mb-[50px]"
            >
                <span class="uppercase"> valor</span>
                <div class="w-full flex justify-between mt-[20px]">
                    <input
                        type="text"
                        disabled="true"
                        v-model="serviceData.price"
                        class="w-[calc(100%)] text-center border-b-1"
                    />
                    <span
                        class="material-symbols-outlined w-[35px] h-[35px] flex items-center justify-center bg-[#000000d8]"
                        title="editar"
                    >
                        edit
                    </span>
                </div>
            </label>
            <button
                type="submit"
                class="w-[120px] h-[45px] uppercase tracking-wider font-semibold rounded-2xl text-[#c6a765] bg-[#000000cc]"
            >
                Salvar
            </button>
        </form>
    </main>
</template>
<style scoped>
.material-symbols-outlined {
    color: #c6a765;
    font-size: 30px;
    font-variation-settings: 'FILL' 0, 'wght' 300, 'GRAD' 0, 'opsz' 24;
}
</style>
