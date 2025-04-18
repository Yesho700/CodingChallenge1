import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports:[
    ConfigModule,
    TokenModule,
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
