import { getCookie } from "#imports";
import jwt, { JwtPayload } from 'jsonwebtoken';
import type { Payload } from "~/utils/types";

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

       const decoded = jwt.verify(token, secret) as JwtPayload;

       if(typeof decoded !== 'object' || !decoded.userRole){
         throw new Error("Token malformado.")
       }

       const user = decoded as Payload

       if(user.userRole === 'user'){
            return sendRedirect(event, '/client/user')
       }

       if(user.userRole ==="admin"){
        return sendRedirect(event, '/admin/dashboard')
       }

       return sendRedirect(event, '/login')

    } catch (error: any) {
       return sendRedirect(event, '/login')
    }
});