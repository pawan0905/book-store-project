import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { PrismaService } from 'src/services/prisma.services';

@Module({
  providers: [CartService, PrismaService],
  controllers: [CartController],
})
export class CartModule {}
