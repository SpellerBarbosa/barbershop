<script setup lang="ts">
import data from '../../../utils/data.json'
import { ref } from 'vue';

const solicitacoes = data


</script>
<template>
    <main>
        <article>
            <h1>Agendamentos pendentes</h1>
        </article>
        <section>
            <ul v-for="(solicitacao, index) in solicitacoes" :key="index">
                <li>{{ solicitacao.cliente }}</li>
            </ul>
        </section>
    </main>
</template>