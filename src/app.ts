import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    Author: "Rabiul Islam",
    Message: "Dev Puls Server is Running",
  });
});

app.use(globalErrorHandler);

export default app;
