import app from "./app";
import config from "./config";

const port = config.PORT;
const main = () => {
  app.listen(port, () => {
    console.log(`Dev Pulse server is running on port ${port}`);
  });
};

main();
