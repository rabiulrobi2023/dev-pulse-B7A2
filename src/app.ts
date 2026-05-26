import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import globalErrorHandler from "./middleware/globalErrorHandler";
import router from "./routes";
import cors from "cors";

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5000",
  }),
);
app.use(router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    Author: "Rabiul Islam",
    Message: "Dev Puls Server is Running",
  });
});

app.use(globalErrorHandler);

export default app;
