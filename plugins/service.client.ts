import useServiceStore from "~/store/useServiceStore"

export default defineNuxtPlugin( async ()=>{
    const services = useServiceStore();
    if(services.services.length === 0){
        await services.fetchServices();
    }
})