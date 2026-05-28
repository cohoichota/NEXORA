import { Injectable, Logger } from '@nestjs/common';
import {
  OrderCreatedEvent,
  PaymentProcessedEvent,
  PaymentFailedEvent,
  PaymentEventTypes,
} from '@nexora/kafka-events';

import { PaymentStatus, PaymentProvider } from '../../generated/prisma';
import { PrismaService } from '../../infrastructure/database/prisma/prisma.service';

@Injectable()
export class PaymentService {
  private readonly logger = new Logger(PaymentService.name);

  constructor(private readonly prisma: PrismaService) {}

  async processOrderPayment(payload: OrderCreatedEvent['payload']) {
    this.logger.log(
      `Processing payment for Order ${payload.orderId} - Amount: ${payload.totalAmount}`,
    );

    try {
      // Step 1: Create a pending payment record
      let payment = await this.prisma.payment.create({
        data: {
          orderId: payload.orderId,
          userId: payload.userId,
          amount: payload.totalAmount,
          currency: payload.currency,
          provider: PaymentProvider.MOCK,
          status: PaymentStatus.PROCESSING,
        },
      });

      // Step 2: Attempt to charge via Stripe (Mocked)
      const isSuccess = Math.random() > 0.1; // 90% success rate mock

      if (isSuccess) {
        const paymentIntentId = `pi_mock_${Date.now()}`;

        await this.prisma.$transaction(async (tx) => {
          payment = await tx.payment.update({
            where: { id: payment.id },
            data: {
              status: PaymentStatus.SUCCEEDED,
              providerRef: paymentIntentId,
            },
          });

          const successEvent: PaymentProcessedEvent = {
            type: PaymentEventTypes.PAYMENT_PROCESSED,
            payload: {
              orderId: payload.orderId,
              paymentId: payment.id,
              status: 'SUCCESS',
            },
          };

          await tx.outboxMessage.create({
            data: {
              topic: 'nexora.payments',
              type: successEvent.type,
              payload:
                successEvent.payload as unknown as import('@prisma/client').Prisma.InputJsonValue,
            },
          });
        });

        this.logger.log(`Payment successful for Order ${payload.orderId}`);
      } else {
        throw new Error('Insufficient funds (Mock Error)');
      }
    } catch (error: unknown) {
      const err = error as Error;
      this.logger.error(`Payment failed for Order ${payload.orderId}: ${err.message}`);

      await this.prisma.$transaction(async (tx) => {
        await tx.payment.upsert({
          where: { orderId: payload.orderId },
          create: {
            orderId: payload.orderId,
            userId: payload.userId,
            amount: payload.totalAmount,
            currency: payload.currency,
            provider: PaymentProvider.MOCK,
            status: PaymentStatus.FAILED,
            failureReason: err.message,
          },
          update: {
            status: PaymentStatus.FAILED,
            failureReason: err.message,
          },
        });

        const failureEvent: PaymentFailedEvent = {
          type: PaymentEventTypes.PAYMENT_FAILED,
          payload: {
            orderId: payload.orderId,
            reason: err.message,
          },
        };

        await tx.outboxMessage.create({
          data: {
            topic: 'nexora.payments',
            type: failureEvent.type,
            payload:
              failureEvent.payload as unknown as import('@prisma/client').Prisma.InputJsonValue,
          },
        });
      });
    }
  }
}
