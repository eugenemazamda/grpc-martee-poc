import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthConfig } from 'src/configuration/auth.config';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt'
    }),
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '1d'},
    }),
    UserModule
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthConfig, JwtStrategy]
})
export class AuthModule {}
