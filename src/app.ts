import express, {
  type Application,
  type Request,
  type Response,
} from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    Author: "Rabiul Islam",
    Message: "Dev Puls Server is Running",
  });
});

export default app;
