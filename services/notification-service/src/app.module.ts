import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { ConsumersModule } from './application/consumers/consumers.module';
import {
  NotificationController,
  PreferencesController,
} from './application/notifications.controller';
import { WebsocketsModule } from './infrastructure/websockets/websockets.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    WebsocketsModule,
    ConsumersModule,
  ],
  controllers: [NotificationController, PreferencesController],
})
export class AppModule {}
