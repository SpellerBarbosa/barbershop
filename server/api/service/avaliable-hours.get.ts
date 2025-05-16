import { connectToDB } from "#imports";
import Appointments from "~/server/models/appointmentsSchema";
import WokingHours from "~/server/models/workingHoursSchema";
import generateTimes from "~/server/utils/generateTimes";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const query = getQuery(event);
  const dateString = query.date as string;

  if (!dateString) {
    throw createError({
      statusCode: 400,
      statusMessage: "A data não foi enviada!",
    });
  }

  // Converte a data da query para um Date UTC com hora zerada
  const dateNew = new Date(dateString);
  dateNew.setUTCHours(0, 0, 0, 0);

  const startOfDay = new Date(dateNew);
  const endOfDay = new Date(dateNew);
  endOfDay.setUTCHours(23, 59, 59, 999);

  const dayOfWeek = dateNew.getUTCDay();

  const dayInfo = await WokingHours.findOne({ dayOfWeek });
  if (!dayInfo || !dayInfo.isOpen) return { avaliable: [] };

  const allTimes = generateTimes(dayInfo.openTime, dayInfo.closeTime, 30);
  const lunchTimes = generateTimes(dayInfo.lunchBreakStart, dayInfo.lunchBreakEnd, 30);
  const workingTimes = allTimes.filter((t) => !lunchTimes.includes(t));

  // Busca os horários já agendados nesse dia
  const existingAppointments = await Appointments.find({
    date: {
      $gte: startOfDay,
      $lte: endOfDay,
    },
  });
  const bookedTimes = existingAppointments.map((a) => a.time);

  // Remove os horários que já foram agendados
  let avaliableTimes = workingTimes.filter(
    (time) => !bookedTimes.includes(time)
  );

  // 🧠 VERIFICAÇÃO: Se o dia escolhido for hoje, remove os horários passados
  const today = new Date(); // Data atual
  const isToday =
    startOfDay.getUTCFullYear() === today.getUTCFullYear() &&
    startOfDay.getUTCMonth() === today.getUTCMonth() &&
    startOfDay.getUTCDate() === today.getUTCDate();

  if (isToday) {
    const nowMinutes = today.getHours() * 60 + today.getMinutes(); // hora atual em minutos

    // Filtra horários que ainda não passaram
    avaliableTimes = avaliableTimes.filter((time) => {
      const [hour, minute] = time.split(":").map(Number);
      const timeInMinutes = hour * 60 + minute;

      return timeInMinutes > nowMinutes; // só mantêm horários futuros
    });
  }

  return {
    date: dateString,
    avaliableTimes,
  };
});
