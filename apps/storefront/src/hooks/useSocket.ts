import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { toast } from 'sonner';

import { useAuthStore } from '../store/auth.store';

export const useSocket = (): { socket: Socket | null } => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { accessToken, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only connect if authenticated
    if (!isAuthenticated || !accessToken) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Initialize socket connection to Gateway
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      auth: { token: accessToken },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      // eslint-disable-next-line no-console
      console.log('[Socket] Connected to Realtime Gateway');
    });

    socketInstance.on('connect_error', (_error) => {
      // eslint-disable-next-line no-console
      console.error('Socket connection error:', _error);
    });

    socketInstance.on('disconnect', () => {
      // eslint-disable-next-line no-console
      console.log('[Socket] Disconnected');
    });

    // ── Business Events ────────────────────────────────────────

    socketInstance.on('order:created', (payload: { orderId: string; totalAmount: number }) => {
      toast.success('Order Created Successfully!', {
        description: `Order ID: ${payload.orderId} • Total: $${payload.totalAmount}`,
      });
    });

    socketInstance.on('order:confirmed', (payload: { orderId: string }) => {
      toast.success('Payment Confirmed!', {
        description: `Your order ${payload.orderId} is being prepared for shipment.`,
      });
    });

    socketInstance.on('order:cancelled', (payload: { orderId: string; reason?: string }) => {
      toast.error('Order Cancelled', {
        description: payload.reason || `Your order ${payload.orderId} was cancelled.`,
      });
    });

    socketInstance.on('product:updated', (_payload) => {
      // Global broadcast - you can show a subtle toast or ignore it
      // toast.info(`Product Updated: ${_payload.name}`);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, accessToken]);

  return { socket };
};
