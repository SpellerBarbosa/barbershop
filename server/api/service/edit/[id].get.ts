import { getRouterParam } from "#imports";
import connectToDB from "../../../utils/connectToDB";
import Service, { IService } from "~/server/models/servicesSchema";

export default defineEventHandler(async (event) =>{
    await connectToDB();
    
    const  id   = getRouterParam(event, 'id');    

    if(!id){
        throw createError({
            statusCode: 400,
            statusMessage: 'ID não fornecido!'
        })
    }

    try {
        const service = await Service.findById(id).lean()

        if(!service){
            throw createError({
                statusCode: 400,
                statusMessage: "não foi encontrado nenhum serviço com  esse id"
            })
        }

        return{ service }
    } catch (error: any) {
        if(error.statusCode) throw error;

        console.log(error)

        throw createError({
            statusCode: 500,
            statusMessage: "Falha ao buscar serviço, tente novamente mais tarde."
        })
    }
})