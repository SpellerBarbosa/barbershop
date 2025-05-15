import { connectToDB } from "#imports";
import Appointments from "~/server/models/appointmentsSchema";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const { date, service, time, price, userId } = await readBody(event);


  if (!date || !service || !time || !price || !userId) {
    throw createError({
      statusCode: 400,
      statusMessage: "Todos os campos são obrigatorios.",
    });
  }

  const newDate = new Date(`${date}T${time}:00-03:00`).toISOString();
  const newPrice = Number(price);

  if (isNaN(newPrice)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Preço deve ser um numero.",
    });
  }

  try {
    const newAppointment = await Appointments.create({
      date: newDate,
      service: service.toLowerCase().trim(),
      time: time,
      price: newPrice,
      userId: userId,
    });

    return {
      message: "Agendamento concluido, Obrigado pela preferencia.",
    };
  } catch (error: any) {
    if (error.statusCode) throw error;

    console.error(error);

    throw createError({
      statusCode: 500,
      statusMessage:
        "Erro ao conectar ao servidor, tente novamente mais tarde.",
    });
  }
});
