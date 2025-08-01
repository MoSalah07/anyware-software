import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
// Routes
import announcementsRouter from "./routes/announcement.route.js";
import quizRouter from "./routes/quiz.route.js";

const PORT = process.env.PORT || 9000;
const app = express();

app.use(express.json());

const allowedOrigins = [
  process.env.DEV_CLIENT_URL,
  process.env.PROD_CLIENT_URL,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, Content-Length, X-Requested-With"
    );
    return res.sendStatus(200);
  }
  next();
});

app.use("/api/announcements", announcementsRouter);
app.use("/api/quiz", quizRouter);

app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server running on port ${PORT}`);
});
