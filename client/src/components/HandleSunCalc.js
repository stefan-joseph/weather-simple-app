import React from "react";

function HandleSunCalc({ unixTime, timezoneOffset }) {
  const hourDifference = timezoneOffset / 3600;
  const date = new Date(unixTime * 1000);
  const utcHour = date.getUTCHours();
  const utcMinutes = date.getUTCMinutes();
  const utcSeconds = date.getUTCSeconds();
  const localHour = utcHour + hourDifference;

  let roundedMinute;
  if (utcSeconds >= 30) roundedMinute = utcMinutes + 1;
  else roundedMinute = utcMinutes;
  if (roundedMinute >= 0 && roundedMinute < 10)
    roundedMinute = `0${roundedMinute}`;

  let localTime;
  if (localHour > 12) localTime = `${localHour - 12}:${roundedMinute} PM`;
  if (localHour === 0) localTime = `${localHour + 12}:${roundedMinute} AM`;
  if (localHour === 12) localTime = `${localHour}:${roundedMinute} PM`;
  if (localHour > 0 && localHour < 12)
    localTime = `${localHour}:${roundedMinute} AM`;

  return <p className="value">{localTime}</p>;
}

export default HandleSunCalc;
