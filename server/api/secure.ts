import { getCookie } from "#imports";
import jwt from 'jsonwebtoken';


export default defineEventHandler(async(event)=>{
    const token = getCookie(event, 'token');
    const secret: string | undefined = process.env.SECRET;

    if(!secret){
        throw new Error('Variavel de ambiente SECRET não fornecido.')
    }

    try {
        if(!token){
            return sendRedirect(event, '/login');
        }

        jwt.verify(token, secret);
    } catch (error: any) {
       return sendRedirect(event, '/login')
    }
});