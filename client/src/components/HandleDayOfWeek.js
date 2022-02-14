export const handleDayOfWeek = (index, hourDifference) => {
  const date = new Date();
  const utcDay = date.getUTCDay();
  const utcHour = date.getUTCHours();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = "";

  if (utcHour + hourDifference < 0) day = utcDay - 1;
  else if (utcHour + hourDifference > 23) day = utcDay + 1;
  else day = utcDay;

  let localDay = "";

  if (day < 0) localDay = day + 7 + index;
  else if (day > 6) localDay = day - 7 + index;
  else localDay = day + index;

  return localDay > 6 ? days[localDay - 7] : days[localDay];
};
