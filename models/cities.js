import mongoose from "mongoose";

const citySchema = new mongoose.Schema({
  id: Number,
  name: String,
  state: String,
  country: String,
  coord: {
    lon: Number,
    lat: Number,
  },
});

export default mongoose.model("City", citySchema);
