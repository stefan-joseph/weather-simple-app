import express from "express";
const router = express.Router();

import { getCities } from "../controllers/citiesController.js";

router.route("/").get(getCities);

export default router;
