const generateDays = (month: number, year: number): number => {
  const daysOfMonth = {
    month30Days: 30,
    month31Days: 31,
    february: 28,
    leapFebruary: 29,
  };

  // Caso para o mês de fevereiro
  if (month === 1) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
      ? daysOfMonth.leapFebruary
      : daysOfMonth.february;
  }

  // Meses com 30 dias
  if ([3, 5, 8, 10].includes(month)) {
    return daysOfMonth.month30Days;
  }

  // Meses com 31 dias
  return daysOfMonth.month31Days;
};

export default generateDays;
