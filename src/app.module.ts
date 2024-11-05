import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { ConfigModule } from './config/config.module';

@Module({
  imports: [ConfigModule.register({ folder: './' })],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {}
