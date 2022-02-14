import axios from "axios";

const getWeather = async (req, res) => {
  const { city, units } = req.query;

  if (city) {
    await axios
      .get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.OPEN_WEATHER_API_ID}`
      )
      .then((response) => {
        const location = `${response.data.name}, ${response.data.sys.country}`;
        const lat = response.data.coord.lat;
        const lon = response.data.coord.lon;
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_API_ID}`
          )
          .then((response) => {
            res.status(200).json({ data: response.data, location });
            return;
          })
          .catch((error) => {
            // res.status(404);
          });
      })
      .catch((error) => {
        console.log(error);
        res.status(404).send(error);
      });
  }

  const { lat, lon, location } = req.query;

  if (lon && lat) {
    await axios
      .get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${process.env.OPEN_WEATHER_API_ID}`
      )
      .then((response) => {
        res.status(200).json({ data: response.data, location });
        return;
      })
      .catch((error) => {
        res.status(404);
      });
  }
  res.status(500);
};

export { getWeather };
