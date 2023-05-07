import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router as deviceRoutes } from "./routes/device.routes";

const app: Application = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json());

app.use("/devices", deviceRoutes);

const PORT = 5050;

app.listen(process.env.PORT || PORT, () => {
    console.log('server is running');
});

export default app;