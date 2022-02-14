import React from "react";
import { ReactComponent as Day } from "../images/weatherIcons/day.svg";
import { ReactComponent as Night } from "../images/weatherIcons/night.svg";
import { ReactComponent as Thunder } from "../images/weatherIcons/thunder.svg";

import { ReactComponent as CloudyDay1 } from "../images/weatherIcons/cloudy-day-1.svg";
import { ReactComponent as CloudyDay2 } from "../images/weatherIcons/cloudy-day-2.svg";
import { ReactComponent as CloudyDay3 } from "../images/weatherIcons/cloudy-day-3.svg";

import { ReactComponent as CloudyNight1 } from "../images/weatherIcons/cloudy-night-1.svg";
import { ReactComponent as CloudyNight2 } from "../images/weatherIcons/cloudy-night-2.svg";
import { ReactComponent as CloudyNight3 } from "../images/weatherIcons/cloudy-night-3.svg";

import { ReactComponent as Cloudy } from "../images/weatherIcons/cloudy.svg";

import { ReactComponent as Rainy1 } from "../images/weatherIcons/rainy-1.svg";
import { ReactComponent as Rainy2 } from "../images/weatherIcons/rainy-2.svg";
import { ReactComponent as Rainy3 } from "../images/weatherIcons/rainy-3.svg";
import { ReactComponent as Rainy4 } from "../images/weatherIcons/rainy-4.svg";
import { ReactComponent as Rainy5 } from "../images/weatherIcons/rainy-5.svg";
import { ReactComponent as Rainy6 } from "../images/weatherIcons/rainy-6.svg";
import { ReactComponent as Rainy7 } from "../images/weatherIcons/rainy-7.svg";

import { ReactComponent as Snowy1 } from "../images/weatherIcons/snowy-1.svg";
import { ReactComponent as Snowy2 } from "../images/weatherIcons/snowy-2.svg";
import { ReactComponent as Snowy3 } from "../images/weatherIcons/snowy-3.svg";
import { ReactComponent as Snowy4 } from "../images/weatherIcons/snowy-4.svg";
import { ReactComponent as Snowy5 } from "../images/weatherIcons/snowy-5.svg";
import { ReactComponent as Snowy6 } from "../images/weatherIcons/snowy-6.svg";
import { WiWindy as Wind } from "react-icons/wi";

function WeatherIcons({ id, icon }) {
  if (id === 800 && icon === "01d") return <Day />;
  if (id === 800 && icon === "01n") return <Night />;
  if (id >= 200 && id < 299) return <Thunder />;
  if (id === 801 && icon === "02d") return <CloudyDay1 />;
  if (id === 802 && icon === "03d") return <CloudyDay2 />;
  if (id === 803 && icon === "04d") return <CloudyDay3 />;
  if (id === 804 && icon === "04d") return <Cloudy />;
  if (id === 804 && icon === "04n") return <Cloudy />;
  if (id === 801 && icon === "02n") return <CloudyNight1 />;
  if (id === 802 && icon === "03n") return <CloudyNight2 />;
  if (id === 803 && icon === "04n") return <CloudyNight3 />;

  if ((id === 600 || id === 615) && icon === "13d") return <Snowy2 />;
  if ((id === 601 || id === 612) && icon === "13d") return <Snowy3 />;
  if ((id === 600 || id === 615) && icon === "13n") return <Snowy4 />;
  if (id === 622 || id === 602 || id === 621) return <Snowy6 />;
  // default snowy
  if (id >= 600 && id <= 699) return <Snowy5 />;

  if ((id === 300 || id === 310 || id === 301) && icon === "09d")
    return <Rainy2 />;
  if ((id === 302 || id === 311 || id === 321) && icon === "09d")
    return <Rainy3 />;
  // default drizzle
  if (id >= 300 && id <= 399) return <Rainy4 />;

  if (id === 531 || id === 522 || id === 502 || id === 503 || id === 504)
    return <Rainy6 />;
  // default rainy
  if (id >= 500 && id <= 599) return <Rainy5 />;
  // default atmosphere
  if (id >= 700 && id <= 799) return <Wind className="wind-icon" />;

  return <div>No image</div>;
}

export default WeatherIcons;
