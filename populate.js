import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import City from "./models/cities.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await City.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("./city.list.json", import.meta.url))
    );
    await City.create(jsonProducts);
    console.log("SUCCESS!!!!");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
