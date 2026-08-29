import type { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";
import { socketAuth } from "./middlewares/socketAuth";
import { registerSocketEvents } from "./socket/events";

export class WebSocketServer {
  private static instance?: SocketIOServer;

  private constructor() {}

  static getInstance(server?: HttpServer): SocketIOServer {
    if (!WebSocketServer.instance) {
      if (!server) {
        throw new Error(
          "HTTP server is required when initializing WebSocketServer",
        );
      }

      WebSocketServer.instance = new SocketIOServer(server);
      WebSocketServer.instance.use(socketAuth);
      registerSocketEvents(WebSocketServer.instance);
    }

    return WebSocketServer.instance;
  }
}
