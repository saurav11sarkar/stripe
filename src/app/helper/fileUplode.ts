import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import fs from "fs";
import config from "../config";

// Cloudinary config
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_key: config.cloudinary.api_key,
  api_secret: config.cloudinary.api_secret,
});

// ✅ Allowed file types (Only CSV)
const allowedFileTypes = ["text/csv", "application/vnd.ms-excel"];

const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only CSV files are allowed!"));
  }
};

// Multer storage (local temp save)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const safeFileName = file.originalname.replace(/\s+/g, "_");
    cb(null, safeFileName);
  },
});

const upload = multer({
  storage,
  fileFilter,
});

// Upload to Cloudinary
const uploadCSVToCloudinary = async (file: Express.Multer.File) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file.path,
      {
        public_id: file.originalname.replace(/\s+/g, "_"),
        folder: "CSV_FILES",
        resource_type: "raw", // ✅ Important for CSV
      },
      (error, result) => {
        fs.unlinkSync(file.path); // Remove local file
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};

export const csvUploader = {
  upload,
  uploadCSVToCloudinary,
};
