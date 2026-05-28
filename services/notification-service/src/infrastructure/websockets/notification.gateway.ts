import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(NotificationGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  afterInit(_server: Server) {
    this.logger.log('Socket.IO Gateway initialized');
  }

  handleConnection(client: Socket) {
    try {
      // 1. Get token from handshake (auth payload or headers)
      const token =
        (client.handshake.auth as { token?: string })?.token ||
        client.handshake.headers?.authorization?.split(' ')[1];

      if (!token) {
        this.logger.warn(`Client connected without token: ${client.id}`);
        // For public real-time events (like stock updates), we might allow unauthenticated
        return;
      }

      // 2. Verify token
      const decoded = this.jwtService.verify<{ userId?: string }>(token);
      const userId = decoded.userId;

      if (userId) {
        // 3. Join a specific room for this user
        void client.join(`user_${userId}`);
        this.logger.log(`Client ${client.id} joined room user_${userId}`);
      }
    } catch (error: unknown) {
      this.logger.error(`Connection failed for client ${client.id}`, (error as Error).message);
      // Optional: client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Helper method to emit to a specific user
  sendToUser(userId: string, event: string, payload: unknown) {
    this.server.to(`user_${userId}`).emit(event, payload);
  }

  // Helper method to emit globally (e.g., product out of stock)
  sendToAll(event: string, payload: unknown) {
    this.server.emit(event, payload);
  }
}
