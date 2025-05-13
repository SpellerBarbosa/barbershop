const generateDays = (month: number, year: number): number[] => {
  let arrayDays: number [] = []
  const daysOfMonth = {
    month30Days: 30,
    month31Days: 31,
    february: 28,
    leapFebruary: 29,
  };

  let totalDays = daysOfMonth.month31Days

  // Caso para o mês de fevereiro
  if (month === 1) {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
    totalDays = isLeap ? daysOfMonth.leapFebruary : daysOfMonth.february
  }

  // Meses com 30 dias
  if ([3, 5, 8, 10].includes(month)) {
    totalDays = daysOfMonth.month30Days
  }

  // Meses com 31 dias
 

  for (let day = 1; day < totalDays; day++) {
      arrayDays.push(day)
  }

  return arrayDays;
};

export default generateDays;
