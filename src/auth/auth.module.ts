import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/services/prisma.services';
import { JsonWebTokenService } from 'src/services/jwt.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [JwtModule.register({ secret: process.env.SECRET_KEY })],
  providers: [AuthService, PrismaService, JsonWebTokenService],
  controllers: [AuthController],
})
export class AuthModule {}
