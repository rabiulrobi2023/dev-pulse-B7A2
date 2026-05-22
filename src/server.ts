import app from "./app";
import config from "./config";
import { initDB } from "./db";

const port = config.PORT;
const main = () => {
  initDB();
  app.listen(port, () => {
    console.log(`Dev Pulse server is running on port: ${port}`);
  });
};

main();
