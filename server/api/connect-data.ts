import connectToDB from "../utils/connectToDB"

export default  defineEventHandler(async (event) =>{
    try {
        await connectToDB();
        return {message: "Banco de dados conectado com sucesso."}
    } catch (error) {
        return{
            error: true,
            message: error instanceof Error ? error.message : "error desconhecido."
        }
    }
})