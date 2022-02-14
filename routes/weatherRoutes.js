import express from "express";
const router = express.Router();

import { getWeather } from "../controllers/weatherController.js";

router.route("/").get(getWeather);

export default router;
