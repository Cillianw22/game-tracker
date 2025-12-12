import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Game Tracker API running" });
});

app.get("/health", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/games", gameRoutes);

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.log("Missing MONGO_URL in server/.env");
} else {
  mongoose
    .connect(mongoUrl)
    .then(() => {
      app.listen(4000, () => {
        console.log("Server running on port 4000");
      });
    })
    .catch((err) => {
      console.log("Mongo connection failed");
      console.log(err.message);
    });
}
