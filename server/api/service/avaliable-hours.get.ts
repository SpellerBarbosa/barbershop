import { connectToDB } from "#imports";
import Appointments from "~/server/models/appointmentsSchema";
import WokingHours from "~/server/models/workingHoursSchema";
import generateTimes from "~/server/utils/generateTimes";

export default defineEventHandler(async (event) => {
  await connectToDB();

  const query = getQuery(event);
  
  const dateString = query.date as string;
  const time = query.time as string
  console.log(time);
  
  if (!dateString) {
    createError({
      statusCode: 400,
      statusMessage: "A data não foi enviada!",
    });
  }

  const date = new Date(dateString);
  const dayOfWeek = date.getDay();

  const dayInfo = await WokingHours.findOne({ dayOfWeek });

  if (!dayInfo || !dayInfo.isOpen) return { avaliable: [] };

  const allTimes = generateTimes(dayInfo.openTime, dayInfo.closeTime, 30);
  const lunchTimes = generateTimes(
    dayInfo.lunchBreakStart,
    dayInfo.lunchBreakEnd,
    30
  );
  const workingTimes = allTimes.filter((t) => !lunchTimes.includes(t));

  const existingAppointments = await Appointments.find({ date: dateString });
  const bookedTimes = existingAppointments.map((a) => a.time);

  const avaliableTimes = workingTimes.filter(
    (time) => !bookedTimes.includes(time)
  );

  return {
    date: dateString,
    avaliableTimes,
  };
});
