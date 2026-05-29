import { Module } from '@nestjs/common';

import { InventoryController } from './presentation/controllers/inventory.controller';

@Module({
  imports: [],
  controllers: [InventoryController],
  providers: [],
})
export class AppModule {}
