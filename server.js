import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connect.js";

import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//routers
import citiesRoutes from "./routes/citiesRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";

//middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use("/api/v1/cities", citiesRoutes);
app.use("/api/v1/weather", weatherRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5001;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
