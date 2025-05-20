import usePerfilStore from "~/store/usePerfilStore";

export default defineNuxtRouteMiddleware((to,from)=>{
    const useProfile = usePerfilStore();

    if(!useProfile.isAdm){
        return navigateTo('/login')
    }
})