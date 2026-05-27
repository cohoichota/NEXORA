import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuthStore } from '../store/auth.store';
import { toast } from 'sonner';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Only connect if authenticated
    if (!isAuthenticated || !token) {
      if (socket) {
        socket.disconnect();
        setSocket(null);
      }
      return;
    }

    // Initialize socket connection to Gateway
    const socketInstance = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000', {
      auth: { token },
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('[Socket] Connected to Realtime Gateway');
    });

    socketInstance.on('disconnect', () => {
      console.log('[Socket] Disconnected');
    });

    // ── Business Events ────────────────────────────────────────

    socketInstance.on('order:created', (payload) => {
      toast.success('Order Created Successfully!', {
        description: `Order ID: ${payload.orderId} • Total: $${payload.totalAmount}`,
      });
    });

    socketInstance.on('order:confirmed', (payload) => {
      toast.success('Payment Confirmed!', {
        description: `Your order ${payload.orderId} is being prepared for shipment.`,
      });
    });

    socketInstance.on('order:cancelled', (payload) => {
      toast.error('Order Cancelled', {
        description: payload.reason || `Your order ${payload.orderId} was cancelled.`,
      });
    });

    socketInstance.on('product:updated', (payload) => {
      // Global broadcast - you can show a subtle toast or ignore it
      // toast.info(`Product Updated: ${payload.name}`);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [isAuthenticated, token]);

  return { socket };
};
