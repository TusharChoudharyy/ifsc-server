import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ifscRoutes from "./routes/ifscRoutes.js";

dotenv.config();
const app = express();

// ⭐ Allowed origins list
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://ifscfinder.net",
  "https://www.ifscfinder.net",
];

// ⭐ CORS middleware
app.use(
  cors({
    origin: (origin, callback) => {
      // Postman / server-to-server ke liye allow
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("❌ Not allowed by CORS"), false);
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// ⭐ MongoDB connect
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ⭐ Root
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// ⭐ API
app.use("/api/ifsc", ifscRoutes);

// ⭐ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
