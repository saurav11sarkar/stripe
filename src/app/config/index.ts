import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  db_url: process.env.MONGO_URI,
  // Ensure SOLT_ROUND is defined in .env if used, or rename BCRYPT_SALT_ROUNDS
  soltRound: process.env.BCRYPT_SALT_ROUNDS, 
  jwt: {
    secret: process.env.JWT_SECRET,
    expire: process.env.JWT_EXPIRE,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpires: process.env.ACCESS_TOKEN_EXPIRES,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpires: process.env.REFRESH_TOKEN_EXPIRES,
  },
  smtp: {
    host: process.env.EMAIL_HOST, // Changed
    port: process.env.EMAIL_PORT, // Changed
    email: process.env.EMAIL_ADDRESS, // Changed
    pass: process.env.EMAIL_PASS, // Changed
    from: process.env.EMAIL_FROM,
    adminEmail: process.env.ADMIN_EMAIL,
    emailExpires: process.env.EMAIL_EXPIRES,
  },
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  },
  stripe: {
    secret_key: process.env.STRIPE_SECRET_KEY,
    webhook_secret: process.env.STRIPE_WEBHOOK_SECRET,
  },
  frontend_url: process.env.FRONTEND_URL,
  rateLimit: {
    window: process.env.RATE_LIMIT_WINDOW,
    max: process.env.RATE_LIMIT_MAX,
    delay: process.env.RATE_LIMIT_DELAY,
  }
};