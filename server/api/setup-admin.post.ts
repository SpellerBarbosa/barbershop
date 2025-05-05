import connectToDB from "../utils/connectToDB";
import User, { UseRole } from "../models/userSchema";
import { hashPassword } from "../utils/bcrypt";

export default defineEventHandler(async (event) => {
  await connectToDB();

    if(process.env.NODE_ENV === 'production'){
        throw createError({
            statusCode: 403,
            statusMessage: "Cadastro de administradores nao permitido em produção."
        })
    }

  const body = await readBody(event);
  const { name, user, email, password, role } = body;

  try {
    if (!name || !user || !email || !password || !role) {
      throw createError({
        statusCode: 40,
        statusMessage: "Todos os campos são obrigatorios",
      });
    }

    const adminExist = await User.findOne({ role: UseRole.ADMIN });

    if (adminExist) {
      throw createError({
        statusCode: 403,
        statusMessage: "Já existe um administrador cadastrado",
      });
    }

    const hash = await hashPassword(password);

    const newAdmin = new User({
      name: name.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      user: user.toLowerCase().trim(),
      password: hash,
      role: UseRole.ADMIN,
    });

    await newAdmin.save();

    return{ message: 'Administrador criado com sucesso.'}
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage: "Erro ao conectar com o servidor.",
    });
  }
});
