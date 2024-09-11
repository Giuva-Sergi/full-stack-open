import express from "express";
import cors from "cors";
import diariesRoutes from "./routes/diaries";

const app = express();

app.use(express.json());

app.use("/api/diaries", diariesRoutes);

app.use(cors());

const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
