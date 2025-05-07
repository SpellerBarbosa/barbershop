import connectToDB from '../utils/connectToDB';
import Service from '../models/servicesSchema';

export default defineEventHandler(async (event) =>{
    await connectToDB();

    try {
        const services = await Service.find().lean()

        if(services.length === 0){
            throw createError({
                statusCode: 400,
                statusMessage: "Não a serviços cadastrados no banco de dados"
            });
        }

        return { services}
    } catch (error: any) {
        if(error.status) throw error

        console.error(error)

        throw createError({
            statusCode: 500,
            statusMessage: "Falha ao buscar serviços no banco de dados tente novamente mais tarde."
        })
    }

})