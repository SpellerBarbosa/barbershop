import { defineStore } from "pinia";
import type { Service } from "#imports";

const useServiceStore = defineStore('service',{
    state: ()=>({
        services: [] as Service[],
        isLoading: false,
        error: null
    }),
    getters:{},
    actions:{
        async fetchServices(){
            
        }
    }
})