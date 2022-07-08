import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { User } from './auth.entity';
import { AuthService } from './service/auth.service';
import { JwtService } from './service/jwt.service';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'dev',
      signOptions: { expiresIn: '1d'},
    }),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtService, JwtStrategy]
})
export class AuthModule {}
