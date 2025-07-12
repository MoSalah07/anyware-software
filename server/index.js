import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import announcementsRouter from "./routes/announcement.route.js";

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

const CLIENT_URL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;

app.use(
  cors({
    origin: function (origin, callback) {
      const allowedOrigins = [
        process.env.DEV_CLIENT_URL,
        process.env.PROD_CLIENT_URL,
      ];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors());

app.use("/api/announcements", announcementsRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port ${PORT}`);
});
