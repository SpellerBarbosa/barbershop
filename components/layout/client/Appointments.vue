<script setup lang="ts">
import Calendar from './Calendar.vue';
import { api } from '~/store/usePerfilStore';
import MsgError from '~/components/common/MsgError.vue';
import type { IError } from '../../../utils/types';
import type { IService } from '~/server/models/servicesSchema';
import usePerfilStore from '~/store/usePerfilStore';
import clearErros from '~/utils/clearErrors';
import clearMessage from '~/utils/clearMessage';
import MsgSucess from '~/components/common/MsgSucess.vue';

const selectedDate = ref<string>('');
const avaliableHours = ref<string[]>([]);
const servicesAvaliable = ref<IService[]>([]);
const serviceSelected = ref<string>('');
const selectedHour = ref<string>('');
const usePerfil = usePerfilStore();
const errorMessage = ref<Partial<IError>>({});
const sucessMessage = ref('');

const serviceSelectedData = computed(() => {
    return servicesAvaliable.value.find(
        (s) => s.service === serviceSelected.value
    );
});

watch(selectedDate, async (newDate) => {
    if (!newDate) return;

    const date = new Date(selectedDate.value).toISOString();

    try {
        const response = await api.get('/service/avaliable-hours', {
            params: {
                date,
            },
        });
        const data = await response.data;
        avaliableHours.value = data.avaliableTimes;

        const services = await api.get('/service/search-services');
        const dataService = await services.data;
        servicesAvaliable.value = dataService.services;
    } catch (error: any) {
        if (error.response.status >= 400) {
            errorMessage.value.verify = error.message;
            clearErros(errorMessage);
            return;
        }

        if (error.response.status >= 500) {
            errorMessage.value.verify = error.message;
            clearErros(errorMessage);
            return;
        }

        console.error(error);

        errorMessage.value.verify =
            'Falha ao fazer a requisição tente novamente mais tarde.';
        clearErros(errorMessage);
    }
});

watch(serviceSelected, (newValue) => {});

const handleSubmitNewAppointment = async () => {
    const price = Number(serviceSelectedData.value?.price);
    const userId = usePerfil.userId;

    if (!userId) {
        errorMessage.value.verify = 'Faça login para autenticação do seu ID';
        return;
    }

    if (isNaN(price)) {
        errorMessage.value.verify = 'Preço deve ser um numero.';
        return;
    }

    if (!selectedDate.value || !serviceSelected.value || !selectedHour.value) {
        errorMessage.value.verify =
            'Para o agendamento todos os dados devem ser enviados';
        return;
    }

    try {
        const response = await api.post('/service/appointments', {
            date: selectedDate.value,
            service: serviceSelected.value.toLowerCase().trim(),
            time: selectedHour.value,
            price: price,
            userId: userId,
        });

        const data = await response.data;

        sucessMessage.value = data.message;

        selectedDate.value = ""
        serviceSelected.value = '';
        selectedHour.value = '';
        clearMessage(sucessMessage);
    } catch (error: any) {
        if (error.status >= 400 && error.status < 500) {
        }
    }
};
</script>

<template>
    <section class="w-screen h-[80vh] bg-[#c6a765] overflow-auto">
        <h1
            class="w-full h-[10%] bg-[#202020] text-[#c6a765] text-xl uppercase text-center font-serif border-t-1 tracking-wider font-bold mb-[30px]"
        >
            Esolha um dia para agendar seu horario
        </h1>
        <Calendar @select="selectedDate = $event" :width="300"/>
        <form
            :class="[
                'w-screen  h-[30vh] grid place-items-center opacity-0',
                selectedDate
                    ? 'opacity-100 pointer-events-auto transition duration-500'
                    : 'pointer-events-none transition duration-300',
            ]"
        >
            <div
                :class="[
                    'w-[85%] h-[95%] bg-[#202020] flex flex-col items-center justify-evenly rounded-4xl text-[#c6a765] uppercase',
                ]"
            >
                <select
                    name="service"
                    id="service"
                    v-model="serviceSelected"
                    class="uppercase border-[#c6a765] border-1 p-2 text-center w-[90%] cursor-pointer"
                >
                    <option
                        disabled
                        value=""
                    >
                        Selecione um serviço
                    </option>
                    <option
                        :value="service.service"
                        v-for="(service, index) in servicesAvaliable"
                        :key="index"
                    >
                        {{ service.service }}
                    </option>
                </select>
                <select
                    name="service"
                    id="service"
                    v-model="selectedHour"
                    :class="[
                        'uppercase border-[#c6a765] border-1 p-2 text-center w-[90%] cursor-pointer',
                        serviceSelected
                            ? 'opacity-100 transition duration-700 delay-100'
                            : 'opacity-0 pointer-events-none',
                    ]"
                >
                    <option
                        value=""
                        disabled
                    >
                        Selecione um Horario
                    </option>
                    <option
                        :value="hour"
                        v-for="(hour, index) in avaliableHours"
                        :key="index"
                    >
                        {{ hour }}
                    </option>
                </select>
                <label
                    for="service-value"
                    :class="[
                        'w-[70%] flex justify-evenly',
                        selectedHour
                            ? 'opacity-100 transition duration-700'
                            : 'opacity-0 pointer-events-none transition duration-500',
                    ]"
                >
                    <span>Valor: </span>
                    <input
                        type="string"
                        :value="`R$ ${serviceSelectedData?.price}`"
                        disabled
                        class="w-[50%]"
                    />
                </label>
                <button
                    type="button"
                    @click.prevent="handleSubmitNewAppointment()"
                    :class="[
                        'w-[150px] h-[50px] rounded-3xl bg-[#c6a765] text-[#202020] font-bold uppercase border-black tracking-wider',
                        serviceSelectedData?.price
                            ? 'opacity-100 transition duration-700 delay-300 cursor-pointer'
                            : 'opacity-0 pointer-events-none transition duration-700',
                    ]"
                >
                    Agendar
                </button>
            </div>
        </form>
        <MsgError
            :mensagem="errorMessage.verify"
            :state="!!errorMessage.verify"
        />
        <MsgSucess
            :mensagem="sucessMessage"
            :state="!!sucessMessage"
        />
    </section>
</template>
