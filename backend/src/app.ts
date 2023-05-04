import express, { Application, Request, Response, NextFunction } from "express";

import { router as userRoutes } from "./routes/user.routes";
import { router as securityPersonnelRoutes } from '../src/routes/securityPersonnel.routes';
import { router as shiftScheduleRoutes } from '../src/routes/shiftSchedule.routes';
import { router as locationRoutes } from '../src/routes/location.routes';

const app: Application = express();

app.use(express.json());

app.use("/users", userRoutes);
app.use('/security-personnel', securityPersonnelRoutes);
app.use('/shift-schedules', shiftScheduleRoutes);
app.use('/locations', locationRoutes);

app.use("/", (req: Request, res: Response, next: NextFunction): void => {
  res.json({ message: "welcome" });
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: error.message });
});

export default app;