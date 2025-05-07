<script setup lang="ts">
import useServiceStore from '~/store/useServiceStore';

const service = useServiceStore()
const services = service.services

</script>

<template>
    <main>
        <h1>Painel edição de serviços</h1>

        <section>
            <ul v-for="(service, index) in services" :key="index">
                <li>{{ service.service }}</li>
                <li>{{ service.price }}</li>
                <button><nuxt-link :to="`/admin/service/service-edit/${service._id}`">Editar</nuxt-link></button>
            </ul>
        </section>
    </main>
</template>