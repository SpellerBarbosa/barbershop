export default defineEventHandler(async (event)=>{
    const body = await readBody(event);
    const { user, password } = body;

    if(!user || !password){
        throw createError({
            statusCode: 400,
            statusMessage: "Usuario e senha são obrigatorios"
        });
    }

    return {msg:"Login efetuado com sucesso."}
});