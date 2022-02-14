import mongoose from "mongoose";
import City from "../models/cities.js";

const getCities = async (req, res) => {
  const { search } = req.query;

  const queryObject = {};

  if (search) {
    queryObject.name = { $regex: `^${search}`, $options: "i" };
  }

  let result = City.find(queryObject);

  result.limit(10);

  const cities = await result;

  let moreCities;

  if (cities.length < 10) {
    moreCities = await City.find({
      name: { $regex: `${search}`, $options: "i" },
    }).limit(10 - cities.length);
    const concatCities = cities.concat(moreCities);
    res.status(200).json({ cities: concatCities });
    return;
  }

  // could sort based on lon/lat??

  res.status(200).json({ cities });
};

export { getCities };
