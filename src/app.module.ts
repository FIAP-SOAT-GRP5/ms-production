import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { getDbConfig } from './config/database';

import { ItemModule } from './framework/modules/item/item.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...getDbConfig(),
    }),
    ItemModule,
  ],
})
export class AppModule {}
