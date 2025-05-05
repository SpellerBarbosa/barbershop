import { getCookie } from "#imports";
import jwt, { decode } from "jsonwebtoken";

export default defineEventHandler(async(event)=>{
    const token = getCookie(event, 'token');
    const secret: string | undefined = process.env.SECRET;

    if(!secret){
        throw new Error("A variavel de ambiente SECRET não foi fornecida.")
    }

    if(!token){
        throw createError({
            statusCode: 400,
            statusMessage: "Token não fornecido"
        })
    }
    try {

        const decoded = jwt.verify(token, secret) as jwt.JwtPayload;
        return{
            userId: decoded.userId,
            userName: decoded.userName,
            userUser: decoded.userUser,
            userRole: decoded.userRole
        }

    } catch (error) {
        throw createError({
            statusCode: 401,
            statusMessage: "Token invalido"
        })
    }
})