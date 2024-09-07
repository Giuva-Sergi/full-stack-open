import express from "express";
import diariesRoutes from "./routes/diaries";

const app = express();

app.use(express.json());

app.use("/api/diaries", diariesRoutes);

const PORT = 3000;

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
