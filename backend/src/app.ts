import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router as deviceRoutes } from "./routes/device.routes";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.use("/devices", deviceRoutes);

app.use((req: Request, res: Response, next: NextFunction): void => {
  if (req.path === "/") {
    res.json({ message: "welcome" });
  } else {
    next();
  }
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export default app;