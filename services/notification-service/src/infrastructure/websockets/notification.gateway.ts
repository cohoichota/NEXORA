import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server;
  private readonly logger = new Logger(NotificationGateway.name);

  constructor(private readonly jwtService: JwtService) {}

  afterInit(server: Server) {
    this.logger.log('Socket.IO Gateway initialized');
  }

  async handleConnection(client: Socket) {
    try {
      // 1. Get token from handshake (auth payload or headers)
      const token = client.handshake.auth?.token || client.handshake.headers?.authorization?.split(' ')[1];
      
      if (!token) {
        this.logger.warn(`Client connected without token: ${client.id}`);
        // For public real-time events (like stock updates), we might allow unauthenticated
        return;
      }

      // 2. Verify token
      const decoded = this.jwtService.verify(token);
      const userId = decoded.userId;

      if (userId) {
        // 3. Join a specific room for this user
        client.join(`user_${userId}`);
        this.logger.log(`Client ${client.id} joined room user_${userId}`);
      }
    } catch (error) {
      this.logger.error(`Connection failed for client ${client.id}`, error.message);
      // Optional: client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Helper method to emit to a specific user
  sendToUser(userId: string, event: string, payload: any) {
    this.server.to(`user_${userId}`).emit(event, payload);
  }

  // Helper method to emit globally (e.g., product out of stock)
  sendToAll(event: string, payload: any) {
    this.server.emit(event, payload);
  }
}
