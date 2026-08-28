import chalk from "chalk";
import { app } from "./app";
import env from "./env";
import http from "http";
import { WebSocketServer } from "./socket";

export const server = http.createServer(app);

server.listen(env.PORT, () => {
  console.log(chalk.green(`Server started at PORT:${env.PORT}`));
});
