import type { Server as HttpServer } from "http";
import { Server as SocketIOServer } from "socket.io";

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
    }

    return WebSocketServer.instance;
  }
}
