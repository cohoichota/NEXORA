import { Module } from '@nestjs/common';

import { UserController } from './presentation/controllers/user.controller';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [],
})
export class AppModule {}
