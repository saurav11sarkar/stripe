import mongoose from "mongoose";
import { ICsvData } from "./user.interface";

const csvDataSchema = new mongoose.Schema<ICsvData>(
  {
    name: String,
    email: String,
    phone: String,
  },
  { timestamps: true }
);

const CsvData = mongoose.model<ICsvData>("CsvData", csvDataSchema);
export default CsvData;
