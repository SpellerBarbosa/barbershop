import User, { IUser } from "../models/userSchema";
import connectToDB from "../utils/connectToDB";
import { comparePassword } from "../utils/bcrypt";
import { setCookie } from "#imports";
import  jwt  from "jsonwebtoken";

export default defineEventHandler(async (event) => {
    await connectToDB();
    const secret: string | undefined = process.env.SECRET;
    
    if(!secret){
        throw new Error('variavel de ambiente SECRET não fornecido.');
    }

    const body = await readBody(event);
    const { user, password } = body;
    if (!user || !password) {
        throw createError({
            statusCode: 400,
            statusMessage: "Usuario e senha são obrigatorios",
        });
    }
    
    try {
        const userExist = await User.findOne({ user }).lean() as IUser;

        if (!userExist) {
            throw createError({
                statusCode: 400,
                statusMessage: "Usuario não cadastrado",
            });
        }

        const isMatch = await comparePassword(password, userExist.password);

        if (!isMatch) {
            throw createError({
                statusCode: 400,
                statusMessage: "Senha invalida",
            });
        }

        const infoUser = {userId: userExist._id.toString(), userName: userExist.name, userUser: userExist.user, userRole: userExist.role }

        const token =  jwt.sign(infoUser, secret,{expiresIn: '1h'})

        setCookie(event, 'token', token,{
            httpOnly: true,
            maxAge: 60 * 60,
            secure: false,
            sameSite: 'lax',
            path: '/'
        })
        return {message: 'Login Efetuado com sucesso'}

    } catch (error: any) {
        console.log(error);

        if(error.statusCode) throw error;

        throw createError({
            statusCode: 500,
            statusMessage: 'Não foi possivel se conectar com o servidor, tente novamente mais tarde.'
        })        
     }
});
