import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModule } from './framework/modules/order/order.module';
import { AuthModule } from './framework/modules/auth/auth.module';
import { getDbConfig } from './config/database';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getDbConfig(),
    }),
    OrderModule,
    AuthModule,
  ],
})
export class AppModule {}
