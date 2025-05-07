import { defineStore } from "pinia";
import axios from "axios";
import type { UserStore } from "../utils/types";

export const api = axios.create({
    baseURL: '/api',
    withCredentials: true
})

const usePerfilStore = defineStore('perfil',{
    state: () => ({
        loading: false,
        user: null  as UserStore | null, 
        erro: null
    }),

    getters:{
        isAdm: (state) => state.user?.userRole === 'admin',
        isUser: (state) => state.user?.userUser === 'user',
        userId: (state) => state.user?.userId 
    },
    actions:{
        async fetchProfile(){
            this.loading = true

            try {

                const response = await api.get('/user/profile',{
                    withCredentials: true
                });

                const data = await response.data;

                this.user = data
            } catch (error: any) {
                this.erro = error.message
            }finally{
                this.loading = false
            }
        }
    }
})

export default usePerfilStore;