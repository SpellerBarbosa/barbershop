<script setup lang="ts">
import useServiceStore from '~/store/useServiceStore';
import AdminMenu from '~/components/layout/AdminMenu.vue';

const service = useServiceStore();
const services = service.services;
</script>

<template>
    <admin-menu />
    <main class="w-screen h-[90vh] bg-[#202020dc]">
        <h1
            class="w-[full] h-[15%] text-3xl font-bodoni font-extrabold text-[#c6a765] p-5 tracking-wider"
        >
            Serviços
        </h1>

        <section class="w-[full] h-[80%] flex flex-col items-center gap-5">
            <ul
                v-for="(service, index) in services"
                :key="index"
                class="w-[90%] h-[100px] flex items-center justify-evenly bg-[#c6a765] rounded-2xl font-semibold"
            >
                <li
                    class="uppercase w-[60%] h-full flex flex-col justify-evenly items-center"
                >
                    <span>Serviço</span>
                    <p class="text-center text-balance line-clamp-3">
                        {{ service.service }}
                    </p>
                </li>
                <li
                    class="uppercase w-[20%] h-full flex flex-col justify-evenly items-center"
                >
                    <span>Preço</span>
                    <p>R$ {{ service.price }}</p>
                </li>
                <li
                    class="uppercase w-[20%] h-full flex flex-col justify-evenly items-center"
                >
                    <nuxt-link
                        :to="`/admin/service-edit/${service._id}`"
                        class="h-full w-full flex items-center justify-center border rounded-r-2xl bg-[#272727] text-[#c6a765] uppercase font-bold tracking-wider"
                    >
                        Editar
                    </nuxt-link>
                </li>
            </ul>
        </section>
    </main>
</template>
