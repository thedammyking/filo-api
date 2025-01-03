import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '@/modules/users/users.module';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), UsersModule],
  exports: [PassportModule],
  providers: [JwtStrategy],
  controllers: [AuthController]
})
export class AuthModule {}
