import { connectToDB } from "#imports";
import Appointments from "~/server/models/appointmentsSchema";

export default defineEventHandler(async(event) =>{
    await connectToDB();

    const  body  = await readBody(event);
    const userId = body.userId;

    if(!userId){
        throw createError({
            statusCode: 400,
            statusMessage: "Para acessar seus agendamenentos faça login novamente."
        })
    }

    try {
        const appointments = await Appointments.find({ userId });

        return { appointments }
    } catch (error: any) {
        if(error.statusCode) throw error


        throw createError({
            statusCode: 500,
            statusMessage: "Erro  ao conectar com o banco de dados, tente novamente mais tarde"
        })
    }

})