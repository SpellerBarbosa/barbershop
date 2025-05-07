import { defineStore } from "pinia";
import type { Service } from "../utils/types";
import { api } from "./usePerfilStore";

const useServiceStore = defineStore('service',{
    state: ()=>({
        services: [] as Service[],
        isLoading: false,
        error: null
    }),
    getters:{},
    actions:{
        async fetchServices(){
            this.isLoading = true;
            try {
                const response = await api.get('/service/search-services');
                const data = await response.data;
                this.services  = data.services
            } catch (error: any) {
                this.error = error.message
            }finally{
                this.isLoading = false
            }
        }
    }
})

export default useServiceStore;