import connectToDB from "../../utils/connectToDB";
import User from "../../models/userSchema";
import { hashPassword } from "../../utils/bcrypt";

export default defineEventHandler(async (event) => {
    await connectToDB();

  const body = await readBody(event);

  const { name, user, email, password } = body;

  if (!name || !user || !email || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "Preencha todos os campos corretamente",
    });
  }

  try {
    const userExiste = await User.findOne({ email });

    if (userExiste) {
      throw createError({
        statusCode: 400,
        statusMessage: "Email ja cadastrado!",
      });
    }

    const hash = await hashPassword(password);

    const newUser = await User.create({
      name: name.toLowerCase().trim(),
      email: email.toLowerCase().trim(),
      user: user.toLowerCase().trim(),
      password: hash
    });

    return { msg: "Usuario cadastrado com sucesso!" };
  } catch (error: any) {

    if(error.statusCode) throw error;

    console.error(error);

    throw createError({
        statusCode: 500,
        statusMessage: "Não foi possivel se conectar ao servidor, tente novamente mais tarde."
    })
    
  }
});
