/* v8 ignore start */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import env from '../../../config/env';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: env.JWT_KEY,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [JwtStrategy],
})
export class AuthModule {}
/* v8 ignore stop */
