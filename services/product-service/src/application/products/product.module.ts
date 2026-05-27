import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaModule } from '../../infrastructure/database/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_SERVICE',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [config.get<string>('KAFKA_BROKERS') || 'kafka:9092'],
            },
            producerOnlyMode: true,
          },
        }),
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}
